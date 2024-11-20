import React from "react";

const PageHeader = ({ title }) => {
  return (
    <div className="w-full h-[20vh] lg:h-[33vh] pageHeader">
      <div className="w-full h-full bg-black/45">
        <div className="container pt-[12vh] lg:pt-[21vh]">
          <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold text-center uppercase">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
