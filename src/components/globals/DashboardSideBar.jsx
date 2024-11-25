"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DashboardSideBar = () => {
  const [activeLink, setActiveLink] = useState("orders");
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <Link
          href="/orders"
          className={
            activeLink === "orders" || activeLink === "dashboard"
              ? "dashboard-active dashboard-menu-link"
              : "dashboard-menu-link"
          }
        >
          <img src="/icons/order.svg" alt="" className="w-[18px]" />{" "}
          <span>Orders</span>
        </Link>
        <Link
          href="/wish-list"
          className={
            activeLink === "wish-list"
              ? "dashboard-active dashboard-menu-link"
              : "dashboard-menu-link"
          }
        >
          <img src="/icons/like.svg" alt="" className="w-[18px]" />
          <span>Wish List</span>
        </Link>
        <Link
          href="/inbox"
          className={
            activeLink === "inbox"
              ? "dashboard-active dashboard-menu-link"
              : "dashboard-menu-link"
          }
        >
          <img src="/icons/inbox.svg" alt="" className="w-[18px]" />
          <span>Inbox</span>
        </Link>
        <Link
          href="/edit-account"
          className={
            activeLink === "edit-account"
              ? "dashboard-active dashboard-menu-link"
              : "dashboard-menu-link"
          }
        >
          <img src="/icons/edit-account.svg" alt="" className="w-[18px]" />
          <span>Edit Account</span>
        </Link>
        <Link
          href="/edit-password"
          className={
            activeLink === "edit-password"
              ? "dashboard-active dashboard-menu-link"
              : "dashboard-menu-link"
          }
        >
          <img src="/icons/edit-password.svg" alt="" className="w-[18px]" />
          <span>Edit Password</span>
        </Link>
      </div>

      <div
        onClick={() => router.push("/login")}
        className="dark-btn w-full py-3"
      >
        Logout
      </div>
    </div>
  );
};

export default DashboardSideBar;
