self.languagePluginUrl = 'http://localhost:9999/';
importScripts('http://localhost:9999/pyodide.js');

let pythonLoading;
async function loadPythonPackages(){
    await languagePluginLoader;
    pythonLoading = self.pyodide.loadPackage([]);
}

function fileSystemCall(msgType, param) {
    // console.log("fileSystemCall()", msgType, param);
    const output = pyodide._module.FS[msgType](param);
    console.log(output);
    return output
}

onmessage = async(event) => {
    await languagePluginLoader;
     // since loading package is asynchronous, we need to make sure loading is done:
    await pythonLoading;
    // Don't bother yet with this line, suppose our API is built in such a way:
    const { python, fsCommands, ...context } = event.data;
    console.log('[Worker]', event.data);

    if (fsCommands) {
        console.log("in");
        const { msgType, param } = fsCommands;
        try {
            const result = fileSystemCall(msgType, param);
            self.postMessage({
                results: result
            })
        }
        catch (error) {
            self.postMessage({
                error: error.message
            })
        }
    }

    else {
        // The worker copies the context in its own "memory" (an object mapping name to values)
        for (const key of Object.keys(context)){
            self[key] = context[key];
        }
        // Now is the easy part, the one that is similar to working in the main thread:
        try {
            self.postMessage({
                results: await self.pyodide.runPythonAsync(python)
            });
        }
        catch (error){
            self.postMessage(
                {error : error.message}
            );
        }
    }
}