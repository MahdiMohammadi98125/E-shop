"use client";
import { averageProductRating } from "@/utils/averageProductRating";
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductCardProps {
  data: any;
}

export default function ProductCard({ data }: { ProductCardProps }) {
  const router = useRouter();

  return (
    <div className="col-span-1 p-2 text-center transition border-[1.2px] rounded-sm cursor-pointer bg-slate-50 border-slate-200 hover:scale-105">
      <div
        className="flex flex-col items-center gap-1"
        onClick={() => router.push(`/product/${data.id}`)}
      >
        <div className="relative w-full mb-4 overflow-hidden aspect-square">
          <Image
            src={data.images[0].image}
            alt={data.name}
            fill
            className="object-contain w-full h-full"
          />
        </div>
        <div>{truncateText(data.name)}</div>
        <div>
          <Rating value={averageProductRating(data)} readOnly />
        </div>
        <div>{data.reviews.length} reviews</div>
        <div className="font-semibold">{formatPrice(data.price)}</div>
      </div>
    </div>
  );
}
