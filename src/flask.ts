import { asyncRun } from './worker-loader.js';

/**
 * A small, virtual web server emulating Flask (Python).
 */

const router = {
  "/_dash-layout": () => `
        x = app.serve_layout()
        x = {"response": x.get_data(as_text=True), "headers": x.headers}
        x`,
  "/_dash-dependencies": () => `
      with app.server.app_context(): 
        x = app.dependencies()
        x = {"response": x.get_data(as_text=True), "headers": x.headers}
      x`,
  "/_dash-update-component": postRequest
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
      x = {"response": x.get_data(as_text=True), "headers": x.headers}
    x`
}


/**
 * Retrieves a Flask response object and converts it
 * to a compatible Response object.
 * @param codeWillRun stringified python code
 */
async function generateResponse(codeWillRun) {
  console.log("[2. Flask Request Generated]");
  const flaskRespone  = await asyncRun(codeWillRun);
  console.log("[5. Flask Response Received]", flaskRespone);
  const response = new Response(
    flaskRespone['response'], {
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
    console.log('[1. Request Intercepted]', req, init);
    const url = new URL(new Request(req).url);

    let codeWillRun = router[url.pathname]
    if (codeWillRun) {
      console.log(url.pathname)
      const resp = await generateResponse(codeWillRun(req, init));
      console.log(`[6. ${url.pathname} done.]`, resp)
      return resp;
    }

    else {
      console.log("[Passthrough Reuqest]")
      return originalFetch.apply(this, [req, init]);
    }
  }

const originalFetch = window.fetch;
window.fetch = fetch;