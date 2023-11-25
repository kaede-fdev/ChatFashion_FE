'use client'
import React, { useEffect, useRef, useState } from "react";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { MdDeleteSweep } from "react-icons/md";
import { FaShareFromSquare } from "react-icons/fa6"

function MessageItem() {
  const [isClickThreeDot, setIsClickThreeDot] = useState<boolean>(false);
  const threedotsRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
        if(threedotsRef.current && !threedotsRef.current.contains(event.target as Node)) {
            setIsClickThreeDot(false);
        }
    };
    document.addEventListener('click', handleClickOutSide);
    return ():void => {
        document.removeEventListener('click', handleClickOutSide);
    }
  })

  return (
    <div className="w-full h-fit p-[10px] pb-0 relative">
      <div className="bg-white dark:bg-[#043875] h-fit rounded-md p-[16px] cursor-pointer dark:text-white">
        <div className="flex flex-row justify-between">
          <h2 className="font-bold">Chat 1</h2>
          <div
            onClick={() => {
              setIsClickThreeDot(!isClickThreeDot);
            }}
          >
            <PiDotsThreeOutlineFill />
          </div>
        </div>
        <p>Skin tone: Fair warm skin</p>
        <p>MBTI: INFP</p>
        {/* <div className="flex flex-row gap-[10px] overflow-x-scroll mt-[10px] scrollbar-hide cursor-pointer">
          <div>
            <Image
              src={
                "https://res.cloudinary.com/dy1uuo6ql/image/upload/v1700678572/Fashion/fk6idr03prkzuf3obi8q.jpg"
              }
              alt="clothes"
              width={1200}
              height={800}
              className="w-[60px] h-[60px] bg-slate-200 rounded-md object-cover"
            ></Image>
          </div>
        </div> */}
      </div>
      {
        isClickThreeDot && <div className="absolute top-[45px] right-[25px] w-fit flex flex-col font-semibold bg-slate-100 rounded-md overflow-hidden p-[8px] shadow-primaryShadow" ref={threedotsRef}>
            <button className="py-[6px] px-[8px] hover:bg-slate-200 text-start rounded-md flex flex-row items-center gap-2"> <MdDeleteSweep className="w-[20px] text-[20px]"/> Delete</button>
            <button className="py-[6px] px-[8px] hover:bg-slate-200 text-start rounded-md flex flex-row items-center gap-2"> <FaShareFromSquare className="w-[20px]"/> Share</button>
        </div> 
      }
    </div>
  );
}

export default MessageItem;
