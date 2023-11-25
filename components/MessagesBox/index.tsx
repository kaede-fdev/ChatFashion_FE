'use client'
import React, { SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setConversation, setIsBotConverOneDone } from "@/redux/slices/boxchat";

type TProps = {
    messages: string[];
    time: number;
}

function MessagesBox({messages, time,}: TProps) {
  const [currentMessageIndex, setCurrenMessageIndex] = useState(0);
  const [needIndex, setNeedIndex] = useState(1); 

  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
        if(currentMessageIndex < messages.length -1) {
            setCurrenMessageIndex(prevIndex => prevIndex + 1);
            setNeedIndex(prevIndex => prevIndex + 1);
        } else clearInterval(interval);;
      }, 500);

    if(time == 1 && currentMessageIndex == messages.length -1 ) {
      dispatch(setIsBotConverOneDone(true));
    }    

    if(needIndex) {
      let chatData = {
        sender: 'chatbot',
        message: messages[needIndex-1]
      }
      dispatch(setConversation(chatData));

    }

    return ():void => {clearInterval(interval)
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMessageIndex, dispatch, messages.length, time])

  return (
    <div className="w-full h-fit flex flex-row gap-[10px]">
      <div>
        <div className="w-[50px] h-[50px] rounded-[50%] overflow-hidden">
          <Image
            src={
              "https://res.cloudinary.com/dy1uuo6ql/image/upload/v1700682138/iqrt3woldauo1h32hrzl.jpg"
            }
            alt="avatar"
            height={800}
            width={1200}
            className="w-[50px] h-[50px] object-cover"
          ></Image>
        </div>
      </div>
      <div className="flex flex-col gap-[2px]">
            {messages.slice(0, currentMessageIndex+1).map((item: string, index:number) => {
                return (
                    <p key={index} className={`bg-[#043875] dark:bg-slate-300 text-white dark:text-primaryBlack dark:font-semibold py-[10px] px-[14px] w-fit max-w-[800px] h-fit rounded-[26px] ${ messages.length == 1 ? "" : index == 0 ? "rounded-bl-[0px]" : index == messages.length-1 ? "rounded-tl-[0px]" : "rounded-l-[0px]" } animate-fade-up animate-duration-300`}>{item}</p>
                )
            })}
      </div>
    </div>
  );
}

export default MessagesBox;
