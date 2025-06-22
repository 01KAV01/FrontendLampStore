"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Order {
  id: string | number;
  name: string;
  country: string;
  status: string;
  total: number;
  dateTime: string;
  email: string;
}

interface AdminOrdersProps {
  email?: string; // email теперь опциональный
}

const AdminOrders: React.FC<AdminOrdersProps> = ({ email }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/api/orders`;
      if (email) {
        url = `${process.env.NEXT_PUBLIC_API_URL}/api/orders/user/${email}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    };
    fetchOrders();
  }, [email]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="xl:ml-5 w-full max-xl:mt-5 ">
      <h1 className="text-3xl font-semibold text-center mb-5">
        {email ? "История заказов" : "Все заказы"}
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-md table-pin-cols">
          <thead>
            <tr>
              <th></th>
              <th>ID заказа</th>
              <th>Имя и страна</th>
              <th>Статус</th>
              <th>Промежуточный итог</th>
              <th>Дата</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-gray-500">
                  Отсутствуют совершённые заказы
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order?.id}>
                  <th>
                    <label htmlFor={`order-checkbox-${order?.id}`} className="sr-only">
                      Выбрать заказ #{order?.id}
                    </label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      id={`order-checkbox-${order?.id}`}
                      title={`Выбрать заказ #${order?.id}`}
                    />
                  </th>
                  <td>
                    <div>
                      <p className="font-bold">#{order?.id}</p>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-5">
                      <div>
                        <div className="font-bold">{order?.name}</div>
                        <div className="text-sm opacity-50">{order?.country}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-success text-white badge-sm">
                      {order?.status}
                    </span>
                  </td>
                  <td>
                    <p>₽{order?.total}</p>
                  </td>
                  <td>
                    {order?.dateTime
                      ? new Date(Date.parse(order?.dateTime)).toDateString()
                      : "—"}
                  </td>
                  <th>
                    <Link
                      href={email ? `/orders/${order?.id}` : `/admin/orders/${order?.id}`}
                      className="btn btn-ghost btn-xs"
                    >
                      детали
                    </Link>
                  </th>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;