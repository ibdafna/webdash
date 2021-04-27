import { WorkerManager } from "./worker-loader";

/**
 * A small, virtual web server emulating Flask (Python).
 */
export class WebFlask {
  constructor() {
    // TODO: Implement an API to add/remove routes
    this.router = {
      "/_dash-layout": () => `
            x = app.serve_layout()
            x`,
      "/_dash-dependencies": () => `
          with app.server.app_context(): 
            x = app.dependencies()
          x`,
      "/_dash-update-component": this.postRequest
    };
    this.worker = window.workerManager;
    this.originalFetch = window.fetch;
    window.fetch = this.fetch.bind(this);
  }

  /**
   * Sends a POST request to the Python Flask backend.
   * @param req Request Object
   * @param init request payload
   */
  postRequest(req, init) {
    console.log("[POST Request]", req, init);
    return `
    with app.server.test_request_context('${req}', 
      data='''${init.body}''', 
      content_type="application/json"): 
      x = app.dispatch()
    x`;
  }

  /**
   * Retrieves a Flask response object and converts it
   * to a compatible Response object.
   * @param codeWillRun stringified python code
   */
  async generateResponse(codeWillRun) {
    console.log("[2. Flask Request Generated]");
    const flaskRespone = await this.worker.asyncRun(codeWillRun, {});
    console.log("[5. Flask Response Received]", flaskRespone);
    const response = new Response(flaskRespone["response"], {
      headers: flaskRespone["headers"]
    });
    return response;
  }

  /**
   * A custom fetch function which intercepts Flask requests
   * and routes to the Python backend.
   * @param req Request object
   * @param init request payload
   */
  async fetch(
    req: Request,
    init?: RequestInit | null | undefined
  ): Promise<Response> {
    // TODO: handle raw requests in addition to strings
    console.log("[1. Request Intercepted]", req, init);
    const url = new URL(new Request(req).url);

    let codeWillRun = this.router[url.pathname];
    if (codeWillRun) {
      console.log(url.pathname);
      const resp = await this.generateResponse(codeWillRun(req, init));
      console.log(`[6. ${url.pathname} done.]`, resp);
      return resp;
    } else {
      console.log("[Passthrough Request]");
      return this.originalFetch.apply(this, [req, init]);
    }
  }

  router: Router;
  worker: WorkerManager;
  originalFetch: (request: any, response: any) => Promise<Response>;
}

type Router = { [key: string]: Function };
