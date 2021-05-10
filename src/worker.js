importScripts(`https://${location.hostname}:${location.port}/pyodide.js`);

async function loadPyodideAndPackages() {
  await loadPyodide({
    indexURL: `https://${location.hostname}:${location.port}/`,
  });
  await self.pyodide.loadPackage([]);
}

let pyodideReadyPromise = loadPyodideAndPackages();

function fileSystemCall(msgType, param) {
  // console.log("fileSystemCall()", msgType, param);
  const output = pyodide._module.FS[msgType](param);
  console.log(output);
  return output;
}

function generateResponseObject(pythonResponse) {
  const responseBody = pythonResponse.get_data((as_text = true));
  const headerKeys = pythonResponse.headers.keys();
  const returnObject = {
    response: responseBody,
    headers: Array.from(headerKeys).reduce(
      (acc, val) => ((acc[val] = pythonResponse.headers.get(val)), acc),
      {}
    ),
  };

  // Clean up Proxy Object so we don't leak memory
  headerKeys.destroy();
  pythonResponse.destroy();

  return returnObject;
}

function handleFsCommands(fsCommands) {
  const { msgType, param } = fsCommands;
  try {
    const result = fileSystemCall(msgType, param);
    msgType === "readFile"
      ? postMessageTransferable(result, [result.buffer])
      : postMessageRegular(result);
  } catch (error) {
    postMessageRegular(error);
  }
}

async function handlePythonCode(python) {
  let result = await self.pyodide.runPythonAsync(python);
  // Processing Proxy objects before sending.
  if (pyodide.isPyProxy(result)) {
    result = generateResponseObject(result);
  }
  try {
    postMessageRegular(result);
  } catch (error) {
    postMessageError(error);
  }
}

onmessage = async (event) => {
  // Making sure we don't arrive early at the party.
  await pyodideReadyPromise;

  const { python, fsCommands, ...context } = event.data;
  console.log("[3. Worker]", event.data);

  if (fsCommands) {
    handleFsCommands(fsCommands);
  } else {
    // The worker copies the context in its own "memory" (an object mapping name to values)
    for (const key of Object.keys(context)) {
      self[key] = context[key];
    }
    handlePythonCode(python);
  }
};

/**
 * Message post functions.
 */

function postMessageRegular(object) {
  self.postMessage({
    results: object,
  });
}

function postMessageTransferable(object, transferable) {
  self.postMessage(
    {
      results: object,
    },
    transferable
  );
}

function postMessageError(error) {
  self.postMessage({
    error: error.message,
  });
}
