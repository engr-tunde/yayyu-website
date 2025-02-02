"use client";

import { fetchProductCategories, fetchProducts } from "@/api";
import ErrorWidget from "@/components/globals/ErrorWidget";
import Loader from "@/components/globals/Loader";
import PageHeader from "@/components/globals/PageHeader";
import CatPageTitle from "@/components/shop/CatPageTitle";
import { formatter, sortArrayByObj } from "@/lib/helpers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdRefresh } from "react-icons/md";

// export const metadata = {
//   title: "Our Shop",
// };

const colors = [
  "red",
  "blue",
  "orange",
  "green",
  "yellow",
  "black",
  "white",
  "purple",
];

const sorts = [
  {
    title: "Newest",
    key: "newest",
  },
  {
    title: "Oldest",
    key: "oldest",
  },
  {
    title: "A-Z",
    key: "alphabetical",
  },
  {
    title: "Price (Low - High)",
    key: "lowest",
  },
  {
    title: "Price (High - Low)",
    key: "highest",
  },
];

const sizes = ["S", "M", "L", "XL", "XXL", "3XL"];

const ShopPage = () => {
  const { products, productsLoading, productsError } = fetchProducts();
  const { categories, categoriesLoading, categoriesError } =
    fetchProductCategories();
  const [filtered, setfiltered] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [data, setData] = useState(null);
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(0);

  const handleShowFIlter = () => {
    setShowFilter(!showFilter);
    setColor("");
    setCategory("");
    setSize("");
    setPrice(0);
  };

  const handleSort = (key) => {
    let items;
    if (key === "newest") {
      items = data.sort(sortArrayByObj("-_id"));
    } else if (key === "oldest") {
      items = data.sort(sortArrayByObj("_id"));
    } else if (key === "alphabetical") {
      items = data.sort(sortArrayByObj("item_name"));
    } else if (key === "lowest") {
      items = data.sort(sortArrayByObj("new_price"));
    } else if (key === "highest") {
      items = data.sort(sortArrayByObj("-new_price"));
    }
    setData(items);
    setShowSort(!showSort);
  };

  const handleFilterItems = () => {
    let items = products;
    if (color.length) {
      items = items.filter((item) => item.colors.includes(color.toLowerCase()));
    }
    if (size.length) {
      items = items.filter((item) => item.size.includes(color));
    }
    if (category.length) {
      items = items.filter((item) => item.category === category);
    }
    if (price > 0) {
      items = items.filter((item) => Number(item.new_price) <= price);
    }
    setData(items);
    setShowFilter(!showFilter);
    setfiltered(!filtered);
    console.log({ items });
  };

  const handleShowAllItems = () => {
    setData(products);
    setColor("");
    setCategory("");
    setSize("");
    setPrice(0);
    setfiltered(!filtered);
  };

  console.log({ color });
  console.log({ data });
  console.log({ category });

  useEffect(() => {
    if (products) {
      setData(products);
    }
  }, [products]);

  return (
    <div className="h-full top-[100px]">
      <PageHeader title="Shop" />
      <div className="container py-20">
        <CatPageTitle title="Shop" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 lg:gap-6">
            <div
              onClick={handleShowFIlter}
              className="flex items-center gap-1 lg:gap-2 my-10 cursor-pointer"
            >
              <img src="/icons/filter.svg" alt="" />
              <span className="uppercase">Show Filter</span>
            </div>
            {filtered && (
              <div
                onClick={handleShowAllItems}
                className="py-1 px-6 lg:px-10 uppercase flex items-center gap-2 cursor-pointer"
              >
                <MdRefresh className="text-lg" />
                <span>Refresh </span>
              </div>
            )}
          </div>

          <div className="relative">
            <div
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-1 lg:gap-2 mt-10 cursor-pointer"
            >
              <span className="uppercase">Sort By</span>
              <img src="/icons/arrow-down.svg" alt="" />
            </div>
            <div
              className={
                showSort
                  ? "absolute z-[1000] top-[80px] right-0 w-[190px] pt-5 pb-5 border-t-[7px] border-yayyuYellow bg-white flex flex-col gap-4 pl-4"
                  : "hidden"
              }
              style={{ boxShadow: showSort ? "2px 2px 1px #ccc" : "" }}
            >
              {sorts.map((item, i) => (
                <div
                  key={i}
                  onClick={() => handleSort(item.key)}
                  className="menu-link cursor-pointer"
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        </div>

        {data && data.length ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-16 mt-10">
            {data?.map((item, i) => (
              <Link
                // onClick={() => handleViewItem(item)}
                //   pathname: `/${item.item_slug}`,
                //   query: { data: JSON.stringify(item) },
                // }}
                href={`/${item.item_slug}`}
                key={i}
                className="col-span-1 flex flex-col gap-1 items-center"
              >
                <img
                  src={`${process.env.API_IMAGES}/products/${item.img}`}
                  alt=""
                  className="shop-item-img"
                />
                <p>{item.item_name}</p>
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
        ) : (
          <div className="h-[50vh] w-full flex flex-col justify-center items-center gap-7">
            {/* <img src="/icons/no-order.svg" alt="" /> */}
            <p className="text-md">No result found.</p>
            <div
              onClick={handleShowAllItems}
              className="dark-btn py-3 px-10 uppercase"
            >
              Show All
            </div>
          </div>
        )}
        {productsLoading && <Loader />}
        {productsError && <ErrorWidget error={productsError} />}

        <div className="flex items-center justify-end mt-16 gap-2 lg:gap-4 mb-5">
          <div className="flex gap-1 lg:gap-2 items-center">
            <img src="/icons/arrow-left.svg" alt="" className="text-[#0ff]" />
            <span className="text-sm text-[#BABABA]">Previous</span>
          </div>
          <p className="h-7 w-7 rounded-md flex justify-center items-center bg-[#2C2C2C] text-white">
            1
          </p>
          <p className="h-7 w-7 rounded-md flex justify-center items-center">
            2
          </p>
          <p className="h-7 w-7 rounded-md flex justify-center items-center">
            3
          </p>
          <p className="h-7 w-7 rounded-md flex justify-center items-center">
            ...
          </p>
          <p className="h-7 w-7 rounded-md flex justify-center items-center">
            13
          </p>
          <p className="h-7 w-7 rounded-md flex justify-center items-center">
            14
          </p>
          <div className="flex gap-1 lg:gap-2 items-center">
            <span className="text-sm ">Next</span>
            <img src="/icons/arrow-right2.svg" alt="" className="" />
          </div>
        </div>
      </div>

      <div
        className={
          showFilter
            ? "fixed z-[150] left-0 top-14 w-full h-screen bg-black/70 "
            : "hidden"
        }
        style={{ zIndex: "11111" }}
      >
        <div
          className={
            showFilter
              ? "fixed left-0 top-14 ease-in duration-500 w-[80%] mx-auto md:w-[35%] h-screen bg-white "
              : "hidden"
          }
        >
          <div className="flex flex-col py-5 lg:py-7 px-4 lg:px-10 gap-5 lg:gap-9">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-xl lg:text-2xl">
                Filter Items
              </div>
              <div
                className="h-8 w-8 flex justify-center items-center font-semibold text-3xl cursor-pointer"
                onClick={handleShowFIlter}
              >
                x
              </div>
            </div>

            <div className="">
              <div className="text-lg lg:text-[20px] uppercase mb-2">
                Category
              </div>
              <div className="flex flex-wrap gap-2 lg:gap-3">
                {categories &&
                  categories.map((item, i) => (
                    <div
                      className={
                        category === item.category
                          ? "py-[6px] px-5 bg-black text-white uppercase ease-in duration-300 cursor-pointer"
                          : "py-[6px] px-5 bg-[#EFEFEF] hover:bg-[#cecdcd] text-black uppercase text-sm lg:text-md cursor-pointer"
                      }
                      key={i}
                      onClick={() => setCategory(item.category)}
                    >
                      {item.category}
                    </div>
                  ))}
                {categoriesLoading && <Loader />}
                {categoriesError && <ErrorWidget error={categoriesError} />}
              </div>
            </div>

            <div className="">
              <div className="text-lg lg:text-[20px] uppercase mb-2">Size</div>
              <div className="grid grid-cols-6 gap-2 lg:gap-4">
                {sizes &&
                  sizes.map((item, i) => (
                    <div
                      className={
                        size === item
                          ? "col-span-1 py-[6px] text-center bg-black text-white uppercase ease-in duration-300 cursor-pointer"
                          : "col-span-1 py-[6px] text-center bg-[#EFEFEF] hover:bg-[#cecdcd] text-black uppercase text-sm lg:text-md cursor-pointer"
                      }
                      key={i}
                      onClick={() => setSize(item)}
                    >
                      {item}
                    </div>
                  ))}
              </div>
            </div>

            <div className="">
              <div className="text-lg lg:text-[20px] uppercase mb-2">
                Colors
              </div>
              <div className="flex flex-wrap gap-2 lg:gap-[14px]">
                {colors.map((it, i) => (
                  <div
                    key={i}
                    onClick={() => setColor(it.toLowerCase())}
                    className={
                      it.toLowerCase() === "red"
                        ? `rounded-full bg-red-500 cursor-pointer ${
                            color === "red"
                              ? "h-12 w-12 border-[7px] border-black ease-in duration-500"
                              : "h-7 lg:h-8 w-7 lg:w-8"
                          }`
                        : it.toLowerCase() === `blue`
                        ? `rounded-full bg-blue-500 cursor-pointer ${
                            color === "blue"
                              ? "h-12 w-12 border-[7px] border-black ease-in duration-500"
                              : "h-7 lg:h-8 w-7 lg:w-8"
                          }`
                        : it.toLowerCase() === `orange`
                        ? `rounded-full bg-orange-500 cursor-pointer ${
                            color === "orange"
                              ? "h-12 w-12 border-[7px] border-black ease-in duration-500"
                              : "h-7 lg:h-8 w-7 lg:w-8"
                          }`
                        : it.toLowerCase() === `green`
                        ? `rounded-full bg-green-500 cursor-pointer ${
                            color === "green"
                              ? "h-12 w-12 border-[7px] border-black ease-in duration-500"
                              : "h-7 lg:h-8 w-7 lg:w-8"
                          }`
                        : it.toLowerCase() === `yellow`
                        ? `rounded-full bg-yellow-500 cursor-pointer ${
                            color === "yellow"
                              ? "h-12 w-12 border-[7px] border-black ease-in duration-500"
                              : "h-7 lg:h-8 w-7 lg:w-8"
                          }`
                        : it.toLowerCase() === `purple`
                        ? `rounded-full bg-purple-500 cursor-pointer ${
                            color === "purple"
                              ? "h-12 w-12 border-[7px] border-black ease-in duration-500"
                              : "h-7 lg:h-8 w-7 lg:w-8"
                          }`
                        : it.toLowerCase() === `black`
                        ? `rounded-full bg-black border-[1px] border-red-500 cursor-pointer ${
                            color === "black"
                              ? "h-12 w-12 border-[7px] border-red-500 ease-in duration-500"
                              : "h-7 lg:h-8 w-7 lg:w-8"
                          }`
                        : it.toLowerCase() === `white`
                        ? ` rounded-full bg-white border-[1px] border-black cursor-pointer ${
                            color === "white"
                              ? "h-10 w-10 border-[7px] border-black ease-in duration-500"
                              : "h-7 lg:h-8 w-7 lg:w-8"
                          }`
                        : ``
                    }
                  ></div>
                ))}
              </div>
            </div>

            <div className="">
              <div className="text-lg lg:text-[20px] uppercase mb-2">Price</div>
              <div className="flex justify-between text-[14px] font-medium -mb-3">
                <div className="">#5,000</div>
                <div className="">#250,000</div>
              </div>
              <input
                type="range"
                step="5000"
                min="5000"
                max="250000"
                className="w-full m-0 p-0"
                onChange={(e) => setPrice(e.target.value)}
              />
              <div className="text-center -mt-5 text-md font-semibold">
                #5,000 to {formatter(price)}
              </div>
            </div>

            <button
              onClick={handleFilterItems}
              className="w-full py-3 md:py-4 dark-btn"
            >
              Filter Items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
