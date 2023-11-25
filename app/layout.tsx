"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Userbar from "@/sections/Userbar";
import { usePathname } from "next/navigation";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import AppProvider from "./AppProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const specialPaths = [
    "/auth/welcome",
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/reset-password",
  ];
  const pathName = usePathname();
  const isSpecial = specialPaths.includes(pathName);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <AppProvider>
            {!isSpecial && <Userbar />}
            {children}
          </AppProvider>
        </Provider>
      </body>
    </html>
  );
}
