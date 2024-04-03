import React from "react";
import { IconType } from "react-icons";

interface StatusProps {
  text: string;
  icon: IconType;
  bg?: string;
  color: string;
}

export default function Status({ text, icon: Icon, bg, color }: StatusProps) {
  return (
    <div
      className={` ${color} ${bg} px-1  flex items-center justify-center gap-1 rounded`}
    >
      {text} <Icon size={15} />
    </div>
  );
}
