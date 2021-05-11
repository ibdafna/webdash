import * as https from "https";
import * as http from "http";
import * as path from "path";
import * as fs from "fs";

export default class SimpleHTTPServer {
  constructor(port, servePath, ssl) {
    this.port = port;
    this.servePath = servePath;
    this.certs = {
      cert: fs.readFileSync(`${path.resolve()}/src/server/certs/cert.pem`),
      key: fs.readFileSync(`${path.resolve()}/src/server/certs/key.pem`),
    };
    this.server = ssl
      ? https.createServer(this.certs, this.process.bind(this))
      : http.createServer(this.process.bind(this));

    this.mimeMap = {
      ".ico": "image/x-icon",
      ".html": "text/html",
      ".js": "text/javascript",
      ".json": "application/json",
      ".map": "application/json",
      ".css": "text/css",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".wav": "audio/wav",
      ".wasm": "application/wasm",
      ".mp3": "audio/mpeg",
      ".svg": "image/svg+xml",
      ".pdf": "application/pdf",
      ".zip": "application/zip",
      ".doc": "application/msword",
      ".eot": "application/vnd.ms-fontobject",
      ".ttf": "application/x-font-ttf",
      ".py": "text/x-python",
    };
  }

  plainTextResponse(res, respCode, content) {
    res.writeHead(respCode, { "Content-Type": "text/plain" });
    res.write(`${content}`);
    res.end();
  }

  process(req, res) {
    console.log(`${req.method} ${req.url}`);

    if (req.method === "POST") {
      this.handlePostRequest(req, res);
    } else {
      this.handleGetRequest(req, res);
    }
  }

  handlePostRequest(res, req) {
    // Good practice here would be to set a header value with a list
    // of methods this server *does* support. But given it's a simple
    // development server, I have not implemented it.
    this.plainTextResponse(res, 405, "This server only supports GET requests!");
  }

  handleGetRequest(req, res) {
    const parsedUrl = new URL(req.url, `https://${req.headers.host}`);
    console.log(parsedUrl);
    const pathName = parsedUrl.pathname;
    let ext = path.parse(pathName).ext;

    // We don't want people to read any file on our system
    const sanitizedPath = path
      .normalize(pathName)
      .replace(/^(\.\.[\/\\])+/, "");
    let fullPath = path.join(
      process.env.PWD,
      `${this.servePath}/${sanitizedPath}`
    );

    console.log(fullPath);

    fs.stat(fullPath, (error, stats) => {
      if (error) {
        this.plainTextResponse(res, 404, "Four-oh-four. It aint here.");
        return;
      }

      if (stats.isDirectory()) {
        fullPath += "index.html";
        ext = ".html";
      }

      fs.readFile(fullPath, "binary", (error, data) => {
        if (error) {
          this.plainTextResponse(
            res,
            500,
            "F-hive-o-o. Request be bad, very bad."
          );
          return;
        }

        res.writeHead(200, {
          "Content-type": this.mimeMap[ext] || "text/plain",
        });
        res.write(data, "binary");
        res.end();
      });
    });
  }

  serve() {
    this.server.listen(this.port, () => {
      console.log(`\nServer running on port ${this.port}`);
    });
  }
}
