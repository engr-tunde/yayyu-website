"use client";

import PageHeader from "@/components/globals/PageHeader";
import { useAppContext } from "@/context";
import { itemsData, reviewsData } from "@/lib/data";
import {
  errorNotification,
  formatter,
  shuffleArray,
  successNotification,
} from "@/lib/helpers";
import ExpiredStorage from "expired-storage";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

// export const metadata = {
//   title: "Our Shop",
// };

const SingleItemPage = ({ params, searchParams }) => {
  const expiredStorage = new ExpiredStorage();
  const [selectedColor, setSelectedColor] = useState();
  const [currentTap, setCurrentTap] = useState("description");
  const [sizeAndPrice, setSizeAndPrice] = useState({});
  const { itemsInCart, setItemsInCart } = useAppContext();
  const [showCart, setShowCart] = useState(false);
  const [thisProductInCart, setThisProductInCart] = useState([]);
  const [cartUpdated, setCartUpdated] = useState(false);
  const forceUpdate = useCallback(() => setCartUpdated({}), []);

  // const data = JSON.parse(searchParams.data);
  const item_slug = params.item_slug;
  const data = itemsData.filter((item) => item.item_slug === item_slug)[0];
  console.log("data", data);
  let rating = 0;

  // For related products
  const r_product = itemsData.filter((item) => item.category === data.category);
  const related_products = shuffleArray(r_product);

  // Review and ratings
  const product_reviews = reviewsData.filter((item) => item.owner === data._id);
  product_reviews.forEach((element) => {
    rating += element.rating;
  });
  rating = Math.round(rating / product_reviews.length);
  const noRating = Number(5 - rating);

  const handleSelectSize = (item) => {
    setSizeAndPrice(item);
  };

  const handleSelectColor = (color) => {
    setSelectedColor(color);
  };

  const handleAddToCart = (item) => {
    if (data.sizes && Object.keys(sizeAndPrice).length === 0) {
      errorNotification("Please select your preferred size first");
    } else if (data.colors && !selectedColor) {
      errorNotification("Please select your preferred color first");
    } else {
      let currentCart = expiredStorage.getItem("cart");
      currentCart = JSON.parse(currentCart);
      let itemToCart = {
        item_id: item._id,
        item_name: item.item_name,
        img: item.img,
        original_price: data.original_price,
        new_price: data.sizes ? sizeAndPrice.new_price : data.new_price,
        size: data.sizes ? sizeAndPrice.size : "",
        color: data.colors ? selectedColor : "",
      };
      currentCart.push(itemToCart);
      let updatedItems = JSON.stringify(currentCart);
      expiredStorage.setItem("cart", updatedItems, 36000);
      setItemsInCart(currentCart);
      forceUpdate();
      setShowCart(false);
      successNotification(
        data.sizes
          ? `1 ${item.item_name} - size ${sizeAndPrice.size} added to cart`
          : `1 ${item.item_name} added to cart`
      );
    }
  };

  const handleRemoveFromCart = (item) => {
    let currentCart = expiredStorage.getItem("cart");
    currentCart = JSON.parse(currentCart);

    const otherItemsInCart = currentCart.filter(
      (it) => it.item_id !== data._id
    );

    let thisItemsInCart = thisProductInCart.filter(
      (it) => it.item_id == data._id
    );

    if (thisItemsInCart.length < 1) {
      errorNotification("This item doesn't exist in cart");
    } else {
      thisItemsInCart.pop();
      Array.prototype.push.apply(otherItemsInCart, thisItemsInCart);

      let updatedItems = JSON.stringify(otherItemsInCart);
      expiredStorage.setItem("cart", updatedItems, 36000);
      setItemsInCart(otherItemsInCart);
      forceUpdate();
      successNotification(`1 ${data.item_name} removed from cart`);
    }
  };

  const handleAddMoreToCartSized = (item) => {
    if (data.colors && !selectedColor) {
      errorNotification("Please select your preferred color first");
    } else {
      let currentCart = expiredStorage.getItem("cart");
      currentCart = JSON.parse(currentCart);
      let itemToCart = {
        item_id: data._id,
        item_name: data.item_name,
        img: data.img,
        original_price: item.original_price,
        new_price: item.new_price,
        size: item.size,
        color: data.colors ? selectedColor : "",
      };
      currentCart.push(itemToCart);
      let updatedItems = JSON.stringify(currentCart);
      expiredStorage.setItem("cart", updatedItems, 36000);
      setItemsInCart(currentCart);
      forceUpdate();
      successNotification(`1 ${data.item_name} ${item.size} added to cart`);
    }
  };

  const handleRemoveFromCartSized = (item) => {
    let currentCart = expiredStorage.getItem("cart");
    currentCart = JSON.parse(currentCart);

    const otherItemsInCart = currentCart.filter(
      (it) => it.item_id !== data._id
    );

    let otherSizesOfThisItemsInCart = thisProductInCart.filter(
      (it) => it.size != item.size
    );

    let thisSizesOfThisItemsInCart = thisProductInCart.filter(
      (it) => it.size == item.size
    );

    if (thisSizesOfThisItemsInCart.length < 1) {
      errorNotification("This item doesn't exist in cart");
    } else {
      thisSizesOfThisItemsInCart.pop();

      Array.prototype.push.apply(otherItemsInCart, otherSizesOfThisItemsInCart);
      Array.prototype.push.apply(otherItemsInCart, thisSizesOfThisItemsInCart);

      console.log("all items in cart", otherItemsInCart);

      let updatedItems = JSON.stringify(otherItemsInCart);
      expiredStorage.setItem("cart", updatedItems, 36000);
      setItemsInCart(otherItemsInCart);
      forceUpdate();
      successNotification(`1 ${data.item_name} ${item.size} removed from cart`);
    }
  };

  console.log("itemsInCart", itemsInCart);
  console.log("thisProductInCart", thisProductInCart);

  const fecthThisItemsInTheCart = () => {
    const prod = itemsInCart;
    const prod2 = prod?.filter((item) => item.item_id == data._id);
    setThisProductInCart(prod2);
  };
  useEffect(() => {
    fecthThisItemsInTheCart();
  }, [itemsInCart, cartUpdated, setItemsInCart, fecthThisItemsInTheCart]);

  return (
    <div className="top-[100px] relative">
      <PageHeader title={`Home / ${data.item_name}`} />
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-28 gap-y-14">
          <div className="col-span-1">
            <div className="w-full mb-5 border-[1.7px] border-[#F2F2F2] flex justify-center">
              <img src={data.img} alt="" className="h-full" />
            </div>
            <div className="flex gap-5 lg:gap-10 justify-evenly">
              {data.images &&
                data.images.map((img, i) => (
                  <div
                    key={i}
                    className="w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] border-[1.5px] border-[#F2F2F2]"
                  >
                    <img src={img} alt="" className="h-full w-full" />
                  </div>
                ))}
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-3">
            <h2 className="uppercase text-2xl">{data.item_name}</h2>
            <div className="flex gap-5 mb-1">
              <div className="flex items-center gap-1">
                {Array.from({ length: rating }, (_, index) => (
                  <img key={index} src="/icons/star-full.svg" alt="" />
                ))}
                {Array.from({ length: noRating }, (_, index) => (
                  <img key={index} src="/icons/star-half.svg" alt="" />
                ))}
              </div>
              <span>{product_reviews.length} Reviews</span>
            </div>
            {data.original_price != data.new_price ? (
              <div className="flex items-end gap-4">
                <h1 className="text-xl md:text-2xl font-semibold text-[#9a9a9a] line-through">
                  {formatter(data.original_price)}
                </h1>
                <h1 className="text-2xl md:text-3xl font-semibold">
                  {formatter(data.new_price)}
                </h1>
              </div>
            ) : (
              <h1 className="text-2xl md:text-3xl font-semibold">
                {formatter(data.original_price)}
              </h1>
            )}
            <span className="text-sm leading-6 md:leading-6">
              {data.description}
            </span>
            {data.sizes && (
              <div className="flex flex-col gap-1">
                <div className="h-[1.5px] w-full bg-[#F7F7F7] my-1"></div>
                <span className="uppercase text-[18px]">Sizes</span>
                <div className="flex gap-5 items-end">
                  {data.sizes &&
                    data.sizes.map((item, i) => (
                      <div
                        onClick={() => handleSelectSize(item)}
                        key={i}
                        className={
                          sizeAndPrice.size === item.size
                            ? "text-sm h-10 w-14 flex justify-center items-center bg-[#000] text-white border-[1px] border-[#f0f0f0] cursor-pointer ease-in duration-500"
                            : "text-sm h-8 w-12 flex justify-center items-center bg-[#F7F7F7] border-[1px] border-[#f0f0f0] text-black cursor-pointer"
                        }
                      >
                        {item.size}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {data.colors && (
              <div className="flex flex-col gap-1">
                <div className="h-[1.5px] w-full bg-[#F7F7F7] my-1"></div>
                <span className="uppercase text-[18px]">Colours</span>
                <div className="flex items-end gap-4">
                  {data.colors &&
                    data.colors.map((it, i) => (
                      <div
                        key={i}
                        onClick={() => handleSelectColor(it)}
                        className={
                          it === "red"
                            ? `rounded-full bg-red-500 cursor-pointer ${
                                selectedColor === "red"
                                  ? "h-12 w-12 border-[7px] border-black ease-in duration-500"
                                  : "h-8 w-8"
                              }`
                            : it === `blue`
                            ? `rounded-full bg-blue-500 cursor-pointer ${
                                selectedColor === "blue"
                                  ? "h-12 w-12 border-[7px] border-black ease-in duration-500"
                                  : "h-8 w-8"
                              }`
                            : it === `green`
                            ? `rounded-full bg-green-500 cursor-pointer ${
                                selectedColor === "green"
                                  ? "h-12 w-12 border-[7px] border-black ease-in duration-500"
                                  : "h-8 w-8"
                              }`
                            : it === `yellow`
                            ? `rounded-full bg-yellow-500 cursor-pointer ${
                                selectedColor === "yellow"
                                  ? "h-12 w-12 border-[7px] border-black ease-in duration-500"
                                  : "h-8 w-8"
                              }`
                            : it === `purple`
                            ? `rounded-full bg-purple-500 cursor-pointer ${
                                selectedColor === "purple"
                                  ? "h-12 w-12 border-[7px] border-black ease-in duration-500"
                                  : "h-8 w-8"
                              }`
                            : it === `black`
                            ? `rounded-full bg-black border-[1px] border-red-500 cursor-pointer ${
                                selectedColor === "black"
                                  ? "h-12 w-12 border-[7px] border-red-500 ease-in duration-500"
                                  : "h-8 w-8"
                              }`
                            : it === `white`
                            ? ` rounded-full bg-white border-[1px] border-black cursor-pointer ${
                                selectedColor === "white"
                                  ? "h-10 w-10 border-[7px] border-black ease-in duration-500"
                                  : "h-8 w-8"
                              }`
                            : ``
                        }
                      ></div>
                    ))}
                </div>
              </div>
            )}

            {
              <div
                className={
                  showCart
                    ? "w-full h-full absolute top-0 right-0 z-50 bg-black/60"
                    : ""
                }
              >
                <div
                  className={
                    showCart
                      ? "w-[90%] lg:w-[40%] left-[5%] lg:left-[30%] top-[17%] lg:top-[20%] mx-auto py-5 px-5 lg:px-5 flex flex-col gap-4 bg-white fixed"
                      : "hidden"
                  }
                >
                  <div className="w-full flex justify-between items-center mb-4">
                    <h1 className="text-xl font-semibold">
                      Add more items to the cart
                    </h1>
                    <div
                      onClick={() => setShowCart(false)}
                      className="flex justify-center items-center h-8 w-8 rounded-full border-2 border-black text-xl font-semibold cursor-pointer"
                    >
                      x
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 lg:px-5">
                    {data.sizes &&
                      data.sizes.map((item, i) => {
                        const prod = thisProductInCart;
                        const itemCount = prod?.filter(
                          (it) => it.size == item.size
                        );
                        return (
                          <div
                            key={i}
                            className="flex w-full justify-between text-[#222]"
                          >
                            <div className="flex flex-col gap-1 text-sm">
                              <span className="text-[15px]">{item.size}</span>
                              <span>{formatter(item.new_price)}</span>
                            </div>
                            <div className="py-[5px] w-[33%] lg:w-[23%] flex gap-2 items-center justify-between text-xl">
                              <div
                                className="plus-btn"
                                onClick={() => handleRemoveFromCartSized(item)}
                              >
                                -
                              </div>
                              <span>{itemCount.length}</span>
                              <div
                                className="plus-btn"
                                onClick={() => handleAddMoreToCartSized(item)}
                              >
                                +
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  <div className="h-[1.5px] w-full bg-[#F7F7F7] mt-3"></div>

                  <div className="flex flex-col lg:flex-row w-full justify-between lg:px-5 gap-5 lg:gap-0">
                    <Link
                      href="/shop"
                      className="transparent-btn py-3 uppercase text-sm w-full lg:w-[45%]"
                    >
                      Continue Shopping
                    </Link>
                    <a
                      href="/cart"
                      className="dark-btn py-3 uppercase text-sm w-full lg:w-[45%]"
                    >
                      View cart & Checkout
                    </a>
                  </div>
                </div>
              </div>
            }

            <div className="h-[1.5px] w-full bg-[#F7F7F7] my-1"></div>

            <div className="flex gap-3 mb-[10px]">
              <div className="flex gap-2 items-center justify-center text-xl">
                <div
                  className="plus-btn"
                  onClick={
                    data.sizes
                      ? () => setShowCart(true)
                      : () => handleRemoveFromCart(data)
                  }
                >
                  -
                </div>
                <span>{thisProductInCart.length}</span>
                <div
                  className="plus-btn"
                  onClick={
                    data.sizes
                      ? () => setShowCart(true)
                      : () => handleAddToCart(data)
                  }
                >
                  +
                </div>
              </div>

              <div
                onClick={() => handleAddToCart(data)}
                className="py-3 dark-btn w-full flex items-center justify-center gap-2 cursor-pointer uppercase"
              >
                <span>Add to Bag</span>
                <img src="/icons/bag-white.svg" alt="" />
              </div>

              <div className="py-3 px-5 bg-[#F7F7F7] border-[1px] border-[#f0f0f0] hover:bg-yayyuYellow text-xl flex gap-2 cursor-pointer">
                <img src="/icons/like.svg" alt="" />
              </div>
            </div>

            <a
              href="/cart"
              className="py-4 transparent-btn w-full flex items-center justify-center gap-2 cursor-pointer uppercase"
            >
              <span>Buy Now</span>
              <img src="/icons/wallet.svg" alt="" />
            </a>

            <div className="flex justify-between lg:justify-start lg:gap-3 mt-12 lg:mt-4">
              <div
                onClick={() => setCurrentTap("description")}
                className={
                  currentTap === "description"
                    ? "w-[30%] lg:w-[23%] text-[18px] pb-[5px] font-medium border-b-2 border-[#000000] text-black cursor-pointer"
                    : "w-[30%] lg:w-[23%] text-[18px] pb-[5px] font-medium  border-b-2 border-[#F7F7F7] text-[#A8A7A7] cursor-pointer"
                }
              >
                Description
              </div>
              <div
                onClick={() => setCurrentTap("details")}
                className={
                  currentTap === "details"
                    ? "w-[30%] lg:w-[23%] text-[18px] pb-[5px] font-medium border-b-2 border-[#000000] text-black cursor-pointer text-center"
                    : "w-[30%] lg:w-[23%] text-[18px] pb-[5px] font-medium  border-b-2 border-[#F7F7F7] text-[#A8A7A7] cursor-pointer text-center"
                }
              >
                Details
              </div>
              <div
                onClick={() => setCurrentTap("review")}
                className={
                  currentTap === "review"
                    ? "w-[30%] lg:w-[23%] text-[18px] pb-[5px] font-medium border-b-2 border-[#000000] text-black cursor-pointer text-center"
                    : "w-[30%] lg:w-[23%] text-[18px] pb-[5px] font-medium  border-b-2 border-[#F7F7F7] text-[#A8A7A7] cursor-pointer text-center"
                }
              >
                Review
              </div>
            </div>

            {currentTap === "description" && (
              <div className="w-full text-sm pt-2">{data.description}</div>
            )}
            {currentTap === "details" && (
              <div className="w-full text-sm pt-2">
                <p className="uppercase font-medium mb-2">
                  Product specification
                </p>
                <p>{data.description}</p>
              </div>
            )}
            {currentTap === "review" && (
              <div className="w-full text-sm pt-2 flex flex-col gap-2">
                {product_reviews.slice(0, 4).map((item, i) => (
                  <div
                    className="flex justify-between bg-[#F7F7F7] p-3 items-end border-b-2 border-yayyuYellow rounded-lg"
                    key={i}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">{item.review}</span>
                      <span className="text-sm text-[#aaa]">
                        {item.reviewer}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: item.rating }, (_, index) => (
                        <img
                          key={index}
                          src="/icons/star-full.svg"
                          alt=""
                          className="w-4"
                        />
                      ))}
                      {Array.from(
                        { length: Number(5 - item.rating) },
                        (_, index) => (
                          <img
                            key={index}
                            src="/icons/star-half.svg"
                            alt=""
                            className="w-4"
                          />
                        )
                      )}
                    </div>
                  </div>
                ))}

                <Link
                  href=""
                  className="mt-3 flex items-center gap-1 text-yayyuYellow uppercase font-semibold border-b-black hover:border-b-2 max-w-max hover:scale-110 ease-in duration-300"
                >
                  <span>See All reviews</span>
                  <img src="/icons/arrow-right.svg" alt="" />
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 lg:mt-20 mb-10 lg:mb-20">
          <h1 className="text-xl lg:text-2xl uppercase mb-10 lg:mb-10 text-center">
            You may also like
          </h1>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8">
            {related_products.slice(0, 4).map((item, i) => (
              <Link
                key={i}
                href={`/${item.item_slug}`}
                className="col-span-1 flex flex-col gap-1 items-center"
              >
                <img src={item.img} alt="" className="shop-item-img" />
                <p className="uppercase -mb-1">{item.item_name}</p>

                {item.original_price != item.new_price ? (
                  <>
                    <span className="font-semibold text-lg mb-[-6px] text-[#9a9a9a] line-through">
                      {formatter(item.original_price)}
                    </span>
                    <span className="font-semibold text-xl ">
                      {formatter(item.new_price)}
                    </span>
                  </>
                ) : (
                  <span className="font-semibold text-xl">
                    {formatter(item.original_price)}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleItemPage;
