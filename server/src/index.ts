//express 프레임워크를 불러옵니다.
import express from "express";
//dotenv 환경 변수 파일(.env)을 로드하기 위해 사용됩니다.
import { config } from "dotenv";
//Node.js의 파일 시스템 모듈로 파일 및 디렉터리 작업을 수행할 수 있게 합니다
import fs from "fs";

//Product 라우터 모듈을 가져옵니다
import productRouter from "./routes/product";
//import searchRouter from "./routes/search";

//.env파일에 정의된 환경 변수를 로드 합니다.
config();

//서버 포트 설정
const PORT = process.env.PORT || 3090;

//thumbnails디렉토리가 존재 하지 않으면 구문을 실행
if (!fs.existsSync("thumbnails")) {
  console.log("thumbnails 폴더가 없으므로 만듭니다...");
  //thumbnails폴더를 생성합니다
  fs.mkdirSync("thumbnails");
}
//express 애플리케이션 인스턴스 생성(서버 설정과 요청처리에 필요)
const app = express();

//미들웨어 설정
//JSON형식의 요청 본문을 파싱하여 req.body에 접근할 수 있게 합니다.
app.use(express.json());

//URL 인코딩된 요청 본문을 파싱합니다.
//(extended:flase는 쿼리 문자열에서 객체를 변환하지 않겠다는 의미)
app.use(express.urlencoded({ extended: false }));

//'thumbnails 디렉토리를 정적 파일 서버로 설정합니다.
//클라이언트가 /thumbnails 경로를 통해 해당 디렉토리의 파일에 접근할 수 있도록 합니다.
app.use("/thumbnails", express.static("thumbnails"));

//루트 경로 핸들러
app.get("/", (req, res) => {
  //텍스트 응답을 반환
  res.send("Shopping App API server");
});

//라우터 설정
//'/product'경로로 들어오는 요청은 productRouter에 의해 처리됩니다.
app.use("/product", productRouter);
// '/search'경로로 들어오는 요청은 searchRouter에 의해 처리됩니다.
//app.use("/search", searchRouter);
//각각 `./routes/product`와 `./routes/search`파일에서 정의된 라우터입니다.

//서버 시작
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Server is running at http://localhost:${PORT}`);
});
