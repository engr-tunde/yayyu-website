"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const heroImages = [
  { url: "hero-11.png" },
  { url: "hero-22.png" },
  { url: "hero-33.png" },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const autoPlay = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => clearInterval(autoPlay);
  }, [currentIndex]);
  return (
    <div className="w-full h-[65vh] lg:h-[95vh]">
      <div className="w-full h-full">
        <div
          className="w-full h-full relative bg-cover bg-center bg-no-repeat duration-500"
          style={{
            backgroundImage: `url(/images/hero/${heroImages[currentIndex].url})`,
            // backgroundRepeat: "no-repeat",
            // backgroundSize: "cover",
            // backgroundPosition: "center center",
          }}
        ></div>
        <div className="w-full h-[50vh] lg:h-[95vh] top-0 flex flex-col items-center justify-center gap-5 absolute z-40 pt-5 lg:pt-6">
          <h1
            className="text-2xl lg:text-4xl leading-[2.5rem] lg:leading-[4.5rem] font-medium text-white max-w-[90%] lg:max-w-[45%] text-center lg:uppercase"
            style={{ textShadow: "2px 2px #000" }}
          >
            Classic and Premium Collection
          </h1>
          {/* <Link
            href="/shop"
            className="w-[50%] lg:hidden p-4 dark-btn uppercase"
          >
            Shop Collection Now
          </Link> */}
          <Link
            href="/shop"
            className="block p-4 uppercase mb-2 text-[18px] lg:text-[20px] text-white group group-hover:text-yayyuYellow ease-in duration-200 font-[500]"
          >
            <span style={{ textShadow: "2px 2px #000" }}>Shop Now</span>
            <div className="h-[2px] w-[105px] lg:w-[115px] bg-white group-hover:bg-yayyuYellow ease-in duration-200 border-b-[1px] border-b-[#000]"></div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
