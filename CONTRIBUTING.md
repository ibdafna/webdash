<!-- TODO: Add content here -->

## Structure of the project

WebDash is built on top of two main components:

1. a custom `pyodide` build with `dash`, `flask` and their dependencies compiled to WebAssembly.
2. the actual `WebDash` source code which makes use of the custom `pyodide` build.

Generally speaking, it unlikely you will need to play with the custom `pyodide` environment as compiling it is a long and complex process. The WebDash repo ships pre-built binaries for the custom pyodide environment under the `dist` folder so you don't have to build them from source.

If you do need to build the custom `pyodide` environment for reasons such as making changes to the `dash` fork, follow the following instructions:

```bash
make pyodide
cd pyodide
./run_docker
```

Once you you're inside the Docker container CLI, you can build the entire distribution by running `make`. If you want to build only specific packages, make sure to set your environment variables before running `make`. See below for an example:

```bash
PYODIDE_PACKAGES="dash,dash-core-components,flask"
make
```

The output of the `pyodide` build process will be in the `pyodide/build` directory. Just copy the contents of that folder to the `dist` folder so that WebDash can make use of that custom build. If you are not going to build `pyodide` from source, the `dist` will come with pre-compiled binaries.

## Building WebDash

WebDash uses `parcel` to transpile and bundle the code for both development
and production bundles. To run a development web server for WebDash, run the following command in the root directory of the repo:

```bash
npm run dev
```

This will run a local development server on port `8080` (note we use `https` even when developing locally. This means you might see a warning on your web browser, saying `https://localhost:8080` is not safe - you can ignore this message). `parcel` will automatically re-bundle WebDash each time a change to any of the files is detected. Refresh the browser and you should see the changes instantly!

To build WebDash for production, run the following command:

```bash
npm run build
```

This will generate a bundle in the `dist` folder under the root directory. That folder can then be served as a static website with your code changes.
