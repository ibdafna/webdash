import { WebFlask } from "./flask";
import { WorkerManager } from "./worker-loader";

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
let dev = false;
if (process.env.NODE_ENV === "development") {
  log("Worked");
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
    log("Before");
    await this.startBootSequence(scriptChunk);
    log("After");
  }

  async injectDashApp() {
    return window.workerManager.asyncRun(
      `
${window.dashApp}
app.index()
      `,
      {}
    );
  }

  async generateScripts(indexContent) {
    document.getElementsByTagName("html")[0].innerHTML = indexContent;
    return window.workerManager.asyncRun(
      `
          app._generate_scripts_html()
      `,
      {}
    );
  }

  async startBootSequence(scriptChunk) {
    const sitePackagesDir = "/lib/python3.8/site-packages/";
    const scriptTagsChunk = scriptChunk.split("\n");
    const rendererDir = `${sitePackagesDir}dash_renderer/`;
    const rendererDirFiles = await window.workerManager.fsReadDir(rendererDir);
    const scriptTags = [];
    // promises do not work in Array.prototype.map(),
    // so had to convert to a regular for-loop.
    for (const script of scriptTagsChunk) {
      let scriptTag = document.createElement("script");
      const [route, dirName, fileName] = script.match(/(?<=[\/])[^\/]+/g);
      const fileNamePrefix = fileName.match(/[^.@]+/g)[0];
      const packageDir = `${sitePackagesDir}${dirName}`;

      // Match requested file names with local copies
      for (const file of rendererDirFiles) {
        const ext = file.match(/([.@].*\min\.js)/g);
        const fileName = `${fileNamePrefix}${ext}`;
        if (file === fileName) {
          const fullPath = `${packageDir}/${fileName}`;
          log(`Adding script: ${fullPath}`);
          //scriptFilesToLoad.push(fullPath);
          const data = new Blob(
            [await window.workerManager.fsReadFile(fullPath)],
            {
              type: "text/javascript",
            }
          );
          log("Daaata", data);
          const url = URL.createObjectURL(data);
          scriptTag.async = false;
          scriptTag.src = url;
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
    const dccDir = `${sitePackagesDir}dash_core_components/`;
    const dccFiles = [
      "async-plotlyjs.js",
      "async-graph.js",
      "async-markdown.js",
      "async-highlight.js",
      "async-dropdown.js",
      "async-slider.js",
      "async-datepicker.js",
      "async-upload.js",
      "dash_core_components.min.js",
      "dash_core_components-shared.js",
    ];

    for (const fileName of dccFiles) {
      scriptTags.push(await this.generateScriptBlob(dccDir, fileName));
    }

    // Dash html components
    const dhcDir = `${sitePackagesDir}dash_html_components/`;
    const dhcFiles = ["dash_html_components.min.js"];
    for (const fileName of dhcFiles) {
      scriptTags.push(await this.generateScriptBlob(dhcDir, fileName));
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
    const sitePackagesDir = "/lib/python3.8/site-packages/";
    const dcc = await window.workerManager.fsReadDir(
      `${sitePackagesDir}dash_core_components/`
    );
    const dhc = await window.workerManager.fsReadDir(
      `${sitePackagesDir}dash_html_components/`
    );

    dcc
      .filter((fileName) => fileName.match(/.js$/g))
      .map((fileName) => (this.fileMap[fileName] = "dash_core_components"));

    dhc
      .filter((fileName) => fileName.match(/.js$/g))
      .map((fileName) => (this.fileMap[fileName] = "dash_html_components"));
  }

  async generateScriptBlob(dir, fileName): Promise<HTMLScriptElement> {
    const scriptTag = document.createElement("script");
    const data = new Blob(
      [await window.workerManager.fsReadFile(`${dir}${fileName}`)],
      {
        type: "text/javascript",
      }
    );
    log("More data", data);
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
