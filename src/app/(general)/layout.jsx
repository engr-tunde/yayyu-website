import "../globals.css";
import NavBar from "@/components/globals/NavBar";
import Footer from "@/components/globals/Footer";

import dynamic from "next/dynamic";

export const metadata = {
  title: {
    template: `%s | ${process.env.APP_NAME} - Affordable store for your lifestyle collections`,
    default: process.env.APP_NAME,
  },
  description: "Buy your affordable wears at Yayyu lifestyle",
  author: ["Tunde Mudashir - Jaflah Software Developmnt Company LTD"],
  metadataBase: new URL("https://yayyu.com/"),
};

export default function GeneralLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
