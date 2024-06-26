"use client";
import { SafeUser } from "@/types";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import Avatar from "../Avatar";
import BackDrop from "./BackDrop";
import MenuItem from "./MenuItem";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

export default function UserMenu({ currentUser }: UserMenuProps) {
  const [isOpen, setIsOPen] = useState(false);
  const router = useRouter();
  const toggleMenu = useCallback(() => {
    setIsOPen((prev) => !prev);
  }, []);
  return (
    <div className="relative">
      <div
        className="flex items-center gap-1 p-2 transition border rounded-full cursor-pointer border-slate-400 hover:shadow-md text-slate-700"
        onClick={toggleMenu}
      >
        <Avatar src={currentUser?.image} />
        <AiFillCaretDown />
      </div>
      {isOpen && (
        <div className="absolute right-0 z-30 flex flex-col bg-white rounded-md shadow-md cursor-pointer top-12 w-[170px] overflow-hidden">
          {currentUser?.email && currentUser.role === "USER" ? (
            <div>
              <span
                onClick={() => {
                  router.push("/orders");
                }}
              >
                <MenuItem onClick={toggleMenu}>Your orders</MenuItem>
              </span>

              <hr />
              <MenuItem onClick={signOut}>Logout</MenuItem>
            </div>
          ) : currentUser?.role === "ADMIN" ? (
            <div>
              <span
                onClick={() => {
                  router.push("/admin");
                }}
              >
                <MenuItem onClick={toggleMenu}>Admin dashboard</MenuItem>
              </span>
              <span
                onClick={() => {
                  router.push("/orders");
                }}
              >
                <MenuItem onClick={toggleMenu}>Your orders</MenuItem>
              </span>

              <hr />
              <MenuItem onClick={signOut}>Logout</MenuItem>
            </div>
          ) : (
            <div>
              <Link href="/login">
                <MenuItem onClick={toggleMenu}>Login</MenuItem>
              </Link>
              <Link href="/register">
                <MenuItem onClick={toggleMenu}>Register</MenuItem>
              </Link>
            </div>
          )}
        </div>
      )}
      {isOpen && <BackDrop onClick={toggleMenu} />}
    </div>
  );
}
