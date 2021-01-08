// // Setting up a custom fecth function
// const originalFetch = window.fetch;

// async function fetch(
//     req,
//     init
//   ) {
//     console.log('req', req);


//     if (req.match("pyodide1")) {
//         console.log("pyodide called");
//     }

//     // dispatch requests
//     // TODO: reuse an existing routing library?
//     // if (req.url.match(Contents.CONTENTS_SERVICE_URL)) {
//     //   return this._contents.dispatch(req);
//     // } else if (req.url.match(KernelSpecs.KERNELSPEC_SERVICE_URL)) {
//     //   return this._kernelspecs.dispatch(req);
//     // } else if (req.url.match(Sessions.SESSION_SERVICE_URL)) {
//     //   return this._sessions.dispatch(req);
//     // } else if (req.url.match(Kernels.KERNEL_SERVICE_URL)) {
//     //   return this._kernels.dispatch(req);
//     // } else if (req.url.match(Settings.SETTINGS_SERVICE_URL)) {
//     //   return this._settings.dispatch(req);
//     // } else if (req.url.match(Themes.THEMES_SERVICE_URL)) {
//     //   return this._themes.dispatch(req);
//     // }

//     return originalFetch.apply(this, [req, init]);
//   }

//   window.fetch = fetch;