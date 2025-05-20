"use client";
import { DashboardSidebar } from "@/components";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { isValidEmailAddressFormat } from "@/lib/utils";

interface DashboardUserDetailsProps {
  params: { id: number };
}

const DashboardSingleUserPage = ({
  params: { id },
}: DashboardUserDetailsProps) => {
  const [userInput, setUserInput] = useState<{
    email: string;
    newPassword: string;
    role: string;
  }>({
    email: "",
    newPassword: "",
    role: "",
  });
  const router = useRouter();

  const deleteUser = async () => {
    const requestOptions = {
      method: "DELETE",
    };
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, requestOptions)
      .then((response) => {
        if (response.status === 204) {
          toast.success("Пользователь успешно удален");
          router.push("/admin/users");
        } else {
          throw Error("Произошла ошибка при удалении пользователя");
        }
      })
      .catch((error) => {
        toast.error("Произошла ошибка при удалении пользователя");
      });
  };

  const updateUser = async () => {
    if (
      userInput.email.length > 3 &&
      userInput.role.length > 0 &&
      userInput.newPassword.length > 0
    ) {
      if (!isValidEmailAddressFormat(userInput.email)) {
        toast.error("Вы ввели неверный формат адреса электронной почты");
        return;
      }

      if (userInput.newPassword.length > 7) {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userInput.email,
            password: userInput.newPassword,
            role: userInput.role,
          }),
        };
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, requestOptions)
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            } else {
              throw Error("Ошибка при обновлении пользователя");
            }
          })
          .then((data) => toast.success("Пользователь успешно обновлен"))
          .catch((error) => {
            toast.error("Произошла ошибка при обновлении пользователя");
          });
      } else {
        toast.error("Пароль должен быть длиннее 7 символов");
        return;
      }
    } else {
      toast.error("Для обновления пользователя необходимо ввести все значения");
      return;
    }
  };

  useEffect(() => {
    // sending API request for a single user
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserInput({
          email: data?.email,
          newPassword: "",
          role: data?.role,
        });
      });
  }, [id]);

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 xl:pl-5 max-xl:px-5 w-full">
        <h1 className="text-3xl font-semibold">Подробности пользователя</h1>
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Почта:</span>
            </div>
            <input
              type="email"
              className="input input-bordered w-full max-w-xs"
              value={userInput.email}
              onChange={(e) =>
                setUserInput({ ...userInput, email: e.target.value })
              }
            />
          </label>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Новый пароль:</span>
            </div>
            <input
              type="password"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) =>
                setUserInput({ ...userInput, newPassword: e.target.value })
              }
              value={userInput.newPassword}
            />
          </label>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Роль пользователя: </span>
            </div>
            <select
              className="select select-bordered"
              value={userInput.role}
              onChange={(e) =>
                setUserInput({ ...userInput, role: e.target.value })
              }
            >
              <option value="admin">администратор</option>
              <option value="user">пользователь</option>
            </select>
          </label>
        </div>
        <div className="flex gap-x-2 max-sm:flex-col">
          <button
            type="button"
            className="uppercase bg-blue-500 px-10 py-5 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2"
            onClick={updateUser}
          >
            Обновить пользователя
          </button>
          <button
            type="button"
            className="uppercase bg-red-600 px-10 py-5 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2"
            onClick={deleteUser}
          >
            Удалить пользователя
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSingleUserPage;
