"use client";

import { useAppContext } from "@/context";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const [shopDropDown, setShopDropDown] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  const handleNavToggle = () => {
    setNav(!nav);
  };
  const handleShopDropDownToggle = () => {
    setShopDropDown(!shopDropDown);
  };

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
    setShopDropDown(false);
  };

  const { itemsInCart } = useAppContext();
  const cartCount = itemsInCart.length ? itemsInCart.length : 0;

  return (
    <>
      <div className="fixed w-full shadow-md z-[100] py-3 md:py-4 bg-white">
        <div className="container flex justify-between items-center h-full">
          <div className="w-[20%] lg:w-[45%] hidden lg:flex gap-10 text-[16px] font-medium uppercase items-center">
            <Link
              href="/"
              className={
                activeLink === "home" ? "active menu-link" : "menu-link"
              }
              onClick={() => onUpdateActiveLink("home")}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={
                activeLink === "about" ? "active menu-link" : "menu-link"
              }
              onClick={() => onUpdateActiveLink("about")}
            >
              About US
            </Link>
            <div
              href="/shop"
              className={
                activeLink === "shop"
                  ? "active menu-link cursor-pointer flex gap-1"
                  : "menu-link cursor-pointer flex gap-1 "
              }
              onClick={handleShopDropDownToggle}
            >
              <span>Shop</span>
              <img src="/icons/arrow-down.svg" alt="" />
            </div>

            <div
              className={
                shopDropDown
                  ? "absolute z-[1000] top-20 left-[20vw] w-[200px] pt-7 pb-10 border-t-[7px] border-yayyuYellow bg-white flex flex-col gap-4 pl-5"
                  : "hidden"
              }
            >
              <Link
                href="/shop"
                className={
                  activeLink === "shop" ? "active menu-link" : "menu-link"
                }
                onClick={() => onUpdateActiveLink("shop")}
              >
                Collection
              </Link>
              <Link
                href="/category"
                className={
                  activeLink === "category" ? "active menu-link" : "menu-link"
                }
                onClick={() => onUpdateActiveLink("category")}
              >
                Category
              </Link>
            </div>

            <Link
              href="/contact"
              className={
                activeLink === "contact" ? "active menu-link" : "menu-link"
              }
              onClick={() => onUpdateActiveLink("contact")}
            >
              Contact
            </Link>
          </div>
          <div onClick={handleNavToggle} className="w-[20%] lg:hidden">
            {nav ? (
              <img
                onClick={handleNavToggle}
                src="/icons/cancel.svg"
                alt=""
                className="w-[45%] md:w-[30%] lg:w-0 lg:hidden"
              />
            ) : (
              <img
                onClick={handleNavToggle}
                src="/icons/menu.svg"
                alt=""
                className="w-[45%] md:w-[30%] lg:w-0 lg:hidden"
              />
            )}
          </div>

          <Link
            href="/"
            className="w-[20%] md:w-[10%] lg:w-[9%] flex justify-center gap-0"
          >
            <img src="/images/logo.png" alt="" />
          </Link>

          <div className="w-[20%] lg:w-[45%] flex items-center justify-end gap-4">
            <Link href="/" className="hidden lg:block flex-col gap-0">
              <img src="/icons/account.svg" alt="" />
            </Link>
            <a href="/" className="hidden lg:block flex-col gap-0">
              <img src="/icons/like.svg" alt="" />
            </a>
            <Link href="/" className="hidden lg:block flex-col gap-0">
              <img src="/icons/search.svg" alt="" />
            </Link>
            <a href="/cart" className="flex gap-0 relative">
              <img src="/icons/cart.svg" alt="" />
              <div className="bg-red-600 w-4 h-4 flex justify-center items-center rounded-full absolute -right-3 -top-2">
                <span className="text-[10px] text-white"> {cartCount}</span>
              </div>
            </a>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={
            nav
              ? "lg:hidden fixed z-[150] left-0 top-14 w-full h-screen bg-white/70 "
              : ""
          }
          style={{ zIndex: "11111" }}
        >
          <div
            className={
              nav
                ? "fixed left-[10%] top-14 ease-in duration-500 w-[80%] mx-auto md:w-[45%] h-screen bg-white py-10 px-2"
                : "fixed left-[-130%] top-0 ease-in duration-500 py-10 px-2"
            }
          >
            <div>
              <div className="flex w-full justify-between items-center border-gray-500 border-[1px] p-3 rounded-md">
                <input type="text" className="w-[80%]" placeholder="Search" />
                <img src="/icons/search.svg" alt="" />
              </div>
            </div>
            <div className="py-8 flex flex-col">
              <div className="uppercase font-semibold flex flex-col gap-7 items-center mt-8">
                <Link
                  onClick={() => setNav(false)}
                  href="/"
                  className={
                    activeLink === "home" ? "menu-link active" : "menu-link "
                  }
                >
                  Home
                </Link>
                <Link
                  onClick={() => setNav(false)}
                  href="/shop"
                  className={
                    activeLink === "shop" ? "menu-link active" : "menu-link "
                  }
                >
                  Shop
                </Link>
                <Link
                  onClick={() => setNav(false)}
                  href="/about"
                  className={
                    activeLink === "about" ? "menu-link active" : "menu-link "
                  }
                >
                  About Us
                </Link>
                <Link
                  onClick={() => setNav(false)}
                  href="/contact"
                  className={
                    activeLink === "contact" ? "menu-link active" : "menu-link "
                  }
                >
                  Contact Us
                </Link>
                <Link
                  onClick={() => setNav(false)}
                  href="/wishlist"
                  className={
                    activeLink === "wishlist" ? "menu-link active" : "menu-link"
                  }
                >
                  My Wishlist
                </Link>
              </div>
              <div className="pt-36">
                <div className="flex items-center justify-center gap-5 my-4 w-full text-gray-200">
                  <Link
                    href="https://facebook.com/"
                    className="w-[40px] cursor-pointer hover:scale-105 ease-in duration-300"
                  >
                    <img src="/icons/facebook.svg" className="w-full" />
                  </Link>
                  <Link
                    href="https://instagram.com/"
                    className="w-[40px] cursor-pointer hover:scale-105 ease-in duration-300"
                  >
                    <img src="/icons/instagram.svg" className="w-full" />
                  </Link>
                  <Link
                    href="https://tiktok.com/"
                    className="w-[40px] cursor-pointer hover:scale-105 ease-in duration-300"
                  >
                    <img src="/icons/tiktok.svg" className="w-full" />
                  </Link>
                  <Link
                    href="https://x.com/"
                    className="w-[40px] cursor-pointer hover:scale-105 ease-in duration-300"
                  >
                    <img src="/icons/x.svg" className="w-full" />
                  </Link>
                  <Link
                    href="https://linkedin.com/"
                    className="w-[40px] cursor-pointer hover:scale-105 ease-in duration-300"
                  >
                    <img src="/icons/linkedin.svg" className="w-full" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
