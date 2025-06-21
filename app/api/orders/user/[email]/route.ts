import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(req: Request, { params }: { params: { email: string } }) {
  const { email } = params;
  try {
    const orders = await prisma.customer_order.findMany({
      where: { email },
      orderBy: { dateTime: "desc" },
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}