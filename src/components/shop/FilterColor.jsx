import React from "react";

const FilterColor = ({ colors, color, setColor }) => {
  return (
    <div className="flex flex-wrap gap-2 lg:gap-[14px]">
      {colors &&
        colors.map((it, i) => (
          <div
            key={i}
            onClick={() => setColor(it.toLowerCase())}
            className={
              it.toLowerCase() === "red"
                ? `rounded-full bg-red-500 cursor-pointer ${
                    color === "red"
                      ? "h-12 w-12 border-[7px] border-black ease-in duration-500"
                      : "h-7 lg:h-8 w-7 lg:w-8"
                  }`
                : it.toLowerCase() === `blue`
                ? `rounded-full bg-blue-500 cursor-pointer ${
                    color === "blue"
                      ? "h-12 w-12 border-[7px] border-black ease-in duration-500"
                      : "h-7 lg:h-8 w-7 lg:w-8"
                  }`
                : it.toLowerCase() === `orange`
                ? `rounded-full bg-orange-500 cursor-pointer ${
                    color === "orange"
                      ? "h-12 w-12 border-[7px] border-black ease-in duration-500"
                      : "h-7 lg:h-8 w-7 lg:w-8"
                  }`
                : it.toLowerCase() === `green`
                ? `rounded-full bg-green-500 cursor-pointer ${
                    color === "green"
                      ? "h-12 w-12 border-[7px] border-black ease-in duration-500"
                      : "h-7 lg:h-8 w-7 lg:w-8"
                  }`
                : it.toLowerCase() === `yellow`
                ? `rounded-full bg-yellow-500 cursor-pointer ${
                    color === "yellow"
                      ? "h-12 w-12 border-[7px] border-black ease-in duration-500"
                      : "h-7 lg:h-8 w-7 lg:w-8"
                  }`
                : it.toLowerCase() === `purple`
                ? `rounded-full bg-purple-500 cursor-pointer ${
                    color === "purple"
                      ? "h-12 w-12 border-[7px] border-black ease-in duration-500"
                      : "h-7 lg:h-8 w-7 lg:w-8"
                  }`
                : it.toLowerCase() === `black`
                ? `rounded-full bg-black border-[1px] border-red-500 cursor-pointer ${
                    color === "black"
                      ? "h-12 w-12 border-[7px] border-red-500 ease-in duration-500"
                      : "h-7 lg:h-8 w-7 lg:w-8"
                  }`
                : it.toLowerCase() === `white`
                ? ` rounded-full bg-white border-[1px] border-black cursor-pointer ${
                    color === "white"
                      ? "h-10 w-10 border-[7px] border-black ease-in duration-500"
                      : "h-7 lg:h-8 w-7 lg:w-8"
                  }`
                : ``
            }
          ></div>
        ))}
    </div>
  );
};

export default FilterColor;
