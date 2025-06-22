import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { Document, Packer, Paragraph, TextRun } from "docx";
export const runtime = "nodejs";

export async function GET(req: Request, { params }: { params: { orderId: string } }) {
  const { orderId } = params;
  const order = await prisma.customer_order.findUnique({
    where: { id: orderId },
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  // Формируем параграфы для docx
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun({ text: "Товарный чек", bold: true, size: 40 })],
            alignment: "center",
          }),
          new Paragraph(""),
          new Paragraph(`Номер заказа: ${order.id}`),
          new Paragraph(`Дата: ${order.dateTime}`),
          new Paragraph(`Покупатель: ${order.name} (${order.email})`),
          new Paragraph(`Страна: ${order.country}`),
          new Paragraph(""),
          new Paragraph({ children: [new TextRun({ text: "Состав заказа:", bold: true, size: 28 })] }),
          ...order.products.map((item, idx) =>
            new Paragraph(
              `${idx + 1}. ${item.product.title} — ${item.quantity} шт.`
            )
          ),
          new Paragraph(""),
          new Paragraph({ children: [new TextRun({ text: `Сумма: ${order.total} ₽`, bold: true })] }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="receipt-${order.id}.docx"`,
    },
  });
}