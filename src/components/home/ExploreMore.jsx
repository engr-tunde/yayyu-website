import React from "react";
import SectionTitle from "./SectionTitle";
import { exploreMoreData } from "@/lib/data";
import Link from "next/link";

const ExploreMore = () => {
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
              <p className="absolute top-[50%] text-white text-4xl uppercase font-semibold group-hover:hidden">
                {item.title}
              </p>
              <Link
                href={`/category/${item.link}`}
                className="hidden w-[180px] py-4 group-hover:block absolute top-[50%] dark-btn uppercase"
              >
                Shop Now
              </Link>
            </div>
          ))}
        </div>

        <div className="w-full md:hidden grid-cols-1 bg-green-400">
          {/* {exploreMoreData.map((item, i) => ( */}
          <div className="group w-full h-full relative flex items-center justify-center group-hover:scale-150">
            <img src="/images/explore-1.png" alt="" className="w-full" />
            <p className="absolute text-white text-4xl uppercase font-semibold group-hover:hidden">
              Suite
            </p>
            <Link
              href={`/category/suit`}
              className="hidden w-[180px] py-4 group-hover:block absolute dark-btn uppercase"
            >
              Shop Now
            </Link>
          </div>
          {/* ))} */}
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
