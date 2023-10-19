"use client";
import React, { useState } from "react";
import SideBar from "@/components/sidebar";
import styles from "./dashboard.module.css";
import {
  TbLayoutSidebarRightExpand,
  TbLayoutSidebarLeftCollapse,
} from "react-icons/tb";
import { useAppSelector } from "@/redux/hooks";
import Cookies from "universal-cookie";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user = useAppSelector((state) => state?.user?.user);
  const cookie = new Cookies();

  const role = cookie.get("role");

  return (
    <div className="flex min-h-screen relative ">
      <SideBar isOpen={isOpen}></SideBar>
      {isOpen && (
        <div
          className={`hidden md:block min-w-[230px] delay-200 duration-500 transition-all ${isOpen ? "static" : "absolute top-20 left-[-999px] "
            }`}
        ></div>
      )}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`absolute text-red-500  z-[999] text-xl font-medium hover:text-red-500 ${isOpen ? " top-0 left-[220px] " : "left-20px"
          }`}
      >
        {isOpen ? (
          <TbLayoutSidebarRightExpand size={30}></TbLayoutSidebarRightExpand>
        ) : (
          <TbLayoutSidebarRightExpand
            className={`rotate-180`}
            size={30}
          ></TbLayoutSidebarRightExpand>
        )}
      </div>
      <div
        className={`${styles.dashBoardLayout} w-full p-7 duration-300 transition-all ease-in-out`}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
