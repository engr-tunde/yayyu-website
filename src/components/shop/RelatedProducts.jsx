import { formatter } from "@/lib/helpers";
import Link from "next/link";

const RelatedProducts = ({ related_products }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8">
      {related_products.slice(0, 4).map((item, i) => (
        <Link
          key={i}
          href={`/${item.item_slug}`}
          className="col-span-1 flex flex-col gap-2 items-center"
        >
          <img
            src={`${process.env.API_IMAGES}/products/${item.img}`}
            alt=""
            className="shop-item-img mb-1"
          />
          <p className="uppercase -mb-1 text-[14px] text-center">
            {item.item_name}
          </p>

          {item.original_price != item.new_price ? (
            <>
              <span className="text-[14px] lg:text-[15px] mb-[-6px] text-[#9a9a9a] line-through">
                {formatter(item.original_price)}
              </span>
              <span className="text-[14px] lg:text-[15px] ">
                {formatter(item.new_price)}
              </span>
            </>
          ) : (
            <span className="text-[14px] lg:text-[15px]">
              {formatter(item.original_price)}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
};

export default RelatedProducts;
