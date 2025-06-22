import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType } from "docx";
export const runtime = "nodejs";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU");
}

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

  // Считаем общее количество товаров
  const totalCount = order.products.reduce((sum, item) => sum + item.quantity, 0);

  // Таблица товаров
  const tableRows = [
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph("№")], width: { size: 5, type: WidthType.PERCENTAGE } }),
        new TableCell({ children: [new Paragraph("Наименование товара")], width: { size: 35, type: WidthType.PERCENTAGE } }),
        new TableCell({ children: [new Paragraph("Кол-во")], width: { size: 15, type: WidthType.PERCENTAGE } }),
        new TableCell({ children: [new Paragraph("Цена")], width: { size: 20, type: WidthType.PERCENTAGE } }),
        new TableCell({ children: [new Paragraph("Сумма")], width: { size: 25, type: WidthType.PERCENTAGE } }),
      ],
    }),
    ...order.products.map((item, idx) =>
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph(String(idx + 1))] }),
          new TableCell({ children: [new Paragraph(item.product.title)] }),
          new TableCell({ children: [new Paragraph(String(item.quantity))] }),
          new TableCell({ children: [new Paragraph(`${item.product.price} ₽`)] }),
          new TableCell({ children: [new Paragraph(`${item.product.price * item.quantity} ₽`)] }),
        ],
      })
    ),
    // Итоговая строка
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph("")],
          columnSpan: 4,
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: "Итого", bold: true }),
                new TextRun({ text: ` ${order.total} ₽`, bold: true }),
              ],
            }),
          ],
        }),
      ],
    }),
  ];

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun({ text: 'ООО "LampStore"', bold: true, size: 28 })],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [new TextRun({ text: "ИНН 7825706086", size: 24 })],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [new TextRun({ text: "410065, 64- Саратовская область. город Саратов, пр-кт им 50 лет Октября, дом 85", size: 24 })],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph(""),
          new Paragraph({
            children: [
              new TextRun({
                text: `Товарный чек №${order.id} от ${order.dateTime ? formatDate(typeof order.dateTime === "string" ? order.dateTime : order.dateTime.toISOString()) : ""}`,
                bold: true,
                size: 28,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph(""),
          new Table({
            rows: tableRows,
            width: { size: 100, type: WidthType.PERCENTAGE },
          }),
          new Paragraph(""),
          new Paragraph({
            children: [
              new TextRun({
                text: `Всего отпущено ${totalCount} товаров на сумму ${order.total} ₽`,
                bold: true,
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="Chek-${order.id}.docx"`,
    },
  });
}