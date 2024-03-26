import React from "react";
import { IconType } from "react-icons";

interface ActionBtnsProps {
  icon: IconType;
  disabled?: boolean;
  onClick: () => void;
}

export default function ActionBtns({
  icon: Icon,
  disabled,
  onClick,
}: ActionBtnsProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex justify-center items-center w-[40px] h-[30px] rounded text-slate-700 border border-slate-400  ${
        disabled && "cursor-not-allowed opacity-50"
      }`}
    >
      <Icon size={18} />
    </button>
  );
}
