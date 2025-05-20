

import Link from "next/link";
import React from "react";
import { FaHouse } from "react-icons/fa6";

const Breadcrumb = () => {
  return (
    <div className="text-lg breadcrumbs pb-10 py-5 max-sm:text-base">
      <ul>
        <li>
          <Link href="/">
            <FaHouse className="mr-2" />
            Главная
          </Link>
        </li>
        <li>
          <Link href="/shop?outOfStock=true&inStock=true&rating=0&price=3000&sort=defaultSort&page=1">Магазин</Link>
        </li>
        <li>
          <Link href="/shop?outOfStock=true&inStock=true&rating=0&price=3000&sort=defaultSort&page=1">Вся продукция</Link>
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumb;
