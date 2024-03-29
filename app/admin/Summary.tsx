"use client";
import { Order, Product, User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { formatNumber } from "@/utils/formatNumber";
import { formatPrice } from "@/utils/formatPrice";

interface SummaryProps {
  products: Product[];
  orders: Order[];
  users: User[];
}

type SummaryDataType = {
  [label: string]: { label: string; digit: number };
};

export default function Summary({ products, orders, users }: SummaryProps) {
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    sale: {
      label: "Total Sale",
      digit: 0,
    },
    products: {
      label: "Total Products",
      digit: 0,
    },
    orders: {
      label: "Orders",
      digit: 0,
    },
    paidOrders: {
      label: "Paid orders",
      digit: 0,
    },
    unPaidOrders: {
      label: "Unpaid Orders",
      digit: 0,
    },
    users: {
      label: "Users",
      digit: 0,
    },
  });

  useEffect(() => {
    setSummaryData((prev) => {
      let tempData = { ...prev };
      const totalSale = orders.reduce((acc, item) => {
        if (item.status === "complete") {
          return acc + item.amount;
        } else {
          return acc;
        }
      }, 0);
      const paidOrders = orders.filter((order) => order.status === "complete");
      const unPaidOrders = orders.filter((order) => order.status === "pending");

      tempData.sale.digit = totalSale;
      tempData.orders.digit = orders.length;
      tempData.paidOrders.digit = paidOrders.length;
      tempData.unPaidOrders.digit = unPaidOrders.length;
      tempData.products.digit = products.length;
      tempData.users.digit = users.length;

      return tempData;
    });
  }, [orders, products, users]);

  const summaryKeys = Object.keys(summaryData);
  return (
    <div className="max-w-[1150px] m-auto">
      <div className="mt-4 mb-8">
        <Heading title="Status" center />
      </div>
      <div className="grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {summaryKeys &&
          summaryKeys.map((key, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 p-4 transition border-2 rounded-xl"
            >
              <div className="text-xl font-bold md:text-4xl">
                {summaryData[key].label === "Total Sale" ? (
                  <>{formatPrice(summaryData[key].digit)}</>
                ) : (
                  <>{formatNumber(summaryData[key].digit)}</>
                )}
              </div>
              <div>{summaryData[key].label}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
