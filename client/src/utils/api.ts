import axios, { type AxiosResponse } from "axios";

import type { ProductType } from "../types";

type ReturnType<T> = AxiosResponse<T>;

export const getProducts = async (): Promise<ReturnType<{
  products: ProductType[]
}>> => {
  try {
    const res = await axios.get("/product");
    console.log(res)
    return res;
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (
  id: string
): Promise<ReturnType<{ product: ProductType }>> => {
  try {
    const res = axios.get(`/product/${id}`);
    console.log(res)
    return res;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (
  newProduct: Omit<ProductType, "id" | "thumbnail">
): Promise<ReturnType<{ product: ProductType }>> => {
  try {
    const res = await axios.post("/product", newProduct);
    return res;
  } catch (error) {
    throw error;
  }
};

export const modifyThumbnail = async (
  productId: string,
  thumbnail: File
): Promise<ReturnType<{ product: ProductType }>> => {
  try {
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);

    const res = axios.patch(`/product/thumbnail/${productId}`, formData);
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const res = await axios.delete(`/product/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const modifyProduct = async (updateProduct: ProductType) => {
  try {
    const res = await axios.patch(
      `/product/${updateProduct.id}`,
      updateProduct
    );
    return res;
  } catch (error) {
    throw error;
  }
};