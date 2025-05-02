import { formatter } from "@/lib/helpers";
import React from "react";

const FilterPrice = ({ price, setPrice }) => {
  return (
    <>
      <div className="flex justify-between text-[14px] font-medium -mb-3">
        <div className="">#5,000</div>
        <div className="">#250,000</div>
      </div>
      <input
        type="range"
        step="5000"
        min="5000"
        max="250000"
        className="w-full m-0 p-0"
        onChange={(e) => setPrice(e.target.value)}
      />
      <div className="text-center -mt-5 text-md font-semibold">
        #5,000 to {formatter(price)}
      </div>
    </>
  );
};

export default FilterPrice;
