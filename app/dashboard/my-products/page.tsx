"use client";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import api from "@/lib/axios";
import { TProduct } from "@/types";

const Page = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [publishedStatus, setPublishedStatus] = useState<boolean[]>([]);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const { data } = await api.get("/api/v1/products");

        setProducts(data);

        setPublishedStatus(
          data.map((product: TProduct) => product.isPublished),
        );
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch products");

        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const togglePublished = async (index: number, productId: string) => {
    try {
      const newPublishedStatus = !publishedStatus[index];

      await api.patch(`/api/v1/products/${productId}/isPublished`, {
        isPublished: newPublishedStatus,
      });

      setPublishedStatus((prev) => {
        const newStatus = [...prev];
        newStatus[index] = newPublishedStatus;

        return newStatus;
      });
    } catch (error) {
      console.error("Failed to update published status:", error);
    }
  };

  const deleteProduct = async (productId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    try {
      setDeletingProductId(productId);

      await api.delete(`/api/v1/products/${productId}`);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId),
      );

      setPublishedStatus((prevStatus) => {
        const productIndex = products.findIndex(
          (product) => product.id === productId,
        );

        if (productIndex === -1) {
          return prevStatus;
        }

        return prevStatus.filter((_, index) => index !== productIndex);
      });
    } catch (error: any) {
      console.error("Failed to delete product:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete product";

      alert(errorMessage);
    } finally {
      setDeletingProductId(null);
    }
  };

  return (
    <div className="space-y-5 md:space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-xl">My Listing</h2>

        <Link
          href="/dashboard/products/new"
          className="py-1.5 px-4 font-medium rounded-full text-sm border-2 border-transparent bg-[#BAFC50] hover:bg-white hover:border-[#BAFC50] hover:scale-95 duration-200"
        >
          Add New Product
        </Link>
      </div>

      {/* PRODUCT TABLE */}
      <div className="border border-gray-200 rounded-2xl text-center overflow-x-auto">
        <div className="min-w-[1300px]">
          {/* TABLE HEADER */}
          <div className="grid grid-cols-8 py-2.5 px-6 border-b border-gray-200 font-medium">
            <p className="col-start-1 col-end-3 text-left">Products</p>

            <p>Price</p>
            <p>Stock</p>
            <p>Stock Level</p>
            <p>Published</p>
            <p>Manage</p>
            <p>Delete</p>
          </div>

          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="py-8 text-center">
                <p>Loading products...</p>
              </div>
            ) : error ? (
              <div className="py-8 text-center text-red-500">
                <p>Error: {error}</p>
              </div>
            ) : products.length === 0 ? (
              <div className="py-8 text-center">
                <p>No products found</p>
              </div>
            ) : (
              products.map((product, index) => {
                const firstChar = product.id?.charCodeAt(0) || 0;

                const secondChar = product.id?.charCodeAt(1) || 0;

                const randomPercentage = ((firstChar + secondChar) % 100) + 1;

                const isDeleting = deletingProductId === product.id;

                return (
                  <div
                    key={product.id}
                    className="grid grid-cols-8 py-5 px-6 items-center"
                  >
                    {/* PRODUCT */}
                    <div className="col-start-1 col-end-3 text-left">
                      <div className="flex items-center space-x-4">
                        {product.imageUrl?.startsWith("http") ? (
                          <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex w-16 h-16 shrink-0 items-center justify-center rounded-xl bg-gray-200 text-xs text-gray-500">
                            No image
                          </div>
                        )}

                        <p className="line-clamp-1">{product.name}</p>
                      </div>
                    </div>

                    {/* PRICE */}
                    <div>
                      <p>${product.price}</p>
                    </div>

                    {/* STOCK */}
                    <div>
                      <p>{product.stockLevel}</p>
                    </div>

                    {/* STOCK LEVEL */}
                    <div className="space-y-2">
                      <div
                        className={twMerge(
                          "w-full h-1.5 bg-gray-100 border border-gray-200 rounded-full duration-500",
                        )}
                      >
                        <motion.div
                          className={twMerge(
                            "h-full rounded-full",
                            randomPercentage >= 80
                              ? "bg-red-500"
                              : randomPercentage >= 50
                                ? "bg-yellow-500"
                                : "bg-green-500",
                          )}
                          initial={{ width: 0 }}
                          animate={{
                            width: `${randomPercentage}%`,
                          }}
                          transition={{
                            duration: 0.5,
                          }}
                        />
                      </div>

                      <p className="text-sm text-gray-600">
                        {randomPercentage}%
                      </p>
                    </div>

                    {/* PUBLISHED */}
                    <div>
                      <button
                        type="button"
                        className={twMerge(
                          "p-[3px] rounded-full w-11 duration-300",
                          publishedStatus[index]
                            ? "bg-green-500"
                            : "bg-gray-200 hover:bg-green-200",
                        )}
                        onClick={() => togglePublished(index, product.id)}
                      >
                        <div
                          className={twMerge(
                            "w-5 h-5 bg-white rounded-full shadow-xl duration-300",
                            publishedStatus[index] && "translate-x-[90%]",
                          )}
                        />
                      </button>
                    </div>

                    {/* MANAGE */}
                    <div className="flex justify-center">
                      <Link
                        href={`/dashboard/products/${product.id}/edit`}
                        className="flex items-center space-x-2 border border-gray-200 rounded-full px-3 py-1 hover:bg-black hover:text-white hover:scale-95 duration-200"
                      >
                        <PencilIcon className="w-4 h-4" />

                        <span>Manage</span>
                      </Link>
                    </div>

                    {/* DELETE */}
                    <div className="flex justify-center">
                      <button
                        type="button"
                        disabled={isDeleting}
                        onClick={() => deleteProduct(product.id)}
                        className={twMerge(
                          "flex items-center space-x-2 border border-red-200 text-red-500 rounded-full px-3 py-1 duration-200",
                          "hover:bg-red-500 hover:text-white hover:border-red-500 hover:scale-95",
                          isDeleting &&
                            "opacity-50 cursor-not-allowed hover:scale-100",
                        )}
                      >
                        {isDeleting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />

                            <span>Deleting...</span>
                          </>
                        ) : (
                          <>
                            <TrashIcon className="w-4 h-4" />

                            <span>Delete</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
