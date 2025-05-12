import {
  Inter,
  DM_Sans,
  DM_Serif_Display,
  Baskervville,
} from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import dynamic from "next/dynamic";

const AppProvider = dynamic(() => import("@/context"), {
  ssr: false,
});

const dm_sans = DM_Sans({ subsets: ["latin"], variable: "--dm-sans" });
const dm_serif_display = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--dm-serif-display",
});
const baskervville = Baskervville({
  subsets: ["latin"],
  weight: "400",
  variable: "--baskervville",
});
const inter = Inter({
  subsets: ["latin"],
  weight: "400",
  variable: "--inter",
});

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
      <head>
        <link rel="shortcut icon" href="/images/logo.png" type="image/x-icon" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-navbutton-color" content="#ffffff" />
        <meta content="#ffffff" name="msapplication-navbutton-color" />
      </head>
      <body
        className={`${dm_sans.variable} ${dm_serif_display.variable} ${baskervville.variable} ${inter.variable}`}
      >
        <div className="narin">
          <AppProvider>
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
            {children}
          </AppProvider>
        </div>
      </body>
    </html>
  );
}
