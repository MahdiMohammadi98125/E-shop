import Container from "@/app/Container";
import Link from "next/link";
import React from "react";
import { Redressed } from "next/font/google";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-30 w-full shadow-sm bg-slate-200 ">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link
              href="/"
              className={`text-2xl font-bold ${redressed.className}`}
            >
              E-Shop
            </Link>
            <div className="hidden md:block">search</div>
            <div className="flex items-center gap-8 md:gap-12">
              <div>cardCount</div>
              <div>userMenu</div>
            </div>
          </div>
        </Container>
      </div>
    </nav>
  );
}
