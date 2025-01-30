import { dateFormatter, formatter } from "@/lib/helpers";
import React from "react";

const OrderCard = ({ item }) => {
  console.log("img:", `${process.env.API_IMAGES}/${item.img}`);
  return (
    <div className="p-[14px] border-[#D4D4D6] border-[1.5px] flex flex-col lg:flex-row justify-between gap-2">
      <div className="flex items-center justify-between gap-2">
        <div className="relative h-[70px] w-[70px] border-[1.5px] border-[#d7d7d7] px-[2px] rounded-md">
          <img
            src={`${process.env.API_IMAGES}/products/${item.img}`}
            alt=""
            className="h-full"
          />
          <span className="absolute w-6 h-6 bg-[#666] rounded-full -top-2 -right-2 flex justify-center items-center text-white">
            {item.items.length}
          </span>
        </div>
        <div className="flex flex-col items-end lg:items-start">
          <p className="font-medium text-lg">{item.order_title}</p>
          <p className="text-sm text-gray-600">
            Made On:{" "}
            <span className="font-medium">
              {dateFormatter(item.created_at)}
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col text-gray-600">
        <p className="text-sm flex justify-between items-end gap-4">
          Purchase total: <span className="">{formatter(item.subtotal)}</span>
        </p>
        <p className="text-sm flex justify-between items-end gap-4">
          shipping cost:{" "}
          <span className="">{formatter(item.shipping_fee)}</span>
        </p>
        <p className="text-sm flex justify-between items-end gap-4">
          Total Paid:{" "}
          <span className=" text-lg text-gray-900">
            {formatter(item.total_paid)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
