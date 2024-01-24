"use client";
import { saveProductsToDatabase } from "prismaClient/queries/saveProductsToDatabase";
import React from "react";
import { getAllProductData } from "wooCommeceAPIs/getAllProductData";
import { PrimaryButton } from "./PrimaryButton";
import { getAllProductsFromDatabase } from "prismaClient/queries/getAllProductsFromDatabase";
import { deleteAllProductsFromDatabase } from "prismaClient/queries/deleteAllProductsFromDatabse";

const PER_PAGE = 100;

// TODO: rename thsi primary button
export const FetchAndSaveProductsButton = () => {
  const [loading, setLoading] = React.useState(false);

  const handleFetchProductAndSaveToDataBase = async () => {
    setLoading(true);

    let allProducts = [];
    let isNoMoreData = false;
    let offset = 0;

    do {
      const newProducts = await getAllProductData({
        per_page: PER_PAGE,
        offset,
      });

      allProducts.push(newProducts || []);
      offset += PER_PAGE;

      if (newProducts?.length < PER_PAGE) {
        isNoMoreData = true;
      }
    } while (!isNoMoreData);

    const allNewProducts = allProducts?.flat();

    // const products = await getAllProductData();
    console.log("this is the products", allNewProducts);

    const productsDataForDatabase = allNewProducts?.map((data) => {
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
