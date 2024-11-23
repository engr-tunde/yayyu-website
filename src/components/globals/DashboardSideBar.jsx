import Link from "next/link";

const DashboardSideBar = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between py-8">
      <div className="flex flex-col">
        <Link href="/dashboard/orders" className="dashboard-menu-link">
          <img src="/icons/account.svg" alt="" className="w-[18px]" />{" "}
          <span>Account</span>
        </Link>
        <Link href="/dashboard/orders" className="dashboard-menu-link">
          <img src="/icons/account.svg" alt="" className="w-[18px]" />
          <span>Orders</span>
        </Link>
        <Link href="/dashboard/orders" className="dashboard-menu-link">
          <img src="/icons/account.svg" alt="" className="w-[18px]" />
          <span>Saved Items</span>
        </Link>
        <Link href="/dashboard/orders" className="dashboard-menu-link">
          <img src="/icons/account.svg" alt="" className="w-[18px]" />
          <span>Account Management</span>
        </Link>
        <Link href="/dashboard/orders" className="dashboard-menu-link">
          <img src="/icons/account.svg" alt="" className="w-[18px]" />
          <span>Delete Account</span>
        </Link>
      </div>

      <div className="dark-btn w-full py-3">Logout</div>
    </div>
  );
};

export default DashboardSideBar;
