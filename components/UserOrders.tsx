"use client";
import React, { useEffect, useState } from "react";

interface UserOrdersProps {
  email: string;
}

const UserOrders: React.FC<UserOrdersProps> = ({ email }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/user/${email}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .finally(() => setLoading(false));
  }, [email]);

  if (loading) return <div>Загрузка...</div>;

  if (orders.length === 0) {
    return <div className="text-gray-500">Отсутствуют совершённые заказы</div>;
  }

  // Скопируй сюда разметку из AdminOrders (таблица или список заказов)
  return (
    <ul className="space-y-4">
      {orders.map((order) => (
        <li key={order.id} className="border p-4 rounded">
          <div>Номер заказа: {order.id}</div>
          <div>Почта: {order.email}</div>
          <div>Дата: {order.dateTime ? new Date(order.dateTime).toLocaleString() : "—"}</div>
          <div>Статус: {order.status}</div>
          <div>Сумма: {order.total} ₽</div>
        </li>
      ))}
    </ul>
  );
};

export default UserOrders;