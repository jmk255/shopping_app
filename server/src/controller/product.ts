//Express.js의 Request, Response, NextFunction 타입을 임포트합니다
import { NextFunction, Request, Response } from "express";
//UUID를 생성하기 위한 uuidv4 함수를 uuid 패키지에서 임포트합니다
//이 함수는 고유한 식별자를 생성하는 데 사용됩니다
import { v4 as uuidv4 } from "uuid";
//products 배열과 제품 관리 관련 함수(deleteById, getById), ProductType 인터페이스를 가져옵니다
import products, { deleteById, getById, ProductType } from "../model/products";


//모든 제품 정보를 JSON 형태로 반환하는 컨트롤러 함수
const raedProductsController = (req: Request, res: Response) => {
  res.json({ //HTTP 응답 코드 200과 함께 "상품 조회 성공" 메시지를 포함
    products,
    code: 200,
    message: "상품 조회 성공"
  });
}

//URL 파라미터에서 productId를 추출하고, 
//getById 함수를 사용하여 해당 제품을 조회하는 컨트롤러 함수
const raedProductController = (req: Request, res: Response) => {
  //URL 파라미터에서 productId 추출
  const { productId } = req.params;
  //getById 함수를 사용하여 해당 제품을 조회
  const existProduct = getById(productId);
  
  //제품이 존재하지 않으면 "존재하지 않는 상품입니다." 메시지를 반환
  if (!existProduct) {
    return res.json({
      message: "존재하지 않는 상품입니다."
    });
  }
  
  //존재하면 제품 정보와 함께 HTTP 응답 코드 200을 반환
  res.json({
    product: existProduct,
    code: 200,
    message: "상품 조회에 성공하였습니다."
  });
};

//새 제품을 생성하는 컨트롤러 함수(비동기)
const createProductController = async (req: Request, res: Response) => {
  //요청 본문에서 제품 메타데이터를 추출
  const productMeta = req.body as ProductType;
  //UUID를 생성
  const generatedId = uuidv4();

  //본문에서 추출한 제품 메타데이터와 생성한 UUID로 새 제품 객체를 만듭니다
  const newProduct: ProductType = {
    ...productMeta,
    id: generatedId,
  };

  //setTimeout을 사용하여 1초 대기
  //(새 재품 생성시 약간의 딜레이 타임을 주기위해 작성)
  await new Promise<void>((resolve) => setTimeout(resolve, 1000));

  //새 제품을 products 배열에 추가
  products.push(newProduct);

  //성공 메시지와 함께 새 제품 정보를 반환
  return res.json({
    code: 200,
    message: "상품 등록에 성공하였습니다.",
    location: `/product?id=${generatedId}`,
    product: newProduct
  });
};

//productId를 입력으로 받아 products 배열에서 해당 ID를 가진 제품의 인덱스를 찾는 함수입니다
//제품이 없으면 -1을 반환합니다
const getProductIndexById = (productId: string): number => {
  return products.findIndex((product) => product.id === productId);
};

//제품 정보를 업데이트하는 컨트롤러 함수
const updateProductController = (req: Request, res: Response) => {
  //URL 파라미터에서 productId를 추출
  const { productId } = req.params;
  //요청 본문에서 업데이트할 데이터를 가져옵니다
  const updateProductData = req.body;

  //해당 제품 정보를 찾아서
  const productIndex = getProductIndexById(productId);

  //제품이 존재하지 않으면 "존재하지 않는 상품입니다." 메시지를 반환
  if (productIndex === -1) {
    return res.json({
      message: "존재하지 않는 상품입니다."
    });
  }

  //존재하면 제품 정보를 업데이트
  products[productIndex] = {
    //productIndex위치에 있는 제품 객체의 모든 속성값을 updateProductData속성값으로 넣어줍니다
    ...products[productIndex],
    ...updateProductData
  };

  //성공 메시지와 제품 위치를 포함한 응답을 반환
  return res.json({
    message: "상품 업데이트에 성공하였습니다.",
    location: `/product?id=${productId}`
  });
};

//제품을 삭제하는 컨트롤러 함수
const deleteProductController = async (req: Request, res: Response) => {
  //URL 파라미터에서 productId를 추출
  const { productId } = req.params;
  //setTimeout을 사용하여 1초 대기
  await new Promise<void>((resolve) => setTimeout(resolve, 1000));

  //deleteById 함수를 호출하여 제품을 삭제
  deleteById(productId);

  //성공 메시지를 포함하여 응답
  return res.json({
    code: 200,
    message: "상품이 삭제되었습니다."
  });
};

//제품의 썸네일을 업데이트하는 컨트롤러 함수
const updateThumbnailController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  //URL 파라미터에서 productId를 추출
  const { productId } = req.params;

  //해당 제품이 존재하는지 확인
  const productIndex = getProductIndexById(productId);

  //제품이 존재하지 않으면 "존재하지 않는 상품입니다." 메시지를 반환
  if (productIndex === -1) {
    return res.json({
      message: "존재하지 않는 상품입니다."
    });
  } 

  //제품이 존재하면 req.file.path를 사용하여 썸네일 경로를 업데이트
  products[productIndex] = {
    ...products[productIndex],
    thumbnail: `${req?.file?.path}`
  };

  //성공 메시지와 업데이트된 제품 정보를 포함한 응답을 반환
  return res.json({
    code: 201,
    message: "상품 썹네일 업로드 성공",
    product: products[productIndex]
  });
};

// 앞서 정의한 모든 컨트롤러 함수를 객체로 묶어 모듈의 기본 내보내기로 설정
export default {
  raedProductsController,
  raedProductController,
  createProductController,
  updateProductController,
  deleteProductController,
  updateThumbnailController
};
