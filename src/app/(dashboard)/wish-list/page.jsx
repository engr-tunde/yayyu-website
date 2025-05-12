"use client";
import WishListCard from "@/components/dashboard/WishListCard";
import { useAppContext } from "@/context";
import { successNotification } from "@/lib/helpers";
import Link from "next/link";
import { useCallback, useState, useEffect } from "react";
import ExpiredStorage from "expired-storage";

const WishListPage = () => {
  const expiredStorage = new ExpiredStorage();
  const { itemsInWishList, setItemsInWishList } = useAppContext();
  const [wishListUpdated, setwishListUpdated] = useState(false);
  const forceUpdate = useCallback(() => setwishListUpdated({}), []);

  const handleRemoveWishListItem = (item) => {
    let currentItems = expiredStorage.getItem("wishList");
    currentItems = JSON.parse(currentItems);

    const otherItemsInList = currentItems.filter(
      (it) => it.item_id !== item.item_id
    );

    let updatedItems = JSON.stringify(otherItemsInList);
    expiredStorage.setItem("wishList", updatedItems);
    setItemsInWishList(updatedItems);
    forceUpdate();
    window.location.reload();
    successNotification(
      `1 ${item.item_name} ${item.size} removed from wishlist`
    );
  };

  useEffect(() => {
    // code
  }, [wishListUpdated, itemsInWishList]);

  return (
    <div className="w-full h-full py-6 overflow-y-scroll">
      <h1 className="px-6 text-xl font-medium mb-2">
        Your Wish List ({itemsInWishList ? itemsInWishList.length : "0"})
      </h1>
      {itemsInWishList && itemsInWishList?.length ? (
        <div className="px-2 lg:px-6 flex flex-col gap-4">
          {itemsInWishList &&
            itemsInWishList?.map((item, i) => (
              <WishListCard
                item={item}
                key={i}
                handleRemoveWishListItem={handleRemoveWishListItem}
              />
            ))}
        </div>
      ) : (
        <div className="h-full w-full -mt-10 flex flex-col justify-center items-center gap-7">
          <img src="/icons/no-wishlist.svg" alt="" />
          <p className="text-md">Your Wish List is empty.</p>
          <Link href="/shop" className="dark-btn py-3 px-10 uppercase">
            Continue shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default WishListPage;
