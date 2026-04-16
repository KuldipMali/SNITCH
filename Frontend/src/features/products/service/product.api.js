import axios from "axios";

const productAPI = axios.create({
  baseURL: "/api/products",
  withCredentials: true,
});

export async function createProduct(formData) {
  const resposne = await productAPI.post("/", formData);
  return resposne.data;
}

export async function getSellerProducts() {
  const response = await productAPI.get("/seller");
  return response.data;
}
