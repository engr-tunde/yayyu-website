import OrderCard from "@/components/dashboard/OrderCard";
import { ordersData } from "@/lib/data";
import React from "react";

const OrdersPage = () => {
  const data = ordersData;
  return (
    <div className="w-full py-6">
      <h1 className="px-6 text-xl font-medium mb-2">
        Your Orders ({data ? data.length : "0"})
      </h1>
      <div className="px-6 flex flex-col gap-4">
        {data && data.map((item, i) => <OrderCard item={item} key={i} />)}
      </div>
    </div>
  );
};

export default OrdersPage;
