import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="w-full h-[50vh] lg:h-[95vh]">
      <div className="w-full h-full">
        <img
          src="/images/slider1.png"
          alt=""
          className="w-full h-full relative"
        />
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
