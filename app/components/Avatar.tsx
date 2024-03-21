import Image from "next/image";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

interface AvatarProps {
  src?: string | null;
}

export default function Avatar({ src }: AvatarProps) {
  return src ? (
    <Image
      src={src}
      alt="image"
      className="rounded-full"
      width={30}
      height={30}
    />
  ) : (
    <FaUserCircle size={24} />
  );
}
