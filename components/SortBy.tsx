"use client";
import React from "react";
import { useSortStore } from "@/app/_zustand/sortStore";

const SortBy = () => {
  const { sortBy, changeSortBy } = useSortStore();

  return (
    <div className="flex items-center gap-x-5 max-lg:flex-col max-lg:w-full max-lg:items-start">
      <label htmlFor="sort-select" className="text-xl">Сортировать по:</label>
      <select
        id="sort-select"
        defaultValue={sortBy}
        onChange={(e) => changeSortBy(e.target.value)}
        className="select border-gray-400 py-2 px-2 text-base border-2 select-bordered w-40 focus:outline-none outline-none max-lg:w-full bg-white"
        name="sort"
      >
        <option value="defaultSort">По умолчанию</option>
        <option value="titleAsc">Сортировать A-Z</option>
        <option value="titleDesc">Сортировать Z-A</option>
        <option value="lowPrice">Самая низкая цена</option>
        <option value="highPrice">Самая высокая цена</option>
      </select>
    </div>
  );
};

export default SortBy;
