import PageHeader from "@/components/globals/PageHeader";
import React from "react";

const AboutPage = () => {
  return (
    <div className="h-full top-[100px]">
      <PageHeader title="About Us" />
      <div className="container py-14">
        <div className="w-full flex justify-center">
          <img src="/images/about.png" alt="" />
        </div>
        <p className="about-p pt-8 lg:pt-10">
          At YAYYU, we believe that every woman deserves to feel both
          comfortable and stylish, no matter the occasion. Our mission is to
          provide sustainable clothing options that blend elegance with modern
          design, suitable for both formal and informal settings.
        </p>
        <p className="about-p">
          We are committed to using only the finest materials and delivering
          exceptional designs that reflect our dedication to quality. Our
          collections feature modest yet fashionable styles with clean cuts,
          ensuring that each piece enhances your wardrobe.
        </p>
        <p className="about-p mb-6 lg:mb-16">
          As a socially empowered team, we strive to make shopping easy and
          enjoyable through our thoughtfully crafted designs and fast, seamless
          delivery. We aim to inspire women across the globe to embrace their
          unique style and wear pieces that make them feel their best, always.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
