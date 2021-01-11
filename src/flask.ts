
/**
 * A small, virtual web server emulating Flask (Python).
 */
declare var pyodide: any;
const router = {
  "/_dash-layout": () => "app.serve_layout()",
  "/_dash-dependencies": () => `
      with app.server.app_context(): 
        x = app.dependencies()
      x`,
  "/_dash-update-component": postRequest,
  "/_reload-hash": () => "app.serve_reload_hash()"
}

/**
 * Sends a POST request to the Python Flask backend.
 * @param req Request Object
 * @param init request payload
 */
function postRequest(req, init) {
  console.log('[POST Request]', req, init);
  return `
    with app.server.test_request_context('${req}', 
      data='''${init.body}''', 
      content_type="application/json"): 
      x = app.dispatch()
    x`
}


/**
 * Retrieves a Flask response object and converts it
 * to a compatible Response object.
 * @param codeWillRun stringified python code
 */
function generateResponse(codeWillRun) {
  console.log("[Pyodide Request]");
  const flaskRespone = pyodide.runPython(codeWillRun);
  const response = new Response(
    flaskRespone['response'][0], {
      headers: Object.fromEntries(new Map(flaskRespone['headers']))
    }
  )
  return response;
}

/**
 * A custom fetch function which intercepts Flask requests
 * and routes to the Python backend.
 * @param req Request object
 * @param init request payload
 */
async function fetch(
    req: Request,
    init?: RequestInit | null | undefined
  ): Promise<Response> {
    // TODO: handle raw requests in addition to strings
    console.log('[Request Intercepted]', req, init);
    const url = new URL(new Request(req).url);

    let codeWillRun = router[url.pathname]
    if (codeWillRun) {
      console.log(url.pathname)
      return generateResponse(codeWillRun(req, init));
    }

     else {
      console.log("[Passthrough Reuqest]")
      return originalFetch.apply(this, [req, init]);
    }
  }

const originalFetch = window.fetch;
window.fetch = fetch;