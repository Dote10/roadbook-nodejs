const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Set-cookie": "name=surge100" });
    console.log(req.headers.cookie);
    res.end("Cookie --> Header");
  })
  .listen(8060, () => {
    console.log("8060포트에서 서버 연결 중");
  });
