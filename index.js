const express = require("express");
const logger = require("morgan");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();

/* 포트설정 */
app.set("port", process.env.PORT || 8070);
// 기존의 http 모듈을 상속 받았기 때문에 http 모듈의 모든 기능을 사용할 수 있다.

/* 미들웨어 */
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(cookieParser("secret@1234")); //암호화된 쿠키를 사용하기 위한 임의의 문자 전송
app.use(
  session({
    secret: "secret@1234", // 암호화
    resave: false, //새로운 요청 시 세션에 변동 사항이 없어도 다시 저장할지 설정
    saveUninitialized: true, //세션에 저장할 내용이 없어도 저장할지 설정
    cookie: {
      //세션 쿠키 옵션 설정들 httpOnly, expires, domain, path, secure, sameSite
      httpOnly: true, //로그인 구현 시 필수 적용, 자바스크립트로 접근 할 수 없게 하는 기능
    },
    // name : 'connect.sid' //세션 쿠키의 Name 지정 default가 connect.sid
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Someting broke!");
});
//app.use(looger("common"));
//app.use(logger("combined"));
//app.use(logger("dev"));
//app.use(logger("short"));
//app.use(logger("tiny"));

/* 라우팅 설정 */

app.get("/", (req, res) => {
  if (req.session.name) {
    const output = `<h2>로그인한 사용자님</h2><br>
      <p>${req.session.name}님 안녕하세요.</p><br>
      `;
    res.send(output);
  } else {
    const output = `<h2>로그인하지 않은 사용자입니다</h2><br>
                   <p>로그인 해주세요.</p><br>
    `;
    res.send(output);
  }
});

app.get("/login", (req, res) => {
  //실제 구현시 post
  console.log(req.session);
  //쿠키를 사용할 경우 쿠키에 값 설정
  //res.cookie(name,value,options)
  //세션 쿠키를 사용할 경우
  req.session.name = "surge100";
  res.end("Logout Ok");
});

app.get("/logger", (req, res) => {
  res.send("log page");
});

app.get("/index", (req, res) => {
  res.sendFile(__dirname + "/index2.html");
});

// const myLogger = (req, res, next) => {
//   console.log("LOGGED");
//   next();
// };
// app.use(myLogger);

app.get("/cookie", function (req, res) {
  res.send("Cookies page");
  console.log("Cookies:", req.cookies);
  console.log("typeof req.cookies:", typeof req.cookies);
});

/* 서버와 포트 연결 */
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 서버 실행중");
});
