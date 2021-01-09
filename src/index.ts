// Setting up a custom fecth function
const originalFetch = window.fetch;

const router = {
  "/_dash-layout": () => "app.serve_layout()",
  "/_dash-dependencies": () => `
with app.server.app_context(): 
  x = app.dependencies()
x`,
  "/_dash-update-component": postRequest,
  "/_reload-hash": () => "app.serve_reload_hash()"
}

function postRequest(req, init) {
  console.log('[POST Request]', req, init);
  return `
with app.server.test_request_context('${req}', json=${init.body}): 
  x = app.dispatch()
x`
}

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
      console.log("[Regular Reuqest]")
      return originalFetch.apply(this, [req, init]);
    }
  }

//@ts-ignore
window.fetch = fetch;