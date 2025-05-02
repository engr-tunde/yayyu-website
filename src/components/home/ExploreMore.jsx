"use client";
import React from "react";
import SectionTitle from "./SectionTitle";
import { exploreMoreData } from "@/lib/data";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ExploreMore = () => {
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
      <div className="container pt-10 pb-20 flex flex-col gap-8">
        <SectionTitle title="Explore More" />
        <div className="hidden md:grid grid-cols-2 gap-3">
          {exploreMoreData.map((item, i) => (
            <div
              key={i}
              className="group col-span-1 w-full h-full relative flex items-center justify-center group-hover:scale-150"
            >
              <img src={item.img} alt="" className="w-full" />
              <p className="absolute top-[50%] text-white text-[32px] uppercase group-hover:hidden font-[400]">
                {item.title}
              </p>
              <Link
                href={`/shop?category=${item.title.toLowerCase()}`}
                className="hidden w-[180px] py-4 group-hover:block absolute top-[50%] dark-btn uppercase"
              >
                Shop Now
              </Link>
            </div>
          ))}
        </div>

        <div className="w-full md:hidden grid-cols-1 bg-green-400">
          {exploreMoreData && (
            <Carousel
              responsive={responsive}
              infinite={true}
              className="grid grid-cols-1 md:hidden"
            >
              {exploreMoreData.map((item, i) => (
                <div
                  key={i}
                  className="col-span-1 group w-full h-full relative flex items-center justify-center group-hover:scale-150"
                >
                  <img src="/images/explore-1.png" alt="" className="w-full" />
                  <p className="absolute text-white text-[20px] uppercase font-[400] group-hover:hidden">
                    {item.title}
                  </p>
                  <Link
                    href={`/category/suit`}
                    className="hidden w-[180px] py-4 group-hover:block absolute dark-btn uppercase"
                  >
                    Shop Now
                  </Link>
                </div>
              ))}
            </Carousel>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
