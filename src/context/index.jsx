"use client";

import ExpiredStorage from "expired-storage";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const expiredStorage = new ExpiredStorage();

  const getCartItems = () => {
    if (typeof window !== undefined) {
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

  const [itemsInCart, setItemsInCart] = useState(getCartItems);

  useEffect(() => {
    let item = JSON.stringify(itemsInCart);
    expiredStorage.setItem("cart", item, 600);
  }, [itemsInCart, setItemsInCart]);

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
