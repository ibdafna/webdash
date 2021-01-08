// Setting up a custom fecth function
const originalFetch = window.fetch;

const router = {
  "/_dash-layout": "app.serve_layout()",
  "/_dash-dependencies": `
with app.server.app_context(): 
  x = app.dependencies()
x`,
  "/_dash-update-component": `
with app.server.test_request_context(): 
  x = app.dispatch()
x`,
  "/_reload-hash": "app.serve_reload_hash()"
}

function generateResponse(codeWillRun, req) {
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
    console.log('[Request Intercepted]', req);
    const url = new URL(new Request(req).url);

    let codeWillRun = router[url.pathname]
    if (codeWillRun) {
      console.log(url.pathname)
      return generateResponse(codeWillRun, req);
    }

//     if (req.toString().match(/_dash-layout/)) {
//       //@ts-ignore

//     } else if (req.toString().match(/_dash-dependencies/)) {
//       console.log("[Pyodide Request]");
//       //@ts-ignore
//       const flaskRespone = pyodide.runPython(`
// with app.server.app_context(): 
//   x = app.dependencies()
// x`);
//       const response = new Response(
//         flaskRespone['response'][0], {
//           //@ts-ignore
//           headers: Object.fromEntries(new Map(flaskRespone['headers']))
//         }
//       )
//       return response;

     else {
      console.log("[Regular Reuqest]")
      return originalFetch.apply(this, [req, init]);
    }
  }

//@ts-ignore
window.fetch = fetch;