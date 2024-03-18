import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  label,
  disabled,
  outline,
  small,
  custom,
  icon: Icon,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`disabled:cursor-not-allowed disabled:opacity-70 rounded-md hover:opacity-80 transition w-full border-slate-700 flex items-center justify-center gap-2 ${
        outline ? "bg-white" : "bg-slate-700"
      }
      ${outline ? "text-slate-700" : "text-white"}
      ${small ? "text-sm font-light" : "text-base font-semibold"}
      ${small ? "py-1 px-2 border" : "py-3 px-4 border-2"}
      ${custom ? custom : ""}
      `}
    >
      {Icon && <Icon size={20} />}
      {label}
    </button>
  );
}
