'use client'
import React, { useState } from "react";
import Image from "next/image";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import MessageItem from "@/components/MessageItem";

function Messages() {
  return (
    <div className="w-[420px] h-screen bg-primaryOrange dark:bg-[#011c3e] select-none">
      <div className="h-[80px] flex items-center p-[16px] flex-row justify-between">
        <h3 className="font-bold text-primaryBlack dark:text-primaryOrange">M E S S A G E S</h3>
      </div>
      <div className="w-full h-[calc(100%-100px)] flex flex-col overflow-y-scroll scrollbar-hide">
       <MessageItem/>
      </div>
    </div>
  );
}

export default Messages;
