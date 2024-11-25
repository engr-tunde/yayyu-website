import "../globals.css";
import NavBar from "@/components/globals/NavBar";
import Footer from "@/components/globals/Footer";
import DashboardSideBar from "@/components/globals/DashboardSideBar";

export const metadata = {
  title: {
    template: `%s | ${process.env.APP_NAME} - Affordable store for your lifestyle collections`,
    default: "Dashboard",
  },
  description: "Buy your affordable wears at Yayyu lifestyle",
  author: ["Tunde Mudashir - Jaflah Software Developmnt Company LTD"],
  metadataBase: new URL("https://yayyu.com/"),
};

export default function DashboardLayout({ children }) {
  return (
    <>
      <NavBar />
      <div className="bg-[#f5f5f5] h-screen pt-[100px] pb-10">
        <div className="h-full container flex lg:gap-8 ">
          <div className="hidden lg:flex w-1/4 bg-[#fff] border-[1.5px] border-[#e9e9e9]">
            <DashboardSideBar />
          </div>
          <div className="w-full lg:w-3/4 bg-[#fff]">{children}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
