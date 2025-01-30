"use client";

import { fetchUserOrders } from "@/api";
import OrderCard from "@/components/dashboard/OrderCard";
import { ordersData } from "@/lib/data";
import Link from "next/link";
import React from "react";

const OrdersPage = () => {
  // const data = ordersData;
  const { orders, ordersLoading, ordersError } = fetchUserOrders();
  return (
    <div className="w-full h-full py-6 overflow-y-scroll">
      <h1 className="px-6 text-xl font-medium mb-2">
        Your Orders ({orders ? orders.length : "0"})
      </h1>
      {orders && orders?.length ? (
        <div className="px-6 flex flex-col gap-4">
          {orders &&
            orders?.map((item, i) => <OrderCard item={item} key={i} />)}
        </div>
      ) : (
        <div className="h-full w-full -mt-10 flex flex-col justify-center items-center gap-7">
          <img src="/icons/no-order.svg" alt="" />
          <p className="text-md">You haven&apos;t placed any orders yet.</p>
          <Link href="/shop" className="dark-btn py-3 px-10 uppercase">
            Continue shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
