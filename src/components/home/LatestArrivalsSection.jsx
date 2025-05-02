"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { itemsData } from "@/lib/data";
import { formatter } from "@/lib/helpers";
import Link from "next/link";
import React from "react";
import SectionTitle from "./SectionTitle";
import { fetchProducts } from "@/api";
import Loader from "../globals/Loader";
import ErrorWidget from "../globals/ErrorWidget";

const LatestArrivalsSection = () => {
  const { products, productsLoading, productsError } = fetchProducts();
  console.log("products", products);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 701 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="w-full bg-white">
      <div className="container pt-10 pb-12 flex flex-col gap-8">
        <SectionTitle title="New Arrivals" />
        <div className="hidden md:block w-full">
          {products && (
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-10">
              {products
                .sort((a, b) => b._id - a._id)
                .slice(0, 8)
                .map((item, i) => (
                  <Link
                    // href={{
                    //   pathname: `/${item.item_slug}`,
                    //   query: { data: JSON.stringify(item) },
                    // }}
                    href={`/${item.item_slug}`}
                    key={i}
                    className="col-span-1 flex flex-col gap-[6px] items-center"
                  >
                    <img
                      src={`${process.env.API_IMAGES}/products/${item.img}`}
                      alt=""
                      className="home-item-img"
                    />
                    <p className="font-[500] text-[13px] uppercase">
                      {item.item_name}
                    </p>
                    <span className="text-[13.8px] font-[400]">
                      {formatter(item.original_price)}
                    </span>
                  </Link>
                ))}
            </div>
          )}
          {productsLoading && <Loader />}
          {productsError && <ErrorWidget error={productsError} />}
        </div>

        <div className="block w-full md:hidden">
          {products && (
            <Carousel
              responsive={responsive}
              infinite={true}
              className="grid grid-cols-1 md:hidden"
            >
              {/* <div className="grid grid-cols-1 md:hidden"> */}
              {products.slice(0, 8).map((item, i) => (
                <Link
                  key={i}
                  href={`/${item.item_slug}`}
                  className="col-span-1 flex flex-col gap-2 items-center"
                >
                  <img
                    src={`${process.env.API_IMAGES}/products/${item.img}`}
                    alt=""
                    className="home-item-img"
                  />
                  <p className="font-[500] text-[13px] uppercase">
                    {item.item_name}
                  </p>
                  <span className="text-[13.5px] font-[400]">
                    {formatter(item.original_price)}
                  </span>
                </Link>
              ))}
              {/* </div> */}
            </Carousel>
          )}
          {productsLoading && <Loader />}
          {productsError && <ErrorWidget error={productsError} />}
        </div>

        <Link
          href="/shop"
          className="mt-3 lg:mt-8 uppercase dark-btn w-[60%] lg:w-[250px] mx-auto py-4"
        >
          View All
        </Link>
      </div>
    </div>
  );
};

export default LatestArrivalsSection;
