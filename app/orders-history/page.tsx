import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Order = {
  id: string | number;
  dateTime?: string;
  status: string;
  total: number;
};

export default function OrdersHistoryPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/user/${session.user.email}`)
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .finally(() => setLoading(false));
    }
  }, [session?.user?.email]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">История заказов</h1>
      {orders.length === 0 ? (
        <div className="text-gray-500">Отсутствуют совершённые заказы</div>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded">
              <div>Номер заказа: {order.id}</div>
              <div>Дата: {order.dateTime ? new Date(order.dateTime).toLocaleString() : "—"}</div>
              <div>Статус: {order.status}</div>
              <div>Сумма: {order.total} ₽</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}