"use client";


import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { FaHeartCrack } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

interface AddToWishlistBtnProps {
  product: Product;
  slug: string;
}

const AddToWishlistBtn = ({ product, slug }: AddToWishlistBtnProps) => {
  const { data: session, status } = useSession();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlistStore();
  const [isProductInWishlist, setIsProductInWishlist] = useState<boolean>();

  const addToWishlistFun = async () => {
    if (session?.user?.email) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) =>
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist`, {
            method: "POST",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId: product?.id, userId: data?.id }),
          })
            .then((response) => response.json())
            .then((data) => {
              addToWishlist({
                id: product?.id,
                title: product?.title,
                price: product?.price,
                image: product?.mainImage,
                slug: product?.slug,
                stockAvailabillity: product?.inStock,
              });
              toast.success("Продукт добавлен в список желаний");
            })
        );
    } else {
      toast.error("Вам необходимо войти в систему, чтобы добавить продукт в список желаний.");
    }
  };

  const removeFromWishlistFun = async () => {
    if (session?.user?.email) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          return fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/${data?.id}/${product?.id}`,
            {
              method: "DELETE",
            }
          );
        })
        .then((response) => {
          removeFromWishlist(product?.id);
          toast.success("Продукт удален из списка желаний");
        });
    }
  };

  const isInWishlist = useCallback(async () => {
    if (session?.user?.email) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          return fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/${data?.id}/${product?.id}`
          );
        })
        .then((response) => response.json())
        .then((data) => {
          if (data[0]?.id) {
            setIsProductInWishlist(() => true);
          } else {
            setIsProductInWishlist(() => false);
          }
        });
    }
 }, [session?.user?.email, product?.id]);

  useEffect(() => {
    isInWishlist();
}, [isInWishlist, wishlist]);

  return (
    <>
      {isProductInWishlist ? (
        <p
          className="flex items-center gap-x-2 cursor-pointer"
          onClick={removeFromWishlistFun}
        >
          <FaHeartCrack className="text-xl text-custom-black" />
          <span className="text-lg">УДАЛИТЬ ИЗ СПИСКА ЖЕЛАНИЙ</span>
        </p>
      ) : (
        <p
          className="flex items-center gap-x-2 cursor-pointer"
          onClick={addToWishlistFun}
        >
          <FaHeart className="text-xl text-custom-black" />
          <span className="text-lg">ДОБАВИТЬ В СПИСОК ЖЕЛАНИЙ</span>
        </p>
      )}
    </>
  );
};

export default AddToWishlistBtn;
