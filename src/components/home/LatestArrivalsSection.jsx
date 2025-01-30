"use client";

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

  return (
    <div className="w-full bg-white">
      <div className="container pt-10 pb-12 flex flex-col gap-8">
        <SectionTitle title="New Arrivals" />
        <div className="hidden md:block w-full">
          {products && (
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-10">
              {products.map((item, i) => (
                <Link
                  // href={{
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
                    className="home-item-img"
                  />
                  <p>{item.item_name}</p>
                  <span className="font-semibold text-xl">
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
            <div className="grid grid-cols-1 md:hidden">
              {products.slice(0, 1).map((item, i) => (
                <Link
                  key={i}
                  href={`/${item.item_slug}`}
                  className="col-span-1 flex flex-col gap-1 items-center"
                >
                  <img
                    src={`${process.env.API_IMAGES}/products/${item.img}`}
                    alt=""
                    className="home-item-img"
                  />
                  <p>{item.item_name}</p>
                  <span className="font-semibold text-xl">
                    {formatter(item.original_price)}
                  </span>
                </Link>
              ))}
            </div>
          )}
          {productsLoading && <Loader />}
          {productsError && <ErrorWidget error={productsError} />}
        </div>

        <Link
          href="/"
          className="mt-8 uppercase dark-btn w-[60%] lg:w-[250px] lg:mx-auto py-4"
        >
          View All
        </Link>
      </div>
    </div>
  );
};

export default LatestArrivalsSection;
