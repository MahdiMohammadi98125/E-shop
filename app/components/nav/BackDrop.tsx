import React from "react";

interface BackDropProps {
  onClick: () => void;
}

export default function BackDrop({ onClick }: BackDropProps) {
  return (
    <div
      onClick={onClick}
      className="fixed top-0 left-0 z-20 w-screen h-screen transition duration-200 opacity-50 bg-slate-200"
    ></div>
  );
}
