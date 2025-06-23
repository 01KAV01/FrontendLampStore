"use client";
import { DashboardSidebar, StatsElement, StatsElementCurrentMonth } from "@/components";
import React, { useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";

const AdminDashboardPage = () => {
  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto max-xl:flex-col">
      <DashboardSidebar />
      <div className="flex flex-col items-center ml-5 gap-y-4 w-full max-xl:ml-0 max-xl:px-2 max-xl:mt-5 max-md:gap-y-1">
        <div className="flex justify-between w-full max-md:flex-col max-md:w-full max-md:gap-y-1">
          <StatsElement />
        </div>
        <div className="w-full bg-blue-500 text-white h-40 flex flex-col justify-center items-center gap-y-2">
          <StatsElementCurrentMonth orders={[]} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
