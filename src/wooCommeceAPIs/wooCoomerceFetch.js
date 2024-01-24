export const wooCommerceFetch = async (endPoints = "", queryParams = []) => {
  const stringifyQueryParams =
    queryParams?.length > 0 ? `&${queryParams.join("&")}` : "";

  const apiUrl = `${process.env.NEXT_PUBLIC_AMBRATEC_API_BASE_URL}${endPoints}?consumer_key=${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET}${stringifyQueryParams}`;
  return await fetch(apiUrl, { cache: "no-store" });
};
