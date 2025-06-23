import React, { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";

const LAST_MONTH_SALES = 523;

const StatsElementCurrentMonth = () => {
  const [currentSales, setCurrentSales] = useState<number | null>(null);

  useEffect(() => {
    async function fetchSales() {
      const res = await fetch("/api/sales/current-month");
      const data = await res.json();
      setCurrentSales(data.count);
    }
    fetchSales();
  }, []);

  const percent =
    currentSales !== null
      ? (((currentSales - LAST_MONTH_SALES) / LAST_MONTH_SALES) * 100).toFixed(1)
      : null;

  return (
    <div className="w-80 h-32 bg-blue-500 text-white flex flex-col justify-center items-center rounded-md max-md:w-full">
      <h4 className="text-xl text-white">Продажи за текущий месяц</h4>
      <p className="text-2xl font-bold">{currentSales !== null ? currentSales : "..."}</p>
      <p
        className={`flex gap-x-1 items-center ${
          percent && Number(percent) >= 0 ? "text-green-300" : "text-red-300"
        }`}
      >
        {percent && Number(percent) >= 0 ? <FaArrowUp /> : <FaArrowDown />}
        {percent !== null ? `${Math.abs(Number(percent))}% к прошлому месяцу` : "..."}
      </p>
    </div>
  );
};

export default StatsElementCurrentMonth;