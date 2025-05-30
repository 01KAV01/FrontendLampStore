"use client";



import React, { useEffect, useState } from "react";
import Link from "next/link";

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`);
      const data = await response.json();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="xl:ml-5 w-full max-xl:mt-5 ">
      <h1 className="text-3xl font-semibold text-center mb-5">Все заказы</h1>
      <div className="overflow-x-auto">
        <table className="table table-md table-pin-cols">
          {/* head */}
          <thead>
            <tr>
              <th>
              </th>
              <th>ID заказа</th>
              <th>Имя и страна</th>
              <th>Статус</th>
              <th>Промежуточный итог</th>
              <th>Дата</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {orders &&
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

                  <td>{ new Date(Date.parse(order?.dateTime)).toDateString() }</td>
                  <th>
                    <Link
                      href={`/admin/orders/${order?.id}`}
                      className="btn btn-ghost btn-xs"
                    >
                      детали
                    </Link>
                  </th>
                </tr>
              ))}
          </tbody>
          {/* foot */}
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
