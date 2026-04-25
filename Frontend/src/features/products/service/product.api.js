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

export async function getAllProducts() {
  const response = await productAPI.get("/");
  return response.data;
}

export async function getSingleProduct(id) {
  const response = await productAPI.get(`/detail/${id}`);
  return response.data;
}

export async function addProductVariant(productId, newProductVariant) {
  console.log(newProductVariant);
  const formData = new FormData();

  newProductVariant.images.forEach((image) => {
    formData.append(`images`, image.file);
  });

  formData.append("stock", newProductVariant.stock);
  formData.append("priceAmount", newProductVariant.price);
  formData.append("attributes", JSON.stringify(newProductVariant.attributes));

  const response = await productAPI.post(`/${productId}/variants`, formData);

  return response.data;
}
