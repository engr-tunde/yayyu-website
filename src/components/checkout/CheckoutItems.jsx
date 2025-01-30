import { formatter } from "@/lib/helpers";

const CheckoutItems = ({ groupedBy }) => {
  return (
    <div className="flex flex-col gap-5">
      {groupedBy &&
        groupedBy.map((item, i) => {
          const sItem = item[0];
          return (
            <div
              key={i}
              className="w-full text-[#222] flex justify-between items-center text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="relative h-[70px] w-[70px] border-[1.5px] border-[#d7d7d7] px-[2px] rounded-md">
                  <img
                    src={`${process.env.API_IMAGES}/products/${sItem.img}`}
                    alt=""
                    className="h-full"
                  />

                  <span className="absolute w-6 h-6 bg-[#666] rounded-full -top-2 -right-2 flex justify-center items-center text-white">
                    {item.length}
                  </span>
                </div>
                <div className="flex flex-col ">
                  <div className="text-[16px]">{sItem.item_name}</div>
                  <div className="text-[13px]">
                    {sItem.size
                      ? sItem.color
                        ? `${sItem.size}, ${sItem.color}`
                        : sItem.size
                      : sItem.color && sItem.color}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[2px]">
                <div className="text-lg">{formatter(sItem.new_price)}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CheckoutItems;
