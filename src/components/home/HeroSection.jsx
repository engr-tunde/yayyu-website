"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const heroImages = [
  { url: "hero-1.png" },
  { url: "hero-2.png" },
  { url: "hero-3.png" },
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
    <div className="w-full h-[50vh] lg:h-[95vh]">
      <div className="w-full h-full">
        {/* <img
          src="/images/slider1.png"
          alt=""
          className="w-full h-full relative"
        /> */}
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
          <h1 className="text-3xl lg:text-5xl leading-[2.5rem] lg:leading-[4.5rem] font-medium text-white max-w-[90%] lg:max-w-[45%] text-center">
            Classic and Premium Collection
          </h1>
          <Link
            href="/shop"
            className="w-[50%] lg:w-[250px] p-4 dark-btn uppercase"
          >
            Shop Collection Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
