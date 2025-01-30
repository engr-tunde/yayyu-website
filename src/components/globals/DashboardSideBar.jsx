"use client";
import { fetchUser } from "@/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { errorNotification, successNotification } from "@/lib/helpers";
axios.defaults.withCredentials = true;

const DashboardSideBar = () => {
  const pathname = window.location.pathname.split("/")[1];
  const [activeLink, setActiveLink] = useState(pathname);
  const router = useRouter();
  const { user, userLoading, userError } = fetchUser();

  if (userError) {
    errorNotification("Please login to continue to your dashboard!");
    setTimeout(() => router.push("/login"), 1000);
  }

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  const handleLogout = async () => {
    const response = await axios.post(
      `${process.env.API_ENDPOINT}/user-auth/logout`,
      null,
      {
        withCredentials: true,
      }
    );
    console.log(response);
    try {
      if (response.status === 200) {
        const data = response.data;
        successNotification(data.message);
        setTimeout(() => window.location.replace("/login"), 500);
      } else {
        errorNotification(response?.data?.error);
      }
    } catch (error) {
      errorNotification(error?.response?.data?.error);
    }
  };

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
          onClick={() => onUpdateActiveLink("orders")}
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
          onClick={() => onUpdateActiveLink("wish-list")}
        >
          <img src="/icons/like.svg" alt="" className="w-[18px]" />
          <span>Wish List</span>
        </Link>
        <Link
          href=""
          className={
            activeLink === "inbox"
              ? "dashboard-active dashboard-menu-link"
              : "dashboard-menu-link"
          }
          onClick={() => onUpdateActiveLink("inbox")}
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
          onClick={() => onUpdateActiveLink("edit-account")}
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
          onClick={() => onUpdateActiveLink("edit-password")}
        >
          <img src="/icons/edit-password.svg" alt="" className="w-[18px]" />
          <span>Edit Password</span>
        </Link>
      </div>

      <div onClick={handleLogout} className="dark-btn w-full py-3">
        Logout
      </div>
    </div>
  );
};

export default DashboardSideBar;
