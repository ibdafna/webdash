window.pyodideWorker = new Worker('./worker.js')

pyodideWorker.onmessage = ({ data }) => {
    console.log("[Window] received: ", data);
}

pyodideWorker.postMessage({python:"print('nonsense')"})

