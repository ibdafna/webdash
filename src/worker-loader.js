if (!window.pyodideWorker) {
    window.pyodideWorker = new Worker('./worker.js');
}

class ResponseQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(onSuccessFn) {
        return this.queue.push(onSuccessFn);
    }

    dequeue() {
        return this.queue.shift();
    }
}

const messageQueue = new ResponseQueue();

export function run(script, context, onSuccess, onError){
    messageQueue.enqueue(onSuccess);
    pyodideWorker.onerror = (e) => onError(e);
    pyodideWorker.onmessage = (e) => {
        console.log("[4. Message received from worker]", e.data);
        const success = messageQueue.dequeue();
        return success(e.data.results);
    }
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
        // pyodideWorker.onmessage = (e) => {
        //     console.log(e.data);
        //     return e.data.resuls;
        // }
        pyodideWorker.onmessage = (e) => onSuccess(e.data.results);
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
        // pyodideWorker.onmessage = (e) => console.log(e.data);
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