
window.pyodideWorker = new Worker('./worker.js')

export function run(script, context, onSuccess, onError){
    pyodide.onerror = onError;
    pyodide.onmessage = (e) => onSuccess(e.data);
    pyodide.postMessage({
        ...context,
        python: script,
    });
}


const script = `
    import statistics
    from js import A_rank
    statistics.stdev(A_rank)
`;

const context = {
    A_rank: [0.8, 0.4, 1.2, 3.7, 2.6, 5.8],
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

async function main(){
    try {
        const {results, error} = await asyncRun(script, context);
        if (results) {
            console.log('pyodideWorker return results: ', results);
        } else if (error) {
            console.log('pyodideWorker error: ', error);
        }
    }
    catch (e){
        console.log(`Error in pyodideWorker at ${e.filename}, Line: ${e.lineno}, ${e.message}`)
    }
}

main();