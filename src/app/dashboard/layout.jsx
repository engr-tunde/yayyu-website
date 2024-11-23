import { Inter, DM_Sans } from "next/font/google";
import "../globals.css";
import NavBar from "@/components/globals/NavBar";
import Footer from "@/components/globals/Footer";
import AppProvider from "@/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardSideBar from "@/components/globals/DashboardSideBar";

const dm_sans = DM_Sans({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: `%s | ${process.env.APP_NAME} - Affordable store for your lifestyle collections`,
    default: process.env.APP_NAME,
  },
  description: "Buy your affordable wears at Yayyu lifestyle",
  author: ["Tunde Mudashir - Jaflah Software Developmnt Company LTD"],
  metadataBase: new URL("https://yayyu.com/"),
};

export default function RootLayout({ children }) {
  return (
    <div className="h-screen container pt-[100px] pb-10 flex lg:gap-8">
      <div className="hidden lg:flex w-1/4 bg-[#F6F9FA] border-[1.5px] border-[#e9e9e9]">
        <DashboardSideBar />
      </div>
      <div className="w-full lg:w-3/4 bg-[#F6F9FA]">{children}</div>
    </div>
  );
}
