"use client";
export const runtime = "nodejs";
import { useEffect } from "react";

interface OrderSuccessPageProps {
  searchParams: { orderId?: string };
}

export default function OrderSuccessPage({ searchParams }: OrderSuccessPageProps) {
  const orderId = searchParams?.orderId;

  useEffect(() => {
    if (orderId) {
      // Запуск скачивания Word-файла
      window.location.href = `/api/orders/${orderId}/receipt`;
    }
  }, [orderId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-4">Покупка успешно завершена!</h1>
      <p className="mb-6">Ваш чек в формате Word будет автоматически скачан. Спасибо за покупку!</p>
      <a href="/" className="btn btn-primary">На главную</a>
    </div>
  );
}