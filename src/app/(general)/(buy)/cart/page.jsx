"use client";
import { useAppContext } from "@/context";
import { discountData, itemsData } from "@/lib/data";
import { formatter, shuffleArray, successNotification } from "@/lib/helpers";
import "core-js/actual";
import { useCallback, useEffect, useState } from "react";
import ExpiredStorage from "expired-storage";
import CartSummaryCard from "@/components/cart/CartSummaryCard";
import CartExplore from "@/components/cart/CartExplore";
import { fetchProducts } from "@/api";

const CartPage = () => {
  const expiredStorage = new ExpiredStorage();
  const [cartUpdated, setCartUpdated] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const forceUpdate = useCallback(() => setCartUpdated({}), []);

  const { itemsInCart, setItemsInCart } = useAppContext();
  const { products, productsLoading, productsError } = fetchProducts();
  const related_products = shuffleArray(products);

  console.log("itemsInCart", itemsInCart);

  let groupedBy = Object.groupBy(
    itemsInCart,
    (item) => `${item.item_name}-${item.size}-${item.color}`
  );
  groupedBy = Object.values(groupedBy);
  console.log("groupedBy itemsInCart", groupedBy);

  const handleAddMoreToCartSized = (item) => {
    console.log("item", item);
    let currentCart = expiredStorage.getItem("cart");
    currentCart = JSON.parse(currentCart);
    let itemToCart = {
      item_id: item.item_id,
      item_name: item.item_name,
      img: item.img,
      original_price: item.original_price,
      new_price: item.new_price,
      size: item.size,
      color: item.color,
    };
    currentCart.push(itemToCart);
    let updatedItems = JSON.stringify(currentCart);
    expiredStorage.setItem("cart", updatedItems, 36000);
    setItemsInCart(currentCart);
    forceUpdate();
    successNotification(`1 ${item.item_name} ${item.size} added to cart`);
  };

  const handleRemoveFromCartSized = (item) => {
    let currentCart = expiredStorage.getItem("cart");
    currentCart = JSON.parse(currentCart);

    const otherItemsInCart = currentCart.filter(
      (it) => it.item_id !== item.item_id
    );

    const thisProductInCart = currentCart.filter(
      (it) => it.item_id == item.item_id
    );

    let otherSizesOfThisItemsInCart = thisProductInCart.filter(
      (it) => it.size != item.size || it.color != item.color
    );

    let thisSizesOfThisItemsInCart = thisProductInCart.filter(
      (it) => it.size == item.size && it.color == item.color
    );

    thisSizesOfThisItemsInCart.pop();
    Array.prototype.push.apply(otherItemsInCart, otherSizesOfThisItemsInCart);
    if (thisSizesOfThisItemsInCart.length) {
      Array.prototype.push.apply(otherItemsInCart, thisSizesOfThisItemsInCart);
    }
    console.log("all items in cart", otherItemsInCart);

    let updatedItems = JSON.stringify(otherItemsInCart);
    expiredStorage.setItem("cart", updatedItems, 36000);
    setItemsInCart(otherItemsInCart);
    forceUpdate();
    successNotification(`1 ${item.item_name} ${item.size} removed from cart`);
  };

  const calculateTotalFee = () => {
    let total = 0;
    let discount = 0;
    let subT = 0;
    itemsInCart.forEach((ele) => {
      total += Number(ele.new_price);
    });
    console.log("total fee", total);
    setTotalPrice(total);

    discount = (discountData.percent / 100) * Number(total);
    setTotalDiscount(discount);

    subT = total - discount;
    setSubtotal(subT);
  };

  useEffect(() => {
    calculateTotalFee();
  }, [cartUpdated, itemsInCart, calculateTotalFee]);

  return (
    <div className="pt-[70px] relative bg-transparent">
      <div className="container pt-10 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-x-10 gap-y-12 lg:gap-y-0 relative">
          <div className="col-span-3 bg-[#F6F9Fa] p-5 lg:p-10">
            <h1 className="text-xl lg:text-xl uppercase mb-10 lg:mb-5">
              Cart ({itemsInCart.length})
            </h1>
            <div className="flex flex-col gap-8">
              {groupedBy.map((item, i) => {
                const sItem = item[0];
                return (
                  <div
                    key={i}
                    className="flex flex-col gap-[5px] lg:gap-2 w-full justify-between text-[#222] border-[#d7d7d7] border-b-[1.5px] pb-5 lg:pb-4"
                  >
                    <div className="flex justify-between text-sm">
                      <div className="flex gap-4">
                        <img
                          src={`${process.env.API_IMAGES}/products/${sItem.img}`}
                          alt=""
                          className="h-[70px] border-[1.5px] border-[#d7d7d7] px-[2px] rounded-md"
                        />

                        <div className="flex flex-col gap-[2px]">
                          <div className="text-[16px]">{sItem.item_name}</div>
                          <div className="text-[13px]">
                            Size:{" "}
                            <span className="text-[16px]">{sItem.size}</span>
                          </div>
                          <div className="text-[13px]">
                            Color:{" "}
                            <span className="text-[16px]">{sItem.color}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-[2px]">
                        <div className="font-semibold text-lg">
                          {formatter(sItem.new_price)}
                        </div>
                        <div className="text-lg text-[#aaa] line-through">
                          {formatter(sItem.original_price)}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span>Remove</span>
                      </div>
                      <div className="py-[5px] w-[33%] lg:w-[18%] flex gap-2 items-center justify-between text-xl">
                        <div
                          className="plus-btn"
                          onClick={() => handleRemoveFromCartSized(sItem)}
                        >
                          -
                        </div>
                        <span>{item.length}</span>
                        <div
                          className="plus-btn"
                          onClick={() => handleAddMoreToCartSized(sItem)}
                        >
                          +
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <CartSummaryCard
            itemsInCart={itemsInCart}
            totalPrice={totalPrice}
            discountData={discountData}
            totalDiscount={totalDiscount}
            subtotal={subtotal}
          />
        </div>

        <CartExplore related_products={related_products} />
      </div>
    </div>
  );
};

export default CartPage;
