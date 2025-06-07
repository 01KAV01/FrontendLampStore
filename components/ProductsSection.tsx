import React from "react";
import ProductItem from "./ProductItem";
import Heading from "./Heading";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import {
  Breadcrumb,
  Filters,
  Pagination,
  Products,
  SortBy,
} from "@/components";




const ProductsSection = (slug: any) => {
  // sending API request for getting all products

  return (
    <div className="bg-blue-500 border-t-4 border-white">
      <div className="max-w-screen-2xl mx-auto pt-20">
        <Heading title="ЛУЧШЕЕ ЗА ПОСЛЕДНЕЕ ВРЕМЯ" />
        <div className="divider"></div>
        <Products slug={slug} />
        <div className="grid grid-cols-4 justify-items-center max-w-screen-2xl mx-auto py-10 gap-x-2 px-10 gap-y-8 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          <Products slug={slug} />
        </div>
        <Products slug={slug} />
      </div>
              <Products slug={slug} />
    </div>
  );
};

export default ProductsSection;
