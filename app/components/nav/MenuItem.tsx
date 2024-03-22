import React from "react";

interface MenuItemProps {
  children: React.ReactNode;
  onClick: () => void;
}

export default function MenuItem({ children, onClick }: MenuItemProps) {
  return (
    <div
      onClick={onClick}
      className="py-3 transition ps-3 hover:bg-neutral-100"
    >
      {children}
    </div>
  );
}
