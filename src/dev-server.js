import path from "path";
import Bundler from "parcel-bundler";
import SimpleHTTPServer from "./server/https_server.js";

// Env vars
let [, , port, servePath, ssl] = process.argv;
port = Number.parseInt(port) || 8080;
servePath = servePath || "dist";
ssl = true;

const entryFiles = path.join(path.resolve("./src"), "index.html");
console.log(entryFiles);
const bundler = new Bundler(entryFiles, {});
bundler.bundle();
bundler.on("bundled", () => {
  console.log("WebDash changes have been bundled.");
});

const webDashServer = new SimpleHTTPServer(port, servePath, ssl);
webDashServer.serve();
