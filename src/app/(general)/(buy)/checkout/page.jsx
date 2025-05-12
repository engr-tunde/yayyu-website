"use client";

import {
  fetchDiscountData,
  fetchShippingData,
  fetchUserDataIfAvailable,
  makeOrder,
} from "@/api";
import CheckoutItems from "@/components/checkout/CheckoutItems";
import CheckoutPaymentMethodCard from "@/components/checkout/CheckoutPaymentMethodCard";
import CheckoutTotalCard from "@/components/checkout/CheckoutTotalCard";
import ErrorWidget from "@/components/globals/ErrorWidget";
import Loader from "@/components/globals/Loader";
import { useAppContext } from "@/context";
import {
  errorNotification,
  formatter,
  successNotification,
} from "@/lib/helpers";
import { validateMakeOrder } from "@/lib/utils/validate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInputField from "@/components/globals/form/FormInputField";
import FormSelectField from "@/components/globals/form/FormSelectField";
import { countryList, stateList } from "@/lib/data";
import FormSubmitButton from "@/components/globals/form/FormSubmitButton";

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

  const [data, setdata] = useState();
  const { user, userLoading, userError } = fetchUserDataIfAvailable();
  console.log("user", user);
  useEffect(() => {
    if (user) {
      setdata(user);
    }
  }, [user]);

  const setShippingData = (item) => {
    setShipping(item);
    successNotification(`Deliverying to ${item.location}`);
  };

  const validate = validateMakeOrder(countryList, stateList);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validate),
  });

  const onSubmit = handleSubmit(async (values) => {
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
  });

  return (
    <div className="pt-[70px] ">
      <div className="container px-5 lg:px-0">
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="col-span-1 lg:pe-9 lg:border-r-[1.5px] border-[#DEDEDE] py-20">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold">Contact</h1>
                {!data ? (
                  <Link href="/login" className="text-md">
                    Login
                  </Link>
                ) : null}
              </div>

              <div className="py-2">
                <div className="grid grid-cols-2 gap-y-4 gap-x-3">
                  <FormInputField
                    name="email"
                    placeholder="Email"
                    defaultValue={data?.email}
                    register={register}
                    error={errors?.email}
                    full={true}
                  />
                  <FormInputField
                    name="phone"
                    placeholder="Phone"
                    defaultValue={data?.phone}
                    register={register}
                    error={errors?.phone}
                    full={true}
                  />

                  <div className="col-span-2 w-full flex items-center gap-[10px]">
                    <input
                      id="sign_up"
                      type="checkbox"
                      className="border rounded-md p-3 h-5 w-5"
                    />
                    <label
                      htmlFor="sign_up"
                      className="text-xs text-[#636060] font-semibold"
                    >
                      Sign up for order updates, exclusive offers and news on
                      WhatsApp and/or Email
                    </label>
                  </div>

                  <div className="col-span-2 mt-8 mb-2">
                    <h1 className="text-xl font-semibold">Delivery</h1>
                  </div>
                  <FormSelectField
                    label="Country"
                    name="country"
                    defaultValue={data?.country}
                    register={register}
                    error={errors?.country}
                    options={countryList}
                    selected={data?.country}
                    full={true}
                  />
                  <FormInputField
                    name="first_name"
                    placeholder="First Name"
                    defaultValue={data?.first_name}
                    register={register}
                    error={errors?.first_name}
                  />
                  <FormInputField
                    name="last_name"
                    placeholder="Last Name"
                    defaultValue={data?.last_name}
                    register={register}
                    error={errors?.last_name}
                  />
                  <FormInputField
                    name="address"
                    placeholder="Address"
                    defaultValue={data?.address}
                    register={register}
                    error={errors?.address}
                    full={true}
                  />
                  <FormInputField
                    name="apartment"
                    placeholder="Apartment"
                    defaultValue={data?.apartment}
                    register={register}
                    error={errors?.apartment}
                    full={true}
                  />
                  <FormInputField
                    name="city"
                    placeholder="City"
                    defaultValue={data?.city}
                    register={register}
                    error={errors?.city}
                    full={true}
                  />
                  <FormSelectField
                    label="Select State"
                    name="state"
                    defaultValue={data?.state}
                    register={register}
                    error={errors?.state}
                    options={stateList}
                    selected={data?.state}
                  />
                  <FormInputField
                    name="postal_code"
                    placeholder="Postal Code"
                    defaultValue={data?.postal_code}
                    register={register}
                    error={errors?.postal_code}
                  />

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
                              ? "cursor-pointer w-full border-[7px] border-[#242424] py-1 px-3 flex justify-between items-center"
                              : "cursor-pointer w-full border-[2px] border-[#dedede] py-1 px-3 flex justify-between items-center"
                          }
                        >
                          <div className="flex gap-3 lg:gap-5 items-center">
                            <div className="h-[18px] w-[18px] border-black border-[5px] rounded-full"></div>
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

                  <FormSubmitButton
                    title="Pay Desktop"
                    className="hidden lg:block mt-5 col-span-2 py-[14px] uppercase w-full bg-black text-white text-[17px] lg:text-[20px] text-center hover:bg-yayyuYellow hover:text-white hover:font-semibold ease-in duration-300 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-1 lg:ps-12 pb-20 lg:pt-20">
              <CheckoutItems groupedBy={groupedBy} />

              <div>
                <div className="mt-9 mb-9 flex justify-between">
                  <div className="w-[70%]">
                    <FormInputField
                      name="coupon"
                      placeholder="Discount code"
                      defaultValue={data?.coupon}
                      register={register}
                      error={errors?.coupon}
                    />
                  </div>
                  <div className="w-[28%] transparent-btn py-3">Apply</div>
                </div>
              </div>

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

              <div className="lg:hidden col-span-2 mt-8 mb-2">
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

              <FormSubmitButton
                title="Pay Mobile"
                className="lg:hidden mt-5 col-span-2 py-[14px] uppercase w-full bg-black text-white text-[17px] lg:text-[20px] text-center hover:bg-yayyuYellow hover:text-white hover:font-semibold ease-in duration-300 cursor-pointer"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
