

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
          <Link href="/shop">Магазин</Link>
        </li>
        <li>
          <Link href="/shop">Вся продукция</Link>
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumb;
