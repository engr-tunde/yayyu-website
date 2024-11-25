"use client";

import ExpiredStorage from "expired-storage";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const expiredStorage = new ExpiredStorage();
  const ISSERVER = typeof window === "undefined";

  console.log("type of window", typeof window);
  const getCartItems = () => {
    console.log("window", window);
    console.log("type of window", typeof window);
    if (!ISSERVER) {
      let cart = expiredStorage.getItem("cart");
      // let cart = window?.localStorage.getItem("cart");
      if (cart == null || cart == undefined || cart?.length < 5) {
        cart = new Array();
        let updatedItems = JSON.stringify(cart);
        // if (!ISSERVER) {
        expiredStorage.setItem("cart", updatedItems, 36000);
        // window?.localStorage.setItem("cart", updatedItems);
        console.log("cart", cart);
        return cart;
        // }
      } else {
        cart = JSON.parse(cart);
        console.log("cart", cart);
        return cart;
      }
    }
  };

  const [itemsInCart, setItemsInCart] = useState(getCartItems);

  useEffect(() => {
    let item = JSON.stringify(itemsInCart);
    expiredStorage.setItem("cart", item, 36000);
    // window?.localStorage.setItem("cart", item);
  }, [itemsInCart]);

  return (
    <AppContext.Provider
      value={{
        itemsInCart,
        setItemsInCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppProvider;
