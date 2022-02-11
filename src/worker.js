const WEBDASH_VERSION = "0.0.3";

let pyodideAddress = `https://cdn.jsdelivr.net/gh/ibdafna/webdash_dist@webdash_${WEBDASH_VERSION}`
if (process.env.NODE_ENV === "development") {
  pyodideAddress = `https://${location.hostname}:${location.port}`;
}

importScripts(`${pyodideAddress}/pyodide.js`);


async function loadPyodideAndPackages() {
  self.pyodide = await loadPyodide({
    homedir: "/",
    indexURL: `${pyodideAddress}/`,
  });
  await self.pyodide.loadPackage(["pandas", "numpy", "dash"], postConsoleMessage, postConsoleMessage);
}

let pyodideReadyPromise = loadPyodideAndPackages();

function fileSystemCall(msgType, param) {
  const output = pyodide._module.FS[msgType](param);
  // Uncomment for debugging purposes
  // console.log("fileSystemCall()", msgType, param);
  // console.log(output);
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
  // Load any imports
  await self.pyodide.loadPackagesFromImports(python, console.log, console.err)
  let result = await self.pyodide.runPython(python);
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

  // Uncomment for debugging pureposes
  // console.log("[3. Worker]", event.data);

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

function postConsoleMessage(consoleMessage) {
  self.postMessage({
    consoleMessage,
  });
}