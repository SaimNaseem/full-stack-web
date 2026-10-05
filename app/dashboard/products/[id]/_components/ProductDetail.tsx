"use client";

import {
  ChevronRightIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { TProduct } from "@/types";

const ProductDetails = ({ product }: { product: TProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasValidImage = product.imageUrl && product.imageUrl.startsWith("http");

  const openModal = () => {
    if (!hasValidImage) return;
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isModalOpen) return;

      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <div className="space-y-5 md:space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-1 text-lg md:text-xl">
        <Link
          href="/dashboard"
          className="text-gray-400 hover:text-black duration-200"
        >
          Home
        </Link>

        <ChevronRightIcon className="w-4 h-4 text-gray-400" />

        <p>{product.name}</p>
      </div>

      <div className="flex w-full space-x-5">
        {/* LEFT SIDE */}
        <div className="space-y-5 w-full max-w-[600px]">
          <div
            className="aspect-square max-h-[600px] relative overflow-hidden rounded-[40px] bg-gray-50 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity duration-200"
            onClick={openModal}
          >
            {hasValidImage ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-400">
                No image available
              </div>
            )}
          </div>

          {/* THUMBNAIL */}
          {hasValidImage && (
            <div className="flex flex-wrap items-center gap-3">
              <div
                className="size-[140px] relative overflow-hidden rounded-3xl bg-gray-100 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity duration-200"
                onClick={openModal}
              >
                <Image
                  src={product.imageUrl}
                  alt={`${product.name} thumbnail`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4 w-full">
          {/* RATING */}
          <div className="flex items-center">
            {[...Array(3)].map((_, index) => (
              <StarIcon
                key={index}
                className="text-yellow-300 fill-yellow-300 w-5 h-5"
              />
            ))}
          </div>

          {/* PRODUCT NAME */}
          <h2 className="text-gray-900 text-lg md:text-2xl font-medium">
            {product.name}
          </h2>

          {/* DESCRIPTION */}
          <p className="text-gray-400 md:text-lg">{product.description}</p>

          {/* PRICE */}
          <p className="text-xl md:text-3xl font-semibold text-gray-900">
            ${product.price}
          </p>

          {/* BUY */}
          <button className="mt-2 py-2 md:py-3 px-6 md:text-lg font-medium rounded-full w-full max-w-[300px] border-2 border-transparent bg-[#BAFC50] hover:bg-white hover:border-[#BAFC50] hover:scale-95 duration-200">
            Buy Now
          </button>
        </div>
      </div>

      {/* IMAGE MODAL */}
      {isModalOpen && hasValidImage && (
        <div
          className="fixed inset-0 z-50"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
          onClick={closeModal}
        >
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-6 right-6 z-20 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 transition-all duration-200 shadow-lg"
          >
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>

          <div
            className="flex items-center justify-center h-full p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="max-w-5xl max-h-full">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={800}
                height={800}
                className="w-full h-auto max-h-[85vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
