"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import DefaultAvatar from "@/assets/img/user/defaut_avatar.webp";
import { PiChatCenteredDotsFill, PiPasswordFill } from "react-icons/pi";
import { IoSettings, IoLogOut } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { BsPersonFillDash, BsDatabaseFillDash } from "react-icons/bs";
import { CgDarkMode } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "@/redux/slices/apps";
import { RootState } from "@/redux/store";

function Userbar() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.app.isDarkMode);
  const [isVisitSettingButton, setIsVisitSettingButton] =
    useState<boolean>(false);
  const settingMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutSideMenu = (event: MouseEvent) => {
      if (
        settingMenuRef.current &&
        !settingMenuRef.current.contains(event.target as Node)
      ) {
        setIsVisitSettingButton(false);
      }
    };
    document.addEventListener("click", handleClickOutSideMenu);
    return (): void => {
      document.removeEventListener("click", handleClickOutSideMenu);
    };
  });

  const handleSetDarkMode = () => {
    dispatch(toggleDarkMode());
   document.documentElement.classList.toggle('dark');
  };

  return (
    <>
      <aside className="fixed w-[280px] left-0 z-10 h-screen select-none bg-slate-50 dark:bg-[#1f2c43]">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col">
            <div className="h-[80px] flex items-center justify-center">
              <h1 className="text-black dark:text-white text-[26px] font-bold">
                Chat<span className="text-primaryOrange">Fashion</span>
              </h1>
            </div>
            <div className="h-fit flex flex-col items-center justify-center gap-[10px] py-[40px]">
              <div className="w-fit h-fit rounded-[50%] overflow-hidden border-4 border-primaryBlack dark:border-primaryOrange">
                <Image
                  src={DefaultAvatar}
                  alt="user-default-avt"
                  width={1200}
                  height={800}
                  className="w-[100px] h-[100px] object-cover"
                ></Image>
              </div>
              <h1 className="text-[16px] font-semibold dark:text-white">email@gmail.com</h1>

              <button className="flex flex-row items-center gap-[8px] text-white dark:text-white py-[8px] px-[12px] rounded-[20px] rounded-tl-[0px] bg-primaryBlack dark:bg-primaryOrange dark:shadow-primaryOrangeShadow dark:font-semibold shadow-primaryBlackShadow mt-[20px] hover:scale-105 transition">
                <PiChatCenteredDotsFill />
                New chat
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center mb-[20px] relative">
            <div
              className="w-[90%] bg-slate-100 hover:bg-slate-200 transition cursor-pointer py-[14px] px-[18px] rounded-[10px] flex flex-row items-center gap-[14px] text-primaryBlack dark:text-white dark:bg-[#002046] dark:hover:bg-[#001835]"
              onClick={() => setIsVisitSettingButton(!isVisitSettingButton)}
            >
              <IoSettings className="text-[32px] dark:text-primaryOrange" />
              <h1 className="text-[18px] font-semibold">Settings</h1>
            </div>

            {isVisitSettingButton && (
              <div
                className="absolute w-full h-fit py-[10px] bottom-[64px] animate-fade flex flex-col items-center justify-center rounded-lg gap-[6px]"
                ref={settingMenuRef}
              >
                <button className="w-[90%] bg-slate-100 hover:bg-slate-200 transition cursor-pointer py-[14px] px-[18px] rounded-[10px] flex flex-row items-center gap-[14px] dark:bg-[#002046] dark:text-white dark:hover:bg-[#001835]">
                  <BsDatabaseFillDash className="text-[24px] dark:text-primaryOrange" />
                  Clear all data
                </button>
                <button className="w-[90%] bg-slate-100 hover:bg-slate-200 transition cursor-pointer py-[14px] px-[18px] rounded-[10px] flex flex-row items-center gap-[14px] dark:bg-[#002046] dark:text-white dark:hover:bg-[#001835]">
                  <PiPasswordFill className="text-[24px] dark:text-primaryOrange" />
                  Change password
                </button>
                <button className="w-[90%] bg-slate-100 hover:bg-slate-200 transition cursor-pointer py-[14px] px-[18px] rounded-[10px] flex flex-row items-center gap-[14px] dark:bg-[#002046] dark:text-white dark:hover:bg-[#001835]">
                  <MdEmail className="text-[24px] dark:text-primaryOrange" />
                  Change email
                </button>
                <button className="w-[90%] bg-slate-100 hover:bg-slate-200 transition cursor-pointer py-[14px] px-[18px] rounded-[10px] flex flex-row items-center gap-[14px] dark:bg-[#002046] dark:text-white dark:hover:bg-[#001835]">
                  <BsPersonFillDash className="text-[24px] dark:text-primaryOrange" />
                  Delete accounts
                </button>
                <button className="w-[90%] bg-slate-100 hover:bg-slate-200 transition cursor-pointer py-[14px] px-[18px] rounded-[10px] flex flex-row items-center gap-[14px] dark:bg-[#002046] dark:text-white dark:hover:bg-[#001835]" onClick={() => handleSetDarkMode()}>
                  <CgDarkMode className="text-[24px] dark:text-primaryOrange" />
                  {isDarkMode ? "Light" : "Dark"} mode
                </button>
                <button className="w-[90%] bg-slate-100 hover:bg-slate-200 transition cursor-pointer py-[14px] px-[18px] rounded-[10px] flex flex-row items-center gap-[14px] dark:bg-[#002046] dark:text-white dark:hover:bg-[#001835]">
                  <IoLogOut className="text-[24px] dark:text-primaryOrange" />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

export default Userbar;
