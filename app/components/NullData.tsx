import React from "react";

export default function NullData({ title }: { title: string }) {
  return (
    <div className="w-full flex justify-center items-center h-[50vh] ">
      <p className="text-xl font-medium md:text-2xl">{title}</p>
    </div>
  );
}
