const http = require("http");

const session = {};
const sessKey = new Date();
session[sessKey] = { name: "surge100" };

http
  .createServer((req, res) => {
    res.writeHead(200, { "Set-cookie": `session=${sessKey}` });
    res.end("Session-Cookie --> Header");
  })
  .listen(8060, () => {
    console.log("8060포트 서버 연결 중...");
  });
