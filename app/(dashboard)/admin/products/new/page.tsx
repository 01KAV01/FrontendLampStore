"use client";
import { DashboardSidebar } from "@/components";
import { convertCategoryNameToURLFriendly as convertSlugToURLFriendly } from "@/utils/categoryFormating";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddNewProduct = () => {
  const [product, setProduct] = useState<{
    title: string;
    price: number;
    manufacturer: string;
    inStock: number;
    mainImage: string;
    description: string;
    slug: string;
    categoryId: string;
  }>({
    title: "",
    price: 0,
    manufacturer: "",
    inStock: 1,
    mainImage: "",
    description: "",
    slug: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);

  const addProduct = async () => {
    if (
      product.title === "" ||
      product.manufacturer === "" ||
      product.description == "" ||
      product.slug === ""
    ) {
      toast.error("Пожалуйста, введите значения в поля ввода");
      return;
    }

    const requestOptions: any = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    };
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, requestOptions)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw Error("Произошла ошибка при создании продукта");
        }
      })
      .then((data) => {
        toast.success("Продукт успешно добавлен");
        setProduct({
          title: "",
          price: 0,
          manufacturer: "",
          inStock: 1,
          mainImage: "",
          description: "",
          slug: "",
          categoryId: "",
        });
      })
      .catch((error) => {
        toast.error("Произошла ошибка при создании продукта");
      });
  };

  const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append("uploadedFile", file);

    try {
      const response = await fetch("${process.env.NEXT_PUBLIC_API_URL}/api/main-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        console.error("Загрузка файла не удалась");
      }
    } catch (error) {
      console.error("Произошла ошибка при отправке запроса:", error);
    }
  };

  const fetchCategories = async () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategories(data);
        setProduct({
          title: "",
          price: 0,
          manufacturer: "",
          inStock: 1,
          mainImage: "",
          description: "",
          slug: "",
          categoryId: data[0]?.id,
        });
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 xl:ml-5 max-xl:px-5 w-full">
        <h1 className="text-3xl font-semibold">Добавить новый продукт</h1>
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Название продукта:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={product?.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
            />
          </label>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">URL адресс товара:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={convertSlugToURLFriendly(product?.slug)}
              onChange={(e) =>
                setProduct({
                  ...product,
                  slug: convertSlugToURLFriendly(e.target.value),
                })
              }
            />
          </label>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Категория:</span>
            </div>
            <select
              className="select select-bordered"
              value={product?.categoryId}
              onChange={(e) =>
                setProduct({ ...product, categoryId: e.target.value })
              }
            >
              {categories &&
                categories.map((category: any) => (
                  <option key={category?.id} value={category?.id}>
                    {category?.name}
                  </option>
                ))}
            </select>
          </label>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Цена продукта:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={product?.price}
              onChange={(e) =>
                setProduct({ ...product, price: Number(e.target.value) })
              }
            />
          </label>
        </div>
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Производитель:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={product?.manufacturer}
              onChange={(e) =>
                setProduct({ ...product, manufacturer: e.target.value })
              }
            />
          </label>
        </div>
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Есть в наличии?</span>
            </div>
            <select
              className="select select-bordered"
              value={product?.inStock}
              onChange={(e) =>
                setProduct({ ...product, inStock: Number(e.target.value) })
              }
            >
              <option value={1}>Да</option>
              <option value={0}>Нет</option>
            </select>
          </label>
        </div>
        <div>
          <input
            type="file"
            className="file-input file-input-bordered file-input-lg w-full max-w-sm"
            placeholder="Выберите изображение продукта"
            onChange={(e: any) => {
              uploadFile(e.target.files[0]);
              setProduct({ ...product, mainImage: e.target.files[0].name });
            }}
          />
          {product?.mainImage && (
            <Image
              src={`/` + product?.mainImage}
              alt={product?.title}
              className="w-auto h-auto"
              width={100}
              height={100}
            />
          )}
        </div>
        <div>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Описание продукта:</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              value={product?.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            ></textarea>
          </label>
        </div>
        <div className="flex gap-x-2">
          <button
            onClick={addProduct}
            type="button"
            className="uppercase bg-blue-500 px-10 py-5 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2"
          >
            Добавить продукт
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
