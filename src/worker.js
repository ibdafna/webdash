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

function handleFsCommands(fsCommands) {
    const { msgType, param } = fsCommands;
    try {
        const result = fileSystemCall(msgType, param);
        msgType === 'readFile' 
            ? postMessageTransferable(result, [result.buffer])
            : postMessageRegular(result);
    }
    catch (error) {
        postMessageRegular(error);
    }
}

async function handlePythonCode(python) {
    const result = await self.pyodide.runPythonAsync(python);
    try {
        postMessageRegular(result);
    }
    catch (error){
        postMessageError(error);
    }
}

onmessage = async(event) => {
    await languagePluginLoader;
     // since loading package is asynchronous, we need to make sure loading is done:
    await pythonLoading;
    // Don't bother yet with this line, suppose our API is built in such a way:
    const { python, fsCommands, ...context } = event.data;
    console.log('[3. Worker]', event.data);

    if (fsCommands) {
        handleFsCommands(fsCommands);
    }

    else {
        // The worker copies the context in its own "memory" (an object mapping name to values)
        for (const key of Object.keys(context)){
            self[key] = context[key];
        }
        handlePythonCode(python);
    }
}


/**
 * Message post functions.
 */

function postMessageRegular(object) {
    self.postMessage({
        results: object
    })
}

function postMessageTransferable(object, transferable) {
    self.postMessage({
        results: object
    }, 
    transferable);
}

function postMessageError(error) {
    self.postMessage({
        error: error.message
    });
}