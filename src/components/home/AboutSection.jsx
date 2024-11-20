import Link from "next/link";
import React from "react";

const AboutSection = () => {
  return (
    <div className="w-full bg-white">
      <div className="container pt-14 pb-12 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="uppercase text-lg lg:text-xl">About Us</h1>
          <Link href="/about" className="flex gap-1">
            <span className="text-sm md:text-md">Learn more</span>
            <img src="/icons/arrow-right.svg" alt="" />
          </Link>
        </div>
        <h2 className="max-w-[100%] lg:max-w-[50%] text-2xl lg:text-3xl italic font-medium">
          To provide sustainable clothing for both formal and informal
          occasions.
        </h2>
        <div className="flex items-end justify-between">
          <p className="w-full lg:w-[50%] text-[#585656]">
            We are dedicated to crafting garments using only the finest
            materials, emphasizing durability and elegance. Each piece in our
            collection is thoughtfully designed with exceptional craftsmanship,
            allowing you to express your individuality while feeling confident
            and comfortable.
          </p>
          <p className="hidden lg:block w-[13%] text-end">
            DISCOVER THE POWER OF BEAUTY
          </p>
        </div>
        <div className="flex lg:hidden items-end justify-between">
          <Link href="/about" className="flex gap-1">
            <span className="text-base">Learn more</span>
            <img src="/icons/arrow-right.svg" alt="" />
          </Link>
          <p className="w-[35%] text-sm text-end">
            DISCOVER THE POWER OF BEAUTY
          </p>
        </div>

        <Link href="/about" className="hidden lg:flex">
          <span className="text-md">Learn more</span>
          <img src="/icons/arrow-right.svg" alt="" />
        </Link>
      </div>
    </div>
  );
};

export default AboutSection;
