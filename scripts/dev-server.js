import path from "path";
import Bundler from "parcel-bundler";
import fenceHttp from "./server/http_server.js";

let [, , port, servePath, ssl] = process.argv;
port = Number.parseInt(port) || 8080;
servePath = servePath || "dist";
ssl = true;

const entryFiles = path.join(path.resolve("./src"), "index.html");
const bundler = new Bundler(entryFiles, {});
bundler.bundle();
bundler.on("bundled", () => {
  console.log("Bundled haha");
});

const fenceHttpServer = new fenceHttp.FenceHTTPServer(port, servePath, ssl);
fenceHttpServer.serve();
