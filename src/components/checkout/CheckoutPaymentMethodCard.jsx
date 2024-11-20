const CheckoutPaymentMethodCard = () => {
  return (
    <>
      <div className="hidden lg:block col-span-2 mt-8 mb-2">
        <h1 className="text-xl font-semibold mb-2">Payment</h1>
        <p className="text-sm text-[#636060]">
          All transactions are secure and encrypted.
        </p>
      </div>

      <div className="hidden lg:flex col-span-2 border-[2px] border-[#dedede] p-3 justify-between items-center">
        <span className="text-sm text-[#636060]">Accepted cards</span>
        <div className="flex gap-1">
          <img src="/icons/verve.svg" alt="" />
          <img src="/icons/mastercard.svg" alt="" />
          <img src="/icons/visa.svg" alt="" />
          <img src="/icons/unionpay.svg" alt="" />
          <img src="/icons/amex.svg" alt="" />
        </div>
      </div>
    </>
  );
};

export default CheckoutPaymentMethodCard;
