"use client";

import { fetchDiscountData, fetchShippingData, makeOrder } from "@/api";
import CheckoutItems from "@/components/checkout/CheckoutItems";
import CheckoutPaymentMethodCard from "@/components/checkout/CheckoutPaymentMethodCard";
import CheckoutTotalCard from "@/components/checkout/CheckoutTotalCard";
import ErrorWidget from "@/components/globals/ErrorWidget";
import CheckBox from "@/components/globals/form/CheckBox";
import InputField from "@/components/globals/form/InputField";
import SelectCountryField from "@/components/globals/form/SelectCountryField";
import SelectStateField from "@/components/globals/form/SelectStateField";
import SubmitButton from "@/components/globals/form/SubmitButton";
import Loader from "@/components/globals/Loader";
import { useAppContext } from "@/context";
import {
  errorNotification,
  formatter,
  successNotification,
} from "@/lib/helpers";
import CustomFormik from "@/lib/utils/CustomFormik";
import { orderValues } from "@/lib/utils/initialValues";
import { validateMakeOrder } from "@/lib/utils/validate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [original_total, setOriginal_total] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState({
    location: "",
    delivery_duration: "",
    fee: 0,
  });
  const router = useRouter();
  const { shippingData, shippingDataLoading, shippingDataError } =
    fetchShippingData();
  const { discountData } = fetchDiscountData();
  console.log({ discountData });

  const { itemsInCart, setItemsInCart } = useAppContext();

  let groupedBy = Object.groupBy(
    itemsInCart,
    (item) => `${item.item_name}-${item.size}-${item.color}`
  );
  groupedBy = Object.values(groupedBy);

  const calculateTotalFee = () => {
    let cartTotal = 0;
    let disco = 0;
    let subT = 0;
    let overAllTotal = 0;
    itemsInCart.forEach((ele) => {
      cartTotal += Number(ele.new_price);
    });

    setOriginal_total(Number(cartTotal));

    disco = Number((Number(discountData?.percent) / 100) * Number(cartTotal));
    setDiscount(disco);
    subT = Number(cartTotal) - disco;
    setSubtotal(subT);
    overAllTotal = subT + Number(shipping?.fee);
    setTotalPrice(overAllTotal);
  };

  useEffect(() => {
    calculateTotalFee();
  }, [
    // itemsInCart,
    discountData,
    shippingData,
    totalPrice,
    shipping,
    // calculateTotalFee,
  ]);

  const initialValues = orderValues();
  const validationSchema = validateMakeOrder();

  const handleSubmit = async (values) => {
    console.log(values);

    if (!shipping.location.length) {
      errorNotification("Please select Shipping Method");
    }

    if (itemsInCart.length > 0) {
      const payload = {
        ...values,
        shipping_method: shipping.location,
        shipping_fee: Number(shipping.fee),
        original_total: Number(original_total),
        discount: Number(discount),
        subtotal: Number(subtotal),
        total_paid: Number(totalPrice),
        items: itemsInCart,
      };
      console.log("payload", payload);
      const response = await makeOrder(payload);
      console.log(response);
      try {
        if (response.status === 200) {
          const data = response.data;
          successNotification(data.message);
          localStorage.setItem("cart", []);
          setItemsInCart([]);
          setTimeout(() => router.push("/dashboard"), 1000);
        } else {
          errorNotification(response?.data?.error);
        }
      } catch (error) {
        errorNotification(error?.response?.data?.error);
      }
    }
  };

  console.log("totalPrice", totalPrice);
  console.log("subtotal", subtotal);
  console.log("shipping", shipping);
  console.log("original_total", original_total);

  const setShippingData = (item) => {
    setShipping(item);
    successNotification(`Deliverying to ${item.location}`);
  };
  return (
    <div className="pt-[70px] ">
      <div className="container px-5 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <CustomFormik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <div className="col-span-1 lg:pe-9 lg:border-r-[1.5px] border-[#DEDEDE] py-20">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold">Contact</h1>
                <Link href="/login" className="text-md">
                  Login
                </Link>
              </div>

              <div className="py-2">
                {/* <CustomFormik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              > */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-3">
                  <InputField name="email" placeholder="Email" full={true} />
                  <InputField name="phone" placeholder="Phone" full={true} />
                  <CheckBox
                    name="sign_up"
                    placeholder="Sign up for order updates, exclusive offers and news on WhatsApp and/or Email"
                    full={true}
                  />

                  <div className="col-span-2 mt-8 mb-2">
                    <h1 className="text-xl font-semibold">Delivery</h1>
                  </div>
                  <SelectCountryField name="country" full={true} />
                  <InputField name="first_name" placeholder="First name" />
                  <InputField name="last_name" placeholder="Last name" />
                  <InputField
                    name="address"
                    placeholder="Address"
                    full={true}
                  />
                  <InputField
                    name="apartment"
                    placeholder="Apartment"
                    full={true}
                  />
                  <InputField name="city" placeholder="City" full={true} />
                  <SelectStateField name="state" />
                  <InputField name="postal_code" placeholder="Postal Code" />
                  <div className="col-span-2 mt-8 mb-2">
                    <h1 className="text-xl font-semibold">Shipping method</h1>
                  </div>

                  <div className="col-span-2 flex flex-col gap-[6px]">
                    {shippingData &&
                      shippingData.map((item, i) => (
                        <div
                          onClick={() => setShippingData(item)}
                          key={i}
                          className={
                            shipping.location === item.location
                              ? "cursor-pointer w-full border-[7px] border-[#242424] py-1 lg:py-2 px-3 flex justify-between items-center"
                              : "cursor-pointer w-full border-[2px] border-[#dedede] py-1 lg:py-2 px-3 flex justify-between items-center"
                          }
                        >
                          <div className="flex gap-3 lg:gap-5 items-center">
                            <div className="h-[23px] w-[23px] border-black border-[5px] rounded-full"></div>
                            <span className="text-[12px] text-sm text-[#636060]">
                              {item.location} ({item.delivery_duration}{" "}
                              delivery)
                            </span>
                          </div>
                          <div className="text-[16px]">
                            {formatter(item.fee)}
                          </div>
                        </div>
                      ))}
                    {shippingDataLoading && <Loader />}
                    {shippingDataError && (
                      <ErrorWidget error={shippingDataError} />
                    )}
                  </div>

                  <CheckoutPaymentMethodCard />

                  {/* <div className="hidden lg:block mt-5 col-span-2 py-[14px] uppercase w-full bg-black text-white text-[17px] lg:text-[20px] text-center hover:bg-yayyuYellow hover:text-white hover:font-semibold ease-in duration-300 cursor-pointer">
                    Pay
                  </div> */}
                  <SubmitButton
                    title="Pay"
                    className="hidden lg:block mt-5 col-span-2 py-[14px] uppercase w-full bg-black text-white text-[17px] lg:text-[20px] text-center hover:bg-yayyuYellow hover:text-white hover:font-semibold ease-in duration-300 cursor-pointer"
                  />
                </div>
                {/* </CustomFormik> */}
              </div>
            </div>

            <div className="col-span-1 lg:ps-12 pb-20 lg:pt-20">
              <CheckoutItems groupedBy={groupedBy} />

              <CustomFormik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <div className="mt-9 mb-9 flex justify-between">
                  <div className="w-[70%]">
                    <InputField name="coupon" placeholder="Discount code" />
                  </div>
                  <div className="w-[28%] transparent-btn py-3">Apply</div>
                </div>
              </CustomFormik>

              {/* <CheckoutTotalCard
              subtotal={subtotal}
              shipping={shipping}
              totalPrice={totalPrice}
            /> */}
              <div className="w-full col-span-1 h-max flex flex-col gap-4 p-5 sticky lg:top-[100px]">
                <div className="flex justify-between items-end">
                  <span className="text-sm">Subtotal</span>
                  {/* {subtotal > 0 ? ( */}
                  <span className="font-semibold">{formatter(subtotal)}</span>
                  {/* ) : null} */}
                </div>

                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm">Shipping</span>
                  <span className="font-medium">{formatter(shipping.fee)}</span>
                </div>

                <div className="flex justify-between items-end mb-2">
                  <span className="text-xl font-semibold">Total</span>
                  <span className="text-xl font-semibold">
                    {totalPrice == "NaN" ? "xxx.xx" : formatter(totalPrice)}
                  </span>
                </div>
              </div>

              <div className="lg:hidden col-span-2 mt-10 mb-2">
                <h1 className="text-xl font-semibold mb-2">Payment</h1>
                <p className="text-sm text-[#636060]">
                  All transactions are secure and encrypted.
                </p>
              </div>

              <div className="flex lg:hidden col-span-2 border-[2px] border-[#dedede] p-3 justify-between items-center">
                <span className="text-sm text-[#636060]">Accepted cards</span>
                <div className="flex gap-1">
                  <img src="/icons/verve.svg" alt="" />
                  <img src="/icons/mastercard.svg" alt="" />
                  <img src="/icons/visa.svg" alt="" />
                  <img src="/icons/unionpay.svg" alt="" />
                  <img src="/icons/amex.svg" alt="" />
                </div>
              </div>

              {/* <div className="lg:hidden mt-5 col-span-2 py-[14px] uppercase w-full bg-black text-white text-[17px] lg:text-[20px] text-center hover:bg-yayyuYellow hover:text-white hover:font-semibold ease-in duration-300 cursor-pointer">
                Pay
              </div> */}
              <SubmitButton
                title="Pay"
                className="lg:hidden mt-5 col-span-2 py-[14px] uppercase w-full bg-black text-white text-[17px] lg:text-[20px] text-center hover:bg-yayyuYellow hover:text-white hover:font-semibold ease-in duration-300 cursor-pointer"
              />
            </div>
          </CustomFormik>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
