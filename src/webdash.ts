import { WebFlask } from "./flask";
import { WorkerManager } from "./worker-loader";

const PYTHON_VERSION = 3.9;
const sitePackagesDir = `/lib/python${PYTHON_VERSION}/site-packages/`;
const directoryMap = {
  "deps": `${sitePackagesDir}dash/deps/`,
  "dash-renderer": `${sitePackagesDir}dash/dash-renderer/build`,
  "dcc": `${sitePackagesDir}dash/dcc/`,
  "html": `${sitePackagesDir}dash/html/`,
  "dash_table": `${sitePackagesDir}dash/dash_table/`
}

declare global {
  export interface Window {
    fetch: Function;
    workerManager: WorkerManager;
    dashApp: string;
    webDash: WebDash;
    log: Function;
  }
}

/**
 * Enables debug logs for development environments.
 */
export let dev = false;
if (process.env.NODE_ENV === "development") {
  dev = true;
}

export function log(...args) {
  if (dev) {
    console.log(...args);
  }
}

/**
 * The entry point for WebDash. It is responsible for
 * instantiating and coordinating the different
 * components which make up the communication
 * between the Dash frontend and the virtual
 * Flask backend running in WASM.
 */
class WebDash {
  constructor() {
    this.fileMap = {};
    window.workerManager = new WorkerManager();
    this.webFlask = new WebFlask();
    this.main();
  }

  /**
   * Used as the "boot sequence" for getting
   * the Dash application up and running.
   */
  async main() {
    const indexContent = await this.injectDashApp();
    const scriptChunk = await this.generateScripts(indexContent);
    await this.populateFileMap();
    log("Starting book sequence");
    await this.startBootSequence(scriptChunk);
    log("Finished boot sequence");
  }

  /**
   * This functions feeds the input dash application to the Flask
   * backend. Once that is done, the function injects the Dash 
   * application to the current web page by invoking the index page
   * function on the Dash backend. The returned string is then 
   * appended to the page.
   * @returns HTML string
   */
  async injectDashApp() {
    return window.workerManager.asyncRun(
      `
${window.dashApp}
app.index()
      `,
      {}
    );
  }

  /**
   * Invokes a function on the Dash side which returns a list
   * of JavaScript tags for a number of front-end Dash dependencies.
   * @param indexContent 
   * @returns A list of HTML script tags
   */
  async generateScripts(indexContent) {
    document.getElementsByTagName("html")[0].innerHTML = indexContent;
    return window.workerManager.asyncRun(
      `
          app._generate_scripts_html()
      `,
      {}
    );
  }

  /**
   * This function is responsible for parsing the HTML script tags and
   * loading the scripts as binary blobs, from the virtual file system,
   * into the existing web page.
   * @param scriptChunk 
   */
  async startBootSequence(scriptChunk) {
    const scriptTagsChunk = scriptChunk.split("\n");
    /**
     * Parsing each script tag sent to WebDash by the Dash backend. From that tag
     * we identify the target package to be loaded, and we search for it in the
     * virtual file system. If it's found, we create a binary blob from it and
     * append to the rendered page for immediate loading.
     * 
     * NOTE: dash_core_components and dash_html_components are loaded separately
     *       below this loop
     */
    const scriptTags = [];
    for (const script of scriptTagsChunk) {
      log(`Parsing script tag: ${script}`)
      let scriptTag = document.createElement("script");
      const [route, parentDirName, subDirName, ...rest] = script.match(/(?<=[\/])[^\/]+/g);
      const fileName = rest[rest.length - 2]
      const fileNamePrefix = fileName.match(/[^.@]+/g)[0];
      const packageDir = directoryMap[subDirName]
      const curDirFiles = await window.workerManager.fsReadDir(packageDir);

      // Match requested file names with local copies
      for (const file of curDirFiles) {
        const ext = file.match(/([.@].*\min\.js)/g);
        const fileName = `${fileNamePrefix}${ext}`;
        if (file === fileName) {
          const fullPath = `${packageDir}/${fileName}`;
          log(`Adding script: ${fullPath}`);
          const data = new Blob(
            [await window.workerManager.fsReadFile(fullPath)],
            {
              type: "text/javascript",
            }
          );
          log(`Script blob: ${data}`);
          const url = URL.createObjectURL(data);
          scriptTag.async = false;
          scriptTag.src = url;
          break; // Terminating loop here if we found what we came for.
        }
      }

      scriptTags.push(scriptTag);
    }
    log("In-between");

    const footer = document.getElementsByTagName("footer")[0];

    // TODO: actually load these async..
    // An alternative would be to bundle these files
    // in the dist folder and let the HTTP server
    // serve them on request.
    //
    // Dash core components
    const dccFiles = [
      "async-plotlyjs.js",
      "async-graph.js",
      "async-markdown.js",
      "async-highlight.js",
      "async-dropdown.js",
      "async-slider.js",
      "async-datepicker.js",
      "async-upload.js",
      "dash_core_components.js",
      "dash_core_components-shared.js",
    ];

    for (const fileName of dccFiles) {
      scriptTags.push(await this.generateScriptBlob(directoryMap["dcc"], fileName));
    }

    // Dash html components
    const dhcFiles = ["dash_html_components.min.js"];
    for (const fileName of dhcFiles) {
      scriptTags.push(await this.generateScriptBlob(directoryMap["html"], fileName));
    }

    // Start up script
    async function generateStartupScript() {
      const rendererScriptTag = document.createElement("script");
      const scriptBlob = new Blob(
        [await window.workerManager.asyncRun("app.renderer", {})],
        {
          type: "text/javascript",
        }
      );
      const rendererUrl = URL.createObjectURL(scriptBlob);
      rendererScriptTag.id = "_dash-renderer";
      rendererScriptTag.async = false;
      rendererScriptTag.src = rendererUrl;
      scriptTags.push(rendererScriptTag);
    }

    await generateStartupScript();
    scriptTags.forEach((script) => footer.appendChild(script));
  }

  // Map of {"fileName":"directoryFileIsIn"} for all
  // files stored in the virtual file system.
  async populateFileMap(): Promise<void> {
    const dcc = await window.workerManager.fsReadDir(
      directoryMap["dcc"]
    );
    const dhc = await window.workerManager.fsReadDir(
      directoryMap["html"]
    );

    dcc
      .filter((fileName) => fileName.match(/.js$/g))
      .map((fileName) => (this.fileMap[fileName] = "dash_core_components"));

    dhc
      .filter((fileName) => fileName.match(/.js$/g))
      .map((fileName) => (this.fileMap[fileName] = "dash_html_components"));
  }

  async generateScriptBlob(dir, fileName): Promise<HTMLScriptElement> {
    log(`JavaScript Blob: processing ${fileName}`)
    const scriptTag = document.createElement("script");
    const data = new Blob(
      [await window.workerManager.fsReadFile(`${dir}${fileName}`)],
      {
        type: "text/javascript",
      }
    );
    const url = URL.createObjectURL(data);
    scriptTag.src = url;
    scriptTag.async = false;
    return scriptTag;
  }

  async loadDashScript(dir, fileName) {
    const script = await this.generateScriptBlob(dir, fileName);
    const footer = document.getElementsByTagName("footer")[0];
    footer.appendChild(script);
  }

  workerManager: WorkerManager;
  webFlask: WebFlask;
  fileMap: { [file: string]: string };
  dev: boolean;
}

window.webDash = new WebDash();
