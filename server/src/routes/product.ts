import { Router } from "express";

// multer는 파일 업로드를 처리하는 미들웨어입니다.
import multer from "multer";

//제품 관련 API 핸들러를 정의한 productController를 임포트
import productController from "../controller/product";

//파일 경로를 조작하고 표준화하는 데 사용
import path from "path";

//새로운 Express 라우터 인스턴스를 생성
const router = Router();

//GET `/`요청을 처리하고, raedProductsController 컨트롤러를 호출하여 모든 제품 정보를 반환
router.get("/", productController.raedProductsController);

//POST `/`요청을 처리하고, createProductController 컨트롤러를 호출하여 새 제품을 생성
router.post("/", productController.createProductController);

//GET `/:productId` 요청을 처리하고, raedProductController 컨트롤러를 호출하여 특정 제품 정보를 반환
//`:productId`는 제품 ID를 나타내는 URL 파라미터입니다
router.get("/:productId", productController.raedProductController);

//PATCH `/:productId` 요청을 처리하고, updateProductController 컨트롤러를 호출하여 특정 제품 정보를 업데이트
router.patch("/:productId", productController.updateProductController);

//DELETE `/:productId` 요청을 처리하고, deleteProductController 컨트롤러를 호출하여 특정 제품을 삭제
router.delete("/:productId", productController.deleteProductController);

//multer의 diskStorage를 사용하여 파일 저장소 설정을 정의
const storage = multer.diskStorage({

  //업로드된 파일이 저장될 디렉토리를 지정
  destination: (req, res, cb) => {
    //여기서는 thumbnails/ 디렉토리에 저장됩니다
    cb(null, "thumbnails/");
  },
  //파일 이름을 설정
  filename: (req, file, cb) => {
    //원본 파일의 확장자를 유지(.jpg)
    const extName = path.extname(file.originalname);
    //현재 시간과 랜덤 숫자를 조합하여 생성(1e9 = 1,000,000,000)   
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    //uniqueSuffix와 extName을 조합하여 파일이름 설정
    cb(null, `${uniqueSuffix}${extName}`);
  },
});
//앞서 정의한 storage 설정을 사용하여 multer 미들웨어를 생성(파일 업로드 요청을 처리)
const upload = multer({
  storage,
});

//PATCH `/thumbnail/:productId` 요청을 처리
router.patch(
  "/thumbnail/:productId",
  //업로드된 파일을 `req.file`로 처리 (thumbnail은 폼 필드의 이름)
  upload.single("thumbnail"),
  (req, res, next) => {
    if (req.file) {
      // 업로드된 파일 경로를 표준화하여 Windows의 백슬래시(\)를 슬래시(/)로 변환합니다
      req.file.path = req.file.path.replace(/\\/g, '/');
    }
    //next()를 호출하여 다음 미들웨어인 updateThumbnailController로 요청을 전달합니다
    next();
  },
  //업로드된 썸네일을 처리하고, 제품 정보를 업데이트합니다
  productController.updateThumbnailController
);

export default router;
