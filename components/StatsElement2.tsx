import React, { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";

interface Product {
  quantity: number;
}

interface Order {
  dateTime: string;
  products: Product[];
}

interface StatsElementCurrentMonthProps {
  orders: Order[];
}

const StatsElementCurrentMonth: React.FC<StatsElementCurrentMonthProps> = ({ orders }) => {
  const [currentSales, setCurrentSales] = useState(0);
  const [lastMonthSales, setLastMonthSales] = useState(0);

  useEffect(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let current = 0;
    let last = 0;

    interface Product {
      quantity: number;
    }

    interface Order {
      dateTime: string;
      products: Product[];
    }

    orders.forEach((order: Order) => {
      const orderDate = new Date(order.dateTime);
      const isCurrentMonth =
      orderDate.getMonth() === currentMonth &&
      orderDate.getFullYear() === currentYear;
      const isLastMonth =
      orderDate.getMonth() === (currentMonth === 0 ? 11 : currentMonth - 1) &&
      orderDate.getFullYear() === (currentMonth === 0 ? currentYear - 1 : currentYear);

      const orderCount = order.products.reduce(
      (sum: number, product: Product) => sum + product.quantity,
      0
      );

      if (isCurrentMonth) current += orderCount;
      if (isLastMonth) last += orderCount;
    });

    setCurrentSales(current);
    setLastMonthSales(last);
  }, [orders]);

  const percent =
    lastMonthSales > 0
      ? (((currentSales - lastMonthSales) / lastMonthSales) * 100).toFixed(1)
      : null;

  return (
    <div className="w-80 h-32 bg-blue-500 text-white flex flex-col justify-center items-center rounded-md max-md:w-full">
      <h4 className="text-xl text-white">Продажи за текущий месяц</h4>
      <p className="text-2xl font-bold">{currentSales}</p>
      <p
        className={`flex gap-x-1 items-center ${
          percent && Number(percent) >= 0 ? "text-green-300" : "text-red-300"
        }`}
      >
        {percent && Number(percent) >= 0 ? <FaArrowUp /> : <FaArrowDown />}
        {percent !== null ? `${Math.abs(Number(percent))}% к прошлому месяцу` : "Нет данных"}
      </p>
    </div>
  );
};

export default StatsElementCurrentMonth;