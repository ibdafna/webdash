// Setting up a custom fecth function
const originalFetch = window.fetch;

async function fetch(
    req: Request,
    init?: RequestInit | null | undefined
  ): Promise<Response> {
    console.log('[Request Intercepted]', req);


    return originalFetch.apply(this, [req, init]);
  }

//@ts-ignore
window.fetch = fetch;