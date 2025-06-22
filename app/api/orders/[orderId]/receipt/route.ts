import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import PDFDocument from "pdfkit";
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

  const doc = new PDFDocument();
  const buffers: Uint8Array[] = [];

  doc.on("data", (chunk) => buffers.push(chunk));
  doc.on("end", () => {});

  doc.fontSize(20).text("Товарный чек", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`Номер заказа: ${order.id}`);
  doc.text(`Дата: ${order.dateTime}`);
  doc.text(`Покупатель: ${order.name} (${order.email})`);
  doc.text(`Страна: ${order.country}`);
  doc.moveDown();

  doc.fontSize(16).text("Состав заказа:");
  order.products.forEach((item, idx) => {
    doc.fontSize(12).text(
      `${idx + 1}. ${item.product.title} — ${item.quantity} шт.`
    );
  });
  doc.moveDown();
  doc.fontSize(14).text(`Сумма: ${order.total} ₽`);
  doc.end();

  const pdfBuffer = await new Promise<Buffer>((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(buffers)));
  });

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="receipt-${order.id}.pdf"`,
    },
  });
}