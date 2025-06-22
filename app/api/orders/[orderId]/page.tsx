import prisma from "@/lib/prismadb";

interface OrderDetailPageProps {
  params: { orderId: string };
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const order = await prisma.customer_order.findUnique({
    where: { id: params.orderId },
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) return <div>Заказ не найден</div>;

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Детали заказа #{order.id}</h1>
      <ul>
        {order.products.map((item) => (
          <li key={item.id}>
            {item.product.title} — {item.quantity} шт.
          </li>
        ))}
      </ul>
      <div className="mt-4 font-bold">Сумма: {order.total} ₽</div>
    </div>
  );
}