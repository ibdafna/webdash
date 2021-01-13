import { asyncRun, run, fsReadDir, fsReadFile } from './worker-loader.js';

async function main() {
    const indexContent = await injectDashApp();
    const scriptChunk = await generateScripts(indexContent);
    console.log("Before")
    await startBootSequence(scriptChunk);
    console.log("After")
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
    const scriptTagsChunk = scriptChunk.split("\n");
    const rendererDir = `${sitePackagesDir}dash_renderer/`;
    const rendererDirFiles = await fsReadDir(rendererDir);
    const scriptTags = []
    // promises do not work in Array.prototype.map(), 
    // so had to convert to a regular for-loop.
    for (const script of scriptTagsChunk) {
        let scriptTag = document.createElement("script");
        const [ route, dirName, fileName ] = script.match(/(?<=[\/])[^\/]+/g);
        const fileNamePrefix = fileName.match(/[^.@]+/g)[0];
        const packageDir = `${sitePackagesDir}${dirName}`;

        // Match requested file names with local copies
        for (const file of rendererDirFiles) {
            const ext = file.match(/([.@].*\min\.js)/g);
            const fileName = `${fileNamePrefix}${ext}`;
            if (file === fileName) {
                const fullPath = `${packageDir}/${fileName}`;
                console.log(`Adding script: ${fullPath}`);
                //scriptFilesToLoad.push(fullPath);
                const data = new Blob([await fsReadFile(fullPath)], 
                    { type: 'text/javascript' });
                console.log("Daaata", data)
                const url = URL.createObjectURL(data);
                scriptTag.async = false;
                scriptTag.src = url;
                }
        }

        scriptTags.push(scriptTag);
    }
    console.log("In-between")

    const footer = document.getElementsByTagName("footer")[0];

    async function generateScriptBlob(dir, fileName) {
        const scriptTag = document.createElement("script");
        const data = new Blob([await fsReadFile(`${dir}${fileName}`)], 
                { type: 'text/javascript' });
        console.log("More data", data)
        const url = URL.createObjectURL(data);
        scriptTag.src = url;
        scriptTag.async = false;
        scriptTags.push(scriptTag);
    }

    // TODO: actually load these async..
    // Dash core components
    const dccDir = `${sitePackagesDir}dash_core_components/`;
    const dccFiles = ["async-plotlyjs.js",
        "async-graph.js",
        "async-markdown.js",
        "async-highlight.js",
        "async-dropdown.js",
        "async-slider.js",
        "dash_core_components.min.js", 
        "dash_core_components-shared.js"];

    for (const fileName of dccFiles) {
        await generateScriptBlob(dccDir, fileName);
    }

    // Dash html components
    const dhcDir = `${sitePackagesDir}dash_html_components/`;
    const dhcFiles = ["dash_html_components.min.js"];
    for (const fileName of dhcFiles) {
        await generateScriptBlob(dhcDir, fileName); 
    }

    // Start up script
    async function generateStartupScript() {
        const rendererScriptTag = document.createElement("script");
        const scriptBlob = new Blob([await asyncRun("app.renderer")], 
            { type: 'text/javascript' })
        const rendererUrl = URL.createObjectURL(scriptBlob);
        rendererScriptTag.id = "_dash-renderer";
        rendererScriptTag.async = false;
        rendererScriptTag.src = rendererUrl;
        scriptTags.push(rendererScriptTag);
    }

    await generateStartupScript();
    scriptTags.forEach(script => footer.appendChild(script));
}


main();