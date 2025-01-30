"use client";

import { fetchProducts } from "@/api";
import ErrorWidget from "@/components/globals/ErrorWidget";
import Loader from "@/components/globals/Loader";
import PageHeader from "@/components/globals/PageHeader";
import CatPageTitle from "@/components/shop/CatPageTitle";
import { formatter } from "@/lib/helpers";
import Link from "next/link";

// export const metadata = {
//   title: "Our Shop",
// };

const ShopPage = () => {
  const { products, productsLoading, productsError } = fetchProducts();

  return (
    <div className="h-full top-[100px]">
      <PageHeader title="Shop" />
      <div className="container py-20">
        <CatPageTitle title="Shop" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 lg:gap-2 my-10 cursor-pointer">
            <img src="/icons/filter.svg" alt="" />
            <span className="uppercase">Show Filter</span>
          </div>

          <div className="flex items-center gap-1 lg:gap-2 mt-10 cursor-pointer">
            <span className="uppercase">Sort By</span>
            <img src="/icons/arrow-down.svg" alt="" />
          </div>
        </div>

        {products && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-16 mt-10">
            {products.map((item, i) => (
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
    </div>
  );
};

export default ShopPage;
