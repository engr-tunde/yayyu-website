"use client";

import ExpiredStorage from "expired-storage";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const expiredStorage = new ExpiredStorage();
  const ISSERVER = typeof window === "undefined";
  const getCartItems = () => {
    if (!ISSERVER) {
      let cart = expiredStorage.getItem("cart");
      if (cart == null || cart == undefined || cart?.length < 5) {
        cart = new Array();
        let updatedItems = JSON.stringify(cart);
        expiredStorage.setItem("cart", updatedItems, 36000);
        return cart;
      } else {
        cart = JSON.parse(cart);
        return cart;
      }
    }
  };
  const getWishListItems = () => {
    if (!ISSERVER) {
      let wishList = expiredStorage.getItem("wishList");
      if (wishList == null || wishList == undefined || wishList?.length < 5) {
        wishList = new Array();
        let updatedItems = JSON.stringify(wishList);
        expiredStorage.setItem("wishList", updatedItems);
        return wishList;
      } else {
        wishList = JSON.parse(wishList);
        return wishList;
      }
    }
  };

  const [itemsInCart, setItemsInCart] = useState(getCartItems);
  const [itemsInWishList, setItemsInWishList] = useState(getWishListItems);

  useEffect(() => {
    let item = JSON.stringify(itemsInCart);
    expiredStorage.setItem("cart", item, 36000);

    let wishList = JSON.stringify(itemsInWishList);
    expiredStorage.setItem("wishList", wishList);
  }, [itemsInCart, itemsInWishList]);

  return (
    <AppContext.Provider
      value={{
        itemsInCart,
        setItemsInCart,
        itemsInWishList,
        setItemsInWishList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppProvider;
