"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import HeaderTop from "./HeaderTop";
import Image from "next/image";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { FaBell } from "react-icons/fa6";

import CartElement from "./CartElement";
import HeartElement from "./HeartElement";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";

const Header = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { wishlist, setWishlist, wishQuantity } = useWishlistStore();

const handleLogout = () => {
    setTimeout(() => signOut({ callbackUrl: "/login", redirect: true }), 500);
    toast.success("Выход из аккаунта выполнен успешно!");
};

  const getWishlistByUserId = useCallback(async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/${id}`, {
      cache: "no-store",
    });
    const wishlist = await response.json();
    const productArray: {
      id: string;
      title: string;
      price: number;
      image: string;
      slug:string
      stockAvailabillity: number;
    }[] = [];
    
    wishlist.map((item: any) => productArray.push({id: item?.product?.id, title: item?.product?.title, price: item?.product?.price, image: item?.product?.mainImage, slug: item?.product?.slug, stockAvailabillity: item?.product?.inStock}));
    
    setWishlist(productArray);
}, [setWishlist]);

  const getUserByEmail = useCallback(async () => {
    if (session?.user?.email) {
      
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          getWishlistByUserId(data?.id);
        });
    }
  }, [session?.user?.email, getWishlistByUserId]);

  useEffect(() => {
    getUserByEmail();
}, [getUserByEmail, wishlist.length]);

  return (
    <header className="bg-white">
      <HeaderTop />
      {pathname.startsWith("/admin") === false && (
        <div className="h-32 bg-white flex items-center justify-between px-16 max-[1320px]:px-16 max-md:px-6 max-lg:flex-col max-lg:gap-y-7 max-lg:justify-center max-lg:h-60 max-w-screen-2xl mx-auto">
          <Link href="/">
            <Image
              src="/new logo.png"
              width={300}
              height={300}
              alt="singitronic logo"
              className="relative right-5 max-[1023px]:w-56"
              priority
            />
          </Link>
          <SearchInput />
          <div className="flex gap-x-10">
            <HeartElement wishQuantity={wishQuantity} />
            <CartElement />
          </div>
        </div>
      )}
      {pathname.startsWith("/admin") === true && (
        <div className="flex justify-between h-32 bg-white items-center px-16 max-[1320px]:px-10  max-w-screen-2xl mx-auto max-[400px]:px-5">
          <Link href="/">
            <Image
              src="/new logo.png"
              width={130}
              height={130}
              alt="new logo.png"
              className="w-56 h-auto"
            />
          </Link>
          <div className="flex gap-x-5 items-center">
            <FaBell className="text-xl" />
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="w-10" aria-label="User menu" title="User menu">
                <Image
                  src="/randomuser.jpg"
                  alt="random profile photo"
                  width={30}
                  height={30}
                  className="w-full h-full rounded-full"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/admin">Панель инструментов</Link>
                </li>
                <li>
                  <a>Профиль</a>
                </li>
                <li onClick={handleLogout}>
                  <a href="#">Выйти</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
