if (!window.pyodideWorker) {
    window.pyodideWorker = new Worker('./worker.js');
}

export function run(script, context, onSuccess, onError){
    pyodideWorker.onerror = onError;
    pyodideWorker.onmessage = (e) => onSuccess(e.data.results);
    pyodideWorker.postMessage({
        ...context,
        python: script,
    });
}

// Transform the run (callback) form to a more modern async form.
// This is what allows to write:
//    const {results, error} = await asyncRun(script, context);
// Instead of:
//    run(script, context, successCallback, errorCallback);
export function asyncRun(script, context) {
    return new Promise(function(onSuccess, onError) {
        run(script, context, onSuccess, onError);
    });
}

export async function fsReadDir(dir) {
    return new Promise(function(onSuccess, onError) {
        pyodideWorker.onerror = onError;
        pyodideWorker.onmessage = (e) => onSuccess(e.data);
        pyodideWorker.postMessage(
            {
                fsCommands:
                    {
                        msgType: "readdir", 
                        param: dir
                    }
            }
        )
    })
}

export async function fsReadFile(file) {
    return new Promise(function(onSuccess, onError) {
        pyodideWorker.onerror = onError;
        pyodideWorker.onmessage = (e) => onSuccess(e.data.results);
        pyodideWorker.postMessage(
            {
                fsCommands:
                    {
                        msgType: "readFile", 
                        param: file
                    }
            }
        )
    })
}