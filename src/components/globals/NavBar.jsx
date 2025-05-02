"use client";

import { fetchProductCategories } from "@/api";
import { useAppContext } from "@/context";
import { formatter, successNotification, useOutsideClick } from "@/lib/helpers";
import ExpiredStorage from "expired-storage";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaArrowAltCircleRight, FaTrash } from "react-icons/fa";

const NavBar = () => {
  const expiredStorage = new ExpiredStorage();
  const [cartUpdated, setCartUpdated] = useState(false);
  const forceUpdate = useCallback(() => setCartUpdated({}), []);
  const path = window.location.pathname.split("/");
  const pathname = path[path.length - 1];
  const [activeLink, setActiveLink] = useState(pathname);
  const [nav, setNav] = useState(false);
  const [shopDropDown, setShopDropDown] = useState(false);
  const [showCartItems, setShowCartItems] = useState(false);
  // const [activeLink, setActiveLink] = useState("home");
  const [showCategories, setshowCategories] = useState(false);

  const { categories, categoriesLoading, categoriesError } =
    fetchProductCategories();

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

  const { itemsInCart, itemsInWishList, setItemsInCart } = useAppContext();
  const cartCount = itemsInCart.length ? itemsInCart.length : 0;
  const wishListCount = itemsInWishList.length ? itemsInWishList.length : 0;

  let groupedBy = Object.groupBy(
    itemsInCart,
    (item) => `${item.item_name}-${item.size}-${item.color}`
  );
  groupedBy = Object.values(groupedBy);

  const handleAddMoreToCartSized = (item) => {
    console.log("item", item);
    let currentCart = expiredStorage.getItem("cart");
    currentCart = JSON.parse(currentCart);
    let itemToCart = {
      item_id: item.item_id,
      item_name: item.item_name,
      img: item.img,
      original_price: item.original_price,
      new_price: item.new_price,
      size: item.size,
      color: item.color,
    };
    currentCart.push(itemToCart);
    let updatedItems = JSON.stringify(currentCart);
    expiredStorage.setItem("cart", updatedItems, 36000);
    setItemsInCart(currentCart);
    forceUpdate();
    successNotification(`1 ${item.item_name} ${item.size} added to cart`);
  };

  const handleRemoveFromCartSized = (item) => {
    let currentCart = expiredStorage.getItem("cart");
    currentCart = JSON.parse(currentCart);

    const otherItemsInCart = currentCart.filter(
      (it) => it.item_id !== item.item_id
    );

    const thisProductInCart = currentCart.filter(
      (it) => it.item_id == item.item_id
    );

    let otherSizesOfThisItemsInCart = thisProductInCart.filter(
      (it) => it.size != item.size || it.color != item.color
    );

    let thisSizesOfThisItemsInCart = thisProductInCart.filter(
      (it) => it.size == item.size && it.color == item.color
    );

    thisSizesOfThisItemsInCart.pop();
    Array.prototype.push.apply(otherItemsInCart, otherSizesOfThisItemsInCart);
    if (thisSizesOfThisItemsInCart.length) {
      Array.prototype.push.apply(otherItemsInCart, thisSizesOfThisItemsInCart);
    }
    console.log("all items in cart", otherItemsInCart);

    let updatedItems = JSON.stringify(otherItemsInCart);
    expiredStorage.setItem("cart", updatedItems, 36000);
    setItemsInCart(otherItemsInCart);
    forceUpdate();
    successNotification(`1 ${item.item_name} ${item.size} removed from cart`);
  };

  const handleRemoveItem = (item) => {
    let currentCart = expiredStorage.getItem("cart");
    currentCart = JSON.parse(currentCart);

    const otherItemsInCart = currentCart.filter(
      (it) => it.item_id !== item.item_id
    );

    const thisProductInCart = currentCart.filter(
      (it) => it.item_id == item.item_id
    );

    let otherSizesOfThisItemsInCart = thisProductInCart.filter(
      (it) => it.size != item.size || it.color != item.color
    );

    Array.prototype.push.apply(otherItemsInCart, otherSizesOfThisItemsInCart);
    console.log("other items in cart", otherItemsInCart);

    let updatedItems = JSON.stringify(otherItemsInCart);
    expiredStorage.setItem("cart", updatedItems, 36000);
    setItemsInCart(otherItemsInCart);
    forceUpdate();
    successNotification(`1 ${item.item_name} ${item.size} removed from cart`);
  };

  const ref = useRef();
  useOutsideClick(ref.current, () => {
    setshowCategories(false);
    setShopDropDown(false);
    // setNav(false);
  });

  return (
    <>
      <div className="fixed w-full shadow-md z-[100] py-3 md:py-4 bg-white">
        <div className="container flex justify-between items-center h-full">
          <div className="w-[20%] lg:w-[45%] hidden lg:flex gap-10 text-[16px] font-medium uppercase items-center">
            <Link
              href="/"
              className={activeLink === "" ? "active menu-link" : "menu-link"}
              onClick={() => onUpdateActiveLink("")}
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
                activeLink === "shop" ||
                activeLink === "cart" ||
                activeLink === "checkout"
                  ? "active menu-link cursor-pointer flex gap-1"
                  : "menu-link cursor-pointer flex gap-1 "
              }
              onMouseEnter={handleShopDropDownToggle}
            >
              <span>Shop</span>
              <img src="/icons/arrow-down.svg" alt="" />
            </div>

            <div
              className={
                shopDropDown
                  ? "absolute z-[1000] top-20 left-[20vw] w-[200px] pt-7 pb-10 border-t-[7px] border-yayyuYellow bg-white flex flex-col gap-4 pl-5 "
                  : "hidden"
              }
            >
              <Link
                href="/shop"
                className={
                  activeLink === "shop" ? "active menu-link " : "menu-link "
                }
                style={{ fontWeight: "400 !important" }}
                onClick={() => onUpdateActiveLink("shop")}
              >
                Collection
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setshowCategories(true)}
              >
                <div
                  href="/category"
                  className="menu-link cursor-pointer flex items-center gap-2"
                  onClick={() => onUpdateActiveLink("category")}
                >
                  <span className="" style={{ fontWeight: "400 !important" }}>
                    Category
                  </span>
                  <FaArrowAltCircleRight />
                </div>
                <div
                  className={
                    showCategories
                      ? "absolute left-[101%] w-max top-0 grid grid-cols-3 py-5 px-7 gap-x-7 gap-y-3 bg-white border-l-4 border-l-yayyuYellow"
                      : "hidden"
                  }
                  onMouseLeave={() => setshowCategories(false)}
                >
                  {categories?.map((cat, i) => (
                    <Link
                      href={`/shop?category=${cat.category.toLowerCase()}`}
                      className="col-span-1 capitalize"
                      onClick={() => onUpdateActiveLink("category")}
                    >
                      {cat.category}
                    </Link>
                  ))}
                </div>
              </div>
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
            <Link href="/login" className="flex flex-col gap-0 ">
              <img src="/icons/account.svg" alt="" />
            </Link>
            <a
              href="/wish-list"
              className="hidden lg:block flex-col gap-0 relative"
            >
              <img src="/icons/like.svg" alt="" />
              <div className="bg-red-600 w-4 h-4 flex justify-center items-center rounded-full absolute -right-3 -top-2">
                <span className="text-[10px] text-white"> {wishListCount}</span>
              </div>
            </a>
            <Link href="/" className="hidden lg:block flex-col gap-0">
              <img src="/icons/search.svg" alt="" />
            </Link>
            <div className="flex gap-0 relative">
              <div
                onClick={() => setShowCartItems(true)}
                className="flex gap-0 relative cursor-pointer"
              >
                <img src="/icons/cart.svg" alt="" />
                <div className="bg-red-600 w-4 h-4 flex justify-center items-center rounded-full absolute -right-3 -top-2">
                  <span className="text-[10px] text-white"> {cartCount}</span>
                </div>
              </div>

              <div
                className={
                  showCartItems
                    ? "absolute z-[1000] top-8 right-0 w-[280px] lg:w-[400px] pt-7 pb-10 border-t-[7px] border-yayyuYellow bg-white flex flex-col gap-5 px-5"
                    : "hidden"
                }
              >
                <div className="flex justify-between items-center">
                  <div className="">Items in cart ({cartCount})</div>
                  <div
                    className="text-2xl font-medium cursor-pointer"
                    onClick={() => setShowCartItems(false)}
                  >
                    x
                  </div>
                </div>
                <div className="w-full flex flex-col gap-5">
                  {groupedBy.map((item, i) => {
                    const sItem = item[0];
                    return (
                      <div className="w-full flex items-center gap-3" key={i}>
                        <img
                          src={`${process.env.API_IMAGES}/products/${sItem.img}`}
                          alt=""
                          className="h-[60px] lg:h-[100px] border-[1.5px] border-[#d7d7d7] px-[2px] rounded-md"
                        />
                        <div className="w-full flex justify-between items-center">
                          <div className="flex flex-col gap-3">
                            <div className="">
                              <div className="text-[#474747]xt-md">
                                {sItem.item_name}
                              </div>
                              <div className="font-semibold text-lg">
                                {formatter(sItem.new_price)}
                              </div>
                            </div>
                            <div className="py-[5px] w-[33%] lg:w-[18%] flex gap-2 items-center justify-between text-xl">
                              <div
                                className="plus-btn"
                                onClick={() => handleRemoveFromCartSized(sItem)}
                              >
                                -
                              </div>
                              <span>{item.length}</span>
                              <div
                                className="plus-btn"
                                onClick={() => handleAddMoreToCartSized(sItem)}
                              >
                                +
                              </div>
                            </div>
                          </div>
                          <div
                            onClick={() => handleRemoveItem(sItem)}
                            className="text-red-500 py-[2px] px-3 rounded-md cursor-pointer text-xl hover:text-red-700 duration-300 ease-in"
                          >
                            <FaTrash />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Link
                  href="/cart"
                  className="dark-btn w-full py-3"
                  onClick={() => setShowCartItems(false)}
                >
                  Go to Cart
                </Link>
              </div>
            </div>
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
