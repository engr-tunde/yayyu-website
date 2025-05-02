import React from "react";
import Loader from "../globals/Loader";
import ErrorWidget from "../globals/ErrorWidget";

const FilterCategory = ({
  categories,
  categoriesLoading,
  categoriesError,
  category,
  setCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-2 lg:gap-3">
      {categories &&
        categories.map((item, i) => (
          <div
            className={
              category === item.category
                ? "py-[6px] px-5 bg-black text-white uppercase ease-in duration-300 cursor-pointer"
                : "py-[6px] px-5 bg-[#EFEFEF] hover:bg-[#cecdcd] text-black uppercase text-sm lg:text-md cursor-pointer"
            }
            key={i}
            onClick={() => setCategory(item.category)}
          >
            {item.category}
          </div>
        ))}
      {categoriesLoading && <Loader />}
      {categoriesError && <ErrorWidget error={categoriesError} />}
    </div>
  );
};

export default FilterCategory;
