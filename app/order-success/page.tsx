"use client";
export const runtime = "nodejs";
import { useCallback } from "react";

interface OrderSuccessPageProps {
  searchParams: { orderId?: string };
}

export default function OrderSuccessPage({ searchParams }: OrderSuccessPageProps) {
  const orderId = searchParams?.orderId;

  const handleDownload = useCallback(() => {
    if (orderId) {
      window.location.href = `/api/orders/${orderId}/receipt`;
    }
  }, [orderId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-4">Покупка успешно завершена!</h1>
      <p className="mb-6">Вы можете скачать чек в формате Word по кнопке ниже. Спасибо за покупку!</p>
      <button
        className="btn btn-primary mb-4"
        onClick={handleDownload}
        disabled={!orderId}
      >
        Скачать чек
      </button>
      <a href="/" className="btn btn-secondary">На главную</a>
    </div>
  );
}