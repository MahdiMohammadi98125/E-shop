import React from "react";
import { IconType } from "react-icons";

interface AdminNavItemProps {
  selected?: boolean;
  icon: IconType;
  label: string;
}

export default function AdminNavItem({
  selected,
  icon: Icon,
  label,
}: AdminNavItemProps) {
  return (
    <div
      className={`flex items-center justify-center gap-1 p-2 transition border-b-2 cursor-pointer hover:text-slate-800 ${
        selected
          ? "border-b-slate-800 text-slate-800"
          : "border-b-transparent text-slate-500"
      } `}
    >
      <Icon size={20} />
      <div className="text-sm font-medium text-center break-normal">
        {label}
      </div>
    </div>
  );
}
