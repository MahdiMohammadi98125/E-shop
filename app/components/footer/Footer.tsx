import Container from "@/app/components/Container";
import React from "react";
import FooterList from "./FooterList";
import Link from "next/link";
import { MdFacebook } from "react-icons/md";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="mt-16 text-sm bg-slate-700 text-slate-200">
      <Container>
        <div className="flex flex-col justify-between pt-16 pb-8 md:px-4 md:flex-row">
          <FooterList>
            <h3 className="mb-2 text-base font-bold">Shop catagories</h3>
            <Link href="/">Phones</Link>
            <Link href="/">Laptops</Link>
            <Link href="/">Desktops</Link>
            <Link href="/">Watches</Link>
            <Link href="/">Tvs</Link>
            <Link href="/">Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="mb-2 text-base font-bold">Customer Service</h3>
            <Link href="/">Contact Us</Link>
            <Link href="/">Shipping Policy</Link>
            <Link href="/">Returns and Exchanges</Link>
            <Link href="/">Watches</Link>
            <Link href="/">FAQS</Link>
          </FooterList>
          <div className="w-full mb-6 md:w-1/3 md:mb-0">
            <h3 className="mb-2 text-base font-bold">Abous Us</h3>
            <p className="mb-2">
              At our electronic store, we are dedicated to providing the latest
              and gratest devices and accessories to our customers. with a wide
              selection of phones Tvs, Laptops, Watches and accessories
            </p>
            <p className="mb-2">
              &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-base font-bold">Follow Us</h3>
            <div className="flex items-center gap-2">
              <Link href="/">
                <MdFacebook size={24} />
              </Link>
              <Link href="/">
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href="/">
                <AiFillInstagram size={24} />
              </Link>
              <Link href="/">
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
