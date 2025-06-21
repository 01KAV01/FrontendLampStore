import prisma from "@/utils/db";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";


//  Для шифрования пароля используется библиотека bcrypt
import bcrypt from "bcryptjs";

export const POST = async (request: any) => {
  // Получение данных пользователя
  const { email, password } = await request.json();

  // Проверка уникальности почты
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    return new NextResponse("Почта уже используется", { status: 400 });
  }
  // Шифрование (хэширование) пароля, где password - исходный пароль,
  // а 5 - количество "соль-раундов"
  const hashedPassword = await bcrypt.hash(password, 5);

  try {
    await prisma.user.create({
      data: {
        id: nanoid() + "",
        email,
        password: hashedPassword,
      },
    });
    return new NextResponse("Пользователь зарегестрирован", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
