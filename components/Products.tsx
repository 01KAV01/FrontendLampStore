import React from "react";
import ProductItem from "./ProductItem";

const Products = async ({ slug }: any) => {

  const inStockNum = slug?.searchParams?.inStock === "true" ? 1 : 0;
  const outOfStockNum = slug?.searchParams?.outOfStock === "true" ? 1 : 0;
  const page = slug?.searchParams?.page ? Number(slug?.searchParams?.page) : 1;

  let stockMode: string = "lte";
  

  if (inStockNum === 1) {
    stockMode = "equals";
  }

  if (outOfStockNum === 1) {
    stockMode = "lt";
  }
 
  if (inStockNum === 1 && outOfStockNum === 1) {
    stockMode = "lte";
  }
    if (inStockNum === 0 && outOfStockNum === 0) {
    stockMode = "gt";
  }

const params = [
  `filters[price][$lte]=${slug?.searchParams?.price || 3000}`,
  `filters[rating][$gte]=${Number(slug?.searchParams?.rating) || 0}`,
  `filters[inStock][$${stockMode}]=1`,
  slug?.searchParams?.category
    ? `filters[category][$equals]=${slug?.searchParams?.category}`
    : slug?.params?.slug?.length > 0
      ? `filters[category][$equals]=${slug?.params?.slug}`
      : null,
  `sort=${slug?.searchParams?.sort}`,
  `page=${page}`,
].filter(Boolean).join("&");

const data = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/products?${params}`
);

  const products = await data.json();


  return (
    <div className="grid grid-cols-3 justify-items-center gap-x-2 gap-y-5 max-[1300px]:grid-cols-3 max-lg:grid-cols-2 max-[500px]:grid-cols-1">
      {products.length > 0 ? (
        products.map((product: Product) => (
          <ProductItem key={product.id} product={product} color="black" />
        ))
      ) : (
        <h3 className="text-3xl mt-5 text-center w-full col-span-full max-[1000px]:text-2xl max-[500px]:text-lg">
          По указанному запросу продукты не найдены
        </h3>
      )}
    </div>
  );
};

export default Products;
