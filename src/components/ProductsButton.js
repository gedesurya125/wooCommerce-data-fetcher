"use client";
import { saveProductsToDatabase } from "prismaClient/queries/saveProductsToDatabase";
import React from "react";
import { getAllProductData } from "wooCommeceAPIs/getAllProductData";
import { PrimaryButton } from "./PrimaryButton";
import { getAllProductsFromDatabase } from "prismaClient/queries/getAllProductsFromDatabase";
import { deleteAllProductsFromDatabase } from "prismaClient/queries/deleteAllProductsFromDatabse";

// TODO: rename thsi primary button
export const FetchAndSaveProductsButton = () => {
  const [loading, setLoading] = React.useState(false);

  const handleFetchProductAndSaveToDataBase = async () => {
    setLoading(true);
    const products = await getAllProductData();
    console.log("this is the products", products);

    const productsDataForDatabase = products?.map((data) => {
      return { name: data?.name };
    });

    const response = await saveProductsToDatabase(productsDataForDatabase);
    console.log("this is the response", response);
    setLoading(false);
  };

  return (
    <PrimaryButton
      disabled={loading}
      onClick={handleFetchProductAndSaveToDataBase}
    >
      {loading ? "Loading..." : "fetch and save products"}
    </PrimaryButton>
  );
};

export const GetAllProductFromDatabaseButton = () => {
  const handleClick = async () => {
    const response = await getAllProductsFromDatabase();

    console.log("all products from database", response);
  };

  return (
    <PrimaryButton onClick={handleClick}>
      Get Products From Database
    </PrimaryButton>
  );
};

export const DeleteAllProductsFromDatabaseButton = () => {
  const handleClick = async () => {
    const response = await deleteAllProductsFromDatabase();
    console.log("all products is deleted from database", response);
  };

  return (
    <PrimaryButton onClick={handleClick}>
      Delete all Products from Database
    </PrimaryButton>
  );
};
