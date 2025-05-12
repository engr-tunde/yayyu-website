import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full pt-12 md:pt-16 pb-6 bg-[#EFEFEF] flex flex-col gap-5">
      <div className="container grid grid-cols-1 md:grid-cols-5 lg:grid-cols-10 gap-12 md:gap-y-12 lg:gap-0 mb-5">
        <div className="col-span-2">
          <img src="/images/logo.png" alt="" className="w-[25%] lg:w-[35%]" />
        </div>
        <div className="col-span-3 grid grid-cols-2 text-black ">
          <div className="col-span-1 flex flex-col gap-3 lg:gap-4">
            <p className="uppercase font-semibold">Quick Links</p>
            <Link href="/home" className="text-sm">
              Home
            </Link>
            <Link href="/categories" className="text-sm">
              Categories
            </Link>
            <Link href="/about" className="text-sm">
              About Us
            </Link>
            <Link href="/contact" className="text-sm">
              Contact
            </Link>
            <Link href="/faqs" className="text-sm">
              FAQs
            </Link>
          </div>
          <div className="col-span-1 flex flex-col gap-3 lg:gap-4">
            <p className="uppercase font-semibold">Legal</p>
            <Link href="/privacy-policy" className="text-sm">
              Privacy Policy
            </Link>
            <Link href="/shipping-policy" className="text-sm">
              Shipping Policy
            </Link>
            <Link href="/delivery-policy" className="text-sm">
              Delivery Policy
            </Link>
            <Link href="/return-policy" className="text-sm">
              Return Policy
            </Link>
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-3">
          <p className="uppercase font-semibold">Follow Us</p>
          <div className="flex gap-2">
            <Link
              href="https://facebook.com/"
              className="w-[30px] lg:w-[25px] cursor-pointer hover:scale-105 ease-in duration-300"
            >
              <img src="/icons/facebook.svg" className="w-full" />
            </Link>
            <Link
              href="https://instagram.com/"
              className="w-[30px] lg:w-[25px] cursor-pointer hover:scale-105 ease-in duration-300"
            >
              <img src="/icons/instagram.svg" className="w-full" />
            </Link>
            <Link
              href="https://tiktok.com/"
              className="w-[30px] lg:w-[25px] cursor-pointer hover:scale-105 ease-in duration-300"
            >
              <img src="/icons/tiktok.svg" className="w-full" />
            </Link>
            <Link
              href="https://x.com/"
              className="w-[30px] lg:w-[25px] cursor-pointer hover:scale-105 ease-in duration-300"
            >
              <img src="/icons/x.svg" className="w-full" />
            </Link>
            <Link
              href="https://linkedin.com/"
              className="w-[30px] lg:w-[25px] cursor-pointer hover:scale-105 ease-in duration-300"
            >
              <img src="/icons/linkedin.svg" className="w-full" />
            </Link>
          </div>
        </div>
        <div className="col-span-3 flex flex-col gap-3">
          <p className="uppercase font-semibold">Join Our Community</p>
          <form action="" className="flex flex-col gap-4 lg:gap-5">
            <input
              type="text"
              className="w-full p-3 md:py-4"
              placeholder="Email address"
            />
            <button className="w-full py-3 md:py-4 dark-btn">Subscribe</button>
            <p className="text-xs text-yayyuGrey">
              Join the Yayyu community for exclusive access, special offers, and
              early notifications about our new collections!
            </p>
          </form>
        </div>
      </div>
      <div className="border-[0.8px] lg:border-[0.6px] border-[#000000a5]"></div>
      <div className="text-center">
        Copyright &copy; 2025.{" "}
        <span className="font-semibold">{process.env.APP_NAME}</span>
      </div>
    </div>
  );
};

export default Footer;
