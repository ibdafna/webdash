import { asyncRun, run, fsReadDir, fsReadFile } from './worker-loader.js';

async function main() {
    const indexContent = await injectDashApp();
    const scriptChunk = await generateScripts(indexContent);
    startBootSequence(scriptChunk);
}

async function injectDashApp() {
    return asyncRun(`
${window.DashApp}
app.index()
    `)
}

async function generateScripts(indexContent) {
    document.getElementsByTagName("html")[0].innerHTML = indexContent;
    return asyncRun(`
        app._generate_scripts_html()
    `)
}

async function startBootSequence(scriptChunk) {
    const sitePackagesDir = "/lib/python3.8/site-packages/";
    const scriptTags = scriptChunk.split("\n").map(script => {
        let scriptTag = document.createElement("script");
        const [ route, dirName, fileName ] = script.match(/(?<=[\/])[^\/]+/g);
        const fileNamePrefix = fileName.match(/[^.@]+/g)[0];
        const packageDir = `${sitePackagesDir}${dirName}`;
        const dirFiles = await fsReadDir(packageDir);

        // Match requested file names with local copies
        const scriptFilesToLoad = [];
        for (const file of dirFiles) {
            const ext = file.match(/([.@].*\min\.js)/g);
            const fileName = `${fileNamePrefix}${ext}`;
            if (file === fileName) {
                const fullPath = `${packageDir}/${fileName}`;
                console.log(`Adding script: ${fullPath}`);
                scriptFilesToLoad.push(fullPath);
            }
        }

        // Generate Blobs for each script tag and return to main page
        scriptFilesToLoad.map(scriptFilePath => {
            const data = new Blob([fsReadFile(scriptFilePath)], 
                { type: 'text/javascript' });
            const url = URL.createObjectURL(data);
            scriptTag.async = false;
            scriptTag.src = url;
        })

        return scriptTag;
    })

    const footer = document.getElementsByTagName("footer")[0];

    function generateScriptBlob(dir, fileName) {
        const scriptTag = document.createElement("script");
        const data = new Blob([fsReadFile(`${dir}${fileName}`)], 
                { type: 'text/javascript' });
        const url = URL.createObjectURL(data);
        scriptTag.src = url;
        scriptTag.async = false;
        scriptTags.push(scriptTag);
    }

    // TODO: actually load these async..
    // Dash core components
    const dccDir = `${sitePackagesDir}dash_core_components/`;
    ["async-plotlyjs.js",
        "async-graph.js",
        "async-markdown.js",
        "async-highlight.js",
        "async-dropdown.js",
        "async-slider.js",
        "dash_core_components.min.js", 
        "dash_core_components-shared.js"].forEach(fileName => {
            generateScriptBlob(dccDir, fileName);
        })

    // Dash html components
    const dhcDir = `${sitePackagesDir}dash_html_components/`;
    ["dash_html_components.min.js"].forEach(fileName => {
        generateScriptBlob(dhcDir, fileName);
    })

    // Start up script
    const rendererStartScript = run("app.renderer");
    const rendererScriptTag = document.createElement("script");
    const scriptBlob = new Blob([rendererStartScript], { type: 'text/javascript' })
    const rendererUrl = URL.createObjectURL(scriptBlob);
    rendererScriptTag.id = "_dash-renderer";
    rendererScriptTag.async = false;
    rendererScriptTag.src = rendererUrl;
    scriptTags.push(rendererScriptTag);

    scriptTags.forEach(script => footer.appendChild(script));
}


main();