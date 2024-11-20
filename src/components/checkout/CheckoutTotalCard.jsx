import { formatter } from "@/lib/helpers";

const CheckoutTotalCard = ({ subtotal, shipping, totalPrice }) => {
  return (
    <div className="w-full col-span-1 h-max flex flex-col gap-4 p-5 sticky lg:top-[100px]">
      <div className="flex justify-between items-end">
        <span className="text-sm">Subtotal</span>
        <span className="font-semibold">{formatter(subtotal)}</span>
      </div>

      <div className="flex justify-between items-end mb-2">
        <span className="text-sm">Shipping</span>
        <span className="font-medium">{formatter(shipping)}</span>
      </div>

      <div className="flex justify-between items-end mb-2">
        <span className="text-xl font-semibold">Total</span>
        <span className="text-xl font-semibold">{formatter(totalPrice)}</span>
      </div>
    </div>
  );
};

export default CheckoutTotalCard;
