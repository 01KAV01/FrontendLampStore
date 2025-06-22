"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface UserOrdersProps {
  email: string;
}

const UserOrders: React.FC<UserOrdersProps> = ({ email }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;
    const fetchOrders = async () => {
      const response = await fetch(`/api/orders/user/${email}`);
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    };
    fetchOrders();
  }, [email]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="xl:ml-5 w-full max-xl:mt-5 ">
      <h1 className="text-3xl font-semibold text-center mb-5">История заказов</h1>
      <div className="overflow-x-auto">
        <table className="table table-md table-pin-cols">
          <thead>
            <tr>
              <th></th>
              <th>ID заказа</th>
              <th>Имя и страна</th>
              <th>Статус</th>
              <th>Итоговая стоимость</th>
              <th>Дата</th>
              <th></th>
              <th>Чек</th>
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
                  <td>{order?.dateTime ? new Date(Date.parse(order?.dateTime)).toDateString() : "—"}</td>
                  <th>
                    <Link
                      href={`/orders/${order.id}`}
                      className="btn btn-ghost btn-xs"
                    >
                      подробнее
                    </Link>
                  </th>                 
                   <th>
                    <Link
                    href={`/api/orders/${order.id}/receipt`}
                    className="btn btn-outline btn-xs"
                    download
                    >
                    Скачать чек
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

export default UserOrders;