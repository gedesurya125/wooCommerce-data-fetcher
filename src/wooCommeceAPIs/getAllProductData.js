"use server";
const { wooCommerceFetch } = require("./wooCoomerceFetch");

export const getAllProductData = async () => {
  const data = await wooCommerceFetch("/products");
  return await data?.json();
};
