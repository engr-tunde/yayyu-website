"use client";

import CheckoutItems from "@/components/checkout/CheckoutItems";
import CheckoutPaymentMethodCard from "@/components/checkout/CheckoutPaymentMethodCard";
import CheckoutTotalCard from "@/components/checkout/CheckoutTotalCard";
import CheckBox from "@/components/globals/form/CheckBox";
import InputField from "@/components/globals/form/InputField";
import SelectCountryField from "@/components/globals/form/SelectCountryField";
import SelectStateField from "@/components/globals/form/SelectStateField";
import { useAppContext } from "@/context";
import { discountData, shippingData } from "@/lib/data";
import { formatter } from "@/lib/helpers";
import CustomFormik from "@/lib/utils/CustomFormik";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);

  const { itemsInCart } = useAppContext();

  console.log("itemsInCart", itemsInCart);

  let groupedBy = Object.groupBy(
    itemsInCart,
    (item) => `${item.item_name}-${item.size}-${item.color}`
  );
  groupedBy = Object.values(groupedBy);
  console.log("groupedBy itemsInCart", groupedBy);

  const calculateTotalFee = () => {
    let cartTotal = 0;
    let discount = 0;
    let subT = 0;
    let overAllTotal = 0;
    itemsInCart.forEach((ele) => {
      cartTotal += ele.new_price;
    });

    discount = (discountData.percent / 100) * cartTotal;
    subT = cartTotal - discount;
    setSubtotal(subT);

    setShipping(shippingData[0].amount);
    overAllTotal = subT + Number(shippingData[0].amount);
    setTotalPrice(overAllTotal);
  };

  useEffect(() => {
    calculateTotalFee();
  }, [itemsInCart]);

  const initialValues = {};
  const validationSchema = {};

  const handleSubmit = async (values) => {
    console.log(values);
  };
  return (
    <div className="pt-[70px] ">
      <div className="container px-5 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="col-span-1 lg:pe-9 lg:border-r-[1.5px] border-[#DEDEDE] py-20">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-semibold">Contact</h1>
              <Link href="/login" className="text-md">
                Login
              </Link>
            </div>

            <div className="py-2">
              <CustomFormik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
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

                  <div className="col-span-2 flex flex-col gap-1">
                    {shippingData.map((item, i) => (
                      <div
                        key={i}
                        className="w-full border-[2px] border-[#dedede] p-3 flex justify-between items-center"
                      >
                        <div className="flex gap-3 lg:gap-5 items-center">
                          <div className="h-[23px] w-[23px] border-black border-[5px] rounded-full"></div>
                          <span className="text-sm text-[#636060]">
                            Standard {item.location}
                          </span>
                        </div>
                        <div className="text-[16px]">
                          {formatter(item.amount)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <CheckoutPaymentMethodCard />

                  <div className="hidden lg:block mt-5 col-span-2 py-[14px] uppercase w-full bg-black text-white text-[17px] lg:text-[20px] text-center hover:bg-yayyuYellow hover:text-white hover:font-semibold ease-in duration-300 cursor-pointer">
                    Pay
                  </div>
                </div>
              </CustomFormik>
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

            <CheckoutTotalCard
              subtotal={subtotal}
              shipping={shipping}
              totalPrice={totalPrice}
            />

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

            <div className="lg:hidden mt-5 col-span-2 py-[14px] uppercase w-full bg-black text-white text-[17px] lg:text-[20px] text-center hover:bg-yayyuYellow hover:text-white hover:font-semibold ease-in duration-300 cursor-pointer">
              Pay
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
