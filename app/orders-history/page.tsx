"use client";
import { useSession } from "next-auth/react";
import UserOrders from "@/components/UserOrders";

export default function OrdersHistoryPage() {
  const { data: session } = useSession();

  return (
    <div className="max-w-4xl mx-auto py-10">
      {session?.user?.email ? (
        <UserOrders email={session.user.email} />
      ) : (
        <div className="text-gray-500">Не удалось получить email пользователя</div>
      )}
    </div>
  );
}