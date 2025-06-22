"use client";
import { AdminOrders, DashboardSidebar } from "@/components";
import { useSession } from "next-auth/react";
import React from "react";

const DashboardOrdersPage = () => {
  const { data: session } = useSession();

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto h-full max-xl:flex-col max-xl:h-fit">
      <DashboardSidebar />
      {session?.user?.email && (

        <AdminOrders email={session.user.email} />
      )}
    </div>
  );
};

export default DashboardOrdersPage;