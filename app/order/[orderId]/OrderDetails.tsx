import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utils/formatPrice";
import { Order } from "@prisma/client";
import moment from "moment";
import React from "react";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";

interface OrderDetailsProps {
  order: Order;
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div className="max-w-[1150px] m-auto flex gap-2 flex-col">
      <div className="mt-8">
        <Heading title="Order Details" />
      </div>
      <div>Order ID: {order.id}</div>
      <div>
        Total Amount: <span>{formatPrice(order.amount / 100)}</span>
      </div>
      <div className="flex items-center gap-2">
        <div>Payment status:</div>
        <div className="max-w-max">
          {order.status === "pending" ? (
            <Status
              bg="bg-slate-200"
              text="pending"
              color="text-slate-700"
              icon={MdAccessTimeFilled}
            />
          ) : order.status === "complete" ? (
            <Status
              bg="bg-green-200"
              text="completed"
              color="text-green-700"
              icon={MdDone}
            />
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div>Delivery status:</div>
        <div className="max-w-max">
          {order.deliveryStatus === "pending" ? (
            <Status
              bg="bg-slate-200"
              text="pending"
              color="text-slate-700"
              icon={MdAccessTimeFilled}
            />
          ) : order.deliveryStatus === "dispatched" ? (
            <Status
              bg="bg-purple-200"
              text="dispatched"
              color="text-purple-700"
              icon={MdDeliveryDining}
            />
          ) : order.deliveryStatus === "delivered" ? (
            <Status
              bg="bg-green-200"
              text="delivered"
              color="text-green-700"
              icon={MdDone}
            />
          ) : (
            <></>
          )}
        </div>
      </div>

      <div>Created date: {moment(order.createdDate).fromNow()}</div>
      <div className="overflow-x-auto">
        <h2 className="mt-4 mb-2 font-semibold">Products ordered</h2>
        <div className="grid items-center grid-cols-5 gap-4 pb-2 text-xs">
          <div className="col-span-2 justify-self-start">PRODUCT</div>
          <div className=" justify-self-center">PRICE</div>
          <div className=" justify-self-center">QTY</div>
          <div className=" justify-self-end">TOTAL</div>
        </div>
        {order.products &&
          order.products.map((product) => (
            <OrderItem key={product.id} item={product} />
          ))}
      </div>
    </div>
  );
}
