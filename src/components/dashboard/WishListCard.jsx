import { formatter } from "@/lib/helpers";
import Link from "next/link";

const WishListCard = ({ item, handleRemoveWishListItem }) => {
  return (
    <div className="p-2 lg:p-4 flex flex-col gap-[8px] w-full justify-between text-[#222] bp-[14px] border-[#D4D4D6] border-[1.5px] rounded-md">
      <div className="flex justify-between text-sm">
        <div className="flex gap-2 lg:gap-4">
          <img
            src={`${process.env.API_IMAGES}/products/${item.img}`}
            alt=""
            className="h-[70px] border-[1.5px] border-[#d7d7d7] px-[2px] rounded-md"
          />

          <div className="flex flex-col gap-[2px]">
            <div className="text-[16px]">{item.item_name}</div>
            <div className="text-[13px]">
              Size: <span className="text-[16px]">{item.size}</span>
            </div>
            <div className="text-[13px]">
              Color: <span className="text-[16px]">{item.color}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[2px]">
          <div className="text-[#aaa] line-through">
            {formatter(item.original_price)}
          </div>
          <div className="font-semibold text-lg">
            {formatter(item.new_price)}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div
          className="text-sm px-2 transparent-btn"
          onClick={() => handleRemoveWishListItem(item)}
        >
          Remove
        </div>
        <Link href={`/${item.item_slug}`} className="dark-btn py-1 px-5">
          View
        </Link>
      </div>
    </div>
  );
};

export default WishListCard;
