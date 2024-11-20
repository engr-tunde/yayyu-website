import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/globals/NavBar";
import Footer from "@/components/globals/Footer";
import AppProvider from "@/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <html lang="en">
      <body className={dm_sans.className}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <AppProvider>
          <NavBar />
          {children}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
