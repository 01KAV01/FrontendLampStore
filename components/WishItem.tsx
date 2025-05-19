
"use client";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { FaHeartCrack } from "react-icons/fa6";
import { deleteWishItem } from "@/app/actions";
import { useSession } from "next-auth/react";

interface wishItemStateTrackers {
  isWishItemDeleted: boolean;
  setIsWishItemDeleted: any;
}

const WishItem = ({
  id,
  title,
  price,
  image,
  slug,
  stockAvailabillity,
}: ProductInWishlist) => {
  const { data: session, status } = useSession();
  const { removeFromWishlist } = useWishlistStore();
  const router = useRouter();
  const [userId, setUserId] = useState<string>();

  const openProduct = (slug: string): void => {
    router.push(`/product/${slug}`);
  };

  const getUserByEmail = useCallback(async () => {
    if (session?.user?.email) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          setUserId(data?.id);
        });
    }
  }, [session?.user?.email]);

  const deleteItemFromWishlist = async (productId: string) => {
    
    if (userId) {

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/${userId}/${productId}`, {method: "DELETE"}).then(
        (response) => {
          removeFromWishlist(productId);
          toast.success("Товар удален из вашего списка желаний");
        }
      );
    }else{
      toast.error("Для выполнения этого действия вам необходимо войти в систему.");
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, [getUserByEmail]);

  return (
    <tr className="hover:bg-gray-100 cursor-pointer">
      <th
        className="text-black text-sm text-center"
        onClick={() => openProduct(slug)}
      >
        {id}
      </th>
      <th>
        <div className="w-12 h-12 mx-auto" onClick={() => openProduct(slug)}>
          <Image
            src={`/${image}`}
            width={200}
            height={200}
            className="w-auto h-auto"
            alt={title}
          />
        </div>
      </th>
      <td
        className="text-black text-sm text-center"
        onClick={() => openProduct(slug)}
      >
        {title}
      </td>
      <td
        className="text-black text-sm text-center"
        onClick={() => openProduct(slug)}
      >
        {stockAvailabillity ? (
          <span className="text-success">В наличии</span>
        ) : (
          <span className="text-error">Распродано</span>
        )}
      </td>
      <td>
        <button className="btn btn-xs bg-blue-500 text-white hover:text-blue-500 border border-blue-500 hover:bg-white hover:text-blue-500 text-sm">
          <FaHeartCrack />
          <span
            className="max-sm:hidden"
            onClick={() => deleteItemFromWishlist(id)}
          >
            удалить из списка желаний
          </span>
        </button>
      </td>
    </tr>
  );
};

export default WishItem;
