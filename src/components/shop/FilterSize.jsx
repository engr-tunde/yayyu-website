import React from "react";

const FilterSize = ({ sizes, size, setSize }) => {
  return (
    <div className="grid grid-cols-6 gap-2 lg:gap-4">
      {sizes &&
        sizes.map((item, i) => (
          <div
            className={
              size === item
                ? "col-span-1 py-[6px] text-center bg-black text-white uppercase ease-in duration-300 cursor-pointer"
                : "col-span-1 py-[6px] text-center bg-[#EFEFEF] hover:bg-[#cecdcd] text-black uppercase text-sm lg:text-md cursor-pointer"
            }
            key={i}
            onClick={() => setSize(item)}
          >
            {item}
          </div>
        ))}
    </div>
  );
};

export default FilterSize;
