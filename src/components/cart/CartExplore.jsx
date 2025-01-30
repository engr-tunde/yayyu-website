import { formatter } from "@/lib/helpers";
import Link from "next/link";

const CartExplore = ({ related_products }) => {
  return (
    <div className="bg-[#ffffff] mt-14 lg:mt-20 mb-10 lg:mb-20">
      <h1 className="text-xl lg:text-xl uppercase mb-10 lg:mb-10">
        You may also like
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8">
        {related_products.slice(0, 4).map((item, i) => (
          <Link
            key={i}
            href={`/${item.item_slug}`}
            className="col-span-1 flex flex-col gap-1 items-center"
          >
            <img
              src={`${process.env.API_IMAGES}/products/${item.img}`}
              alt=""
              className="shop-item-img"
            />
            <p className="uppercase -mb-1">{item.item_name}</p>

            {item.original_price != item.new_price ? (
              <>
                <span className="font-semibold text-lg mb-[-6px] text-[#9a9a9a] line-through">
                  {formatter(item.original_price)}
                </span>
                <span className="font-semibold text-xl ">
                  {formatter(item.new_price)}
                </span>
              </>
            ) : (
              <span className="font-semibold text-xl">
                {formatter(item.original_price)}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CartExplore;
