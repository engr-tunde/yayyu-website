import { formatter } from "@/lib/helpers";
import Link from "next/link";

const CartSummaryCard = ({
  itemsInCart,
  totalPrice,
  discountData,
  totalDiscount,
  subtotal,
}) => {
  return (
    <div className="w-full col-span-1 h-max bg-[#F6F9Fa] flex flex-col gap-4 p-5 sticky top-[80px]">
      <h1 className="text-lg uppercase font-semibold">Cart summary</h1>
      <div className="h-[1.5px] w-full bg-[#e7e7e7d3] my-1"></div>
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm">Item's total ({itemsInCart.length})</span>
        <span className="font-medium">{formatter(totalPrice)}</span>
      </div>
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm">Discount ({discountData.percent}%)</span>
        <span className="font-medium">{formatter(totalDiscount)}</span>
      </div>
      <div className="flex justify-between items-end">
        <span className="text-sm">Subtotal</span>
        <span className="font-semibold">{formatter(subtotal)}</span>
      </div>
      <div className="h-[1.5px] w-full bg-[#e7e7e7d3] my-2"></div>
      <Link href="/checkout" className="dark-btn py-3 uppercase text-sm w-full">
        Checkout ({formatter(subtotal)})
      </Link>
    </div>
  );
};

export default CartSummaryCard;
