'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { RiRestartFill } from "react-icons/ri";
import MessagesBox from '@/components/MessagesBox';
import ImageUploader from '@/components/ImageUploader';
import { useDispatch, useSelector } from 'react-redux';
import { setIsBotConverOneDone } from '@/redux/slices/boxchat';
import { RootState } from '@/redux/store';

function MainChat() {
    const [isClickThreeDot, setIsClickThreeDot] = useState<boolean>(false);
    const threedotRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch();
    useEffect(() => {
        const handleClickOutSide = (event: MouseEvent) => {
            if(threedotRef.current && !threedotRef.current.contains(event.target as Node)) {
                setIsClickThreeDot(false);
            }
        }
        document.addEventListener('click', handleClickOutSide);
        return ():void => {
            document.removeEventListener('click', handleClickOutSide);
        }
    })

    const messageContainerRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        if (messageContainerRef.current) {
          const { current: container } = messageContainerRef;
          container.scrollTop = container.scrollHeight;
        }
      };
    const conversationData = useSelector((state:RootState) => state.botchat.conversation);
    console.log(conversationData);

    useEffect(() => {
        scrollToBottom();
    }, [conversationData]); //messagehere
    
    const {isBotConverOneDone, isUpdatedImage} = useSelector((state: RootState) => state.botchat.chatControl)
    return (
        <div className='w-[calc(100%-420px)] h-screen bg-[#fff] dark:bg-[#043875] absolute right-0 bottom-0 select-none'>
            <div className='h-[80px] w-full bg-[#ffc543] dark:bg-primaryBlack flex flex-row justify-between p-[10px] items-center relative'>
                <div className='flex flex-row gap-[10px]'>
                    <div className='rounded-[50%] overflow-hidden'>
                        <Image src={"https://res.cloudinary.com/dy1uuo6ql/image/upload/v1700682138/iqrt3woldauo1h32hrzl.jpg"} alt='chat-bot-image' width={1200} height={800} className='w-[60px] h-[60px] object-cover'/>
                    </div>
                    <div className='flex flex-col justify-center text-primaryBlack dark:text-white'>
                        <h2 className='text-[18px] font-semibold'>ChatFashion</h2>
                        <p>Last response: 20:32</p>
                    </div>
                </div>
                <div className='w-[50px] h-[50px] rounded-xl flex items-center justify-center cursor-pointer hover:bg-primaryOrange transition'
                    onClick={() => {setIsClickThreeDot(!isClickThreeDot)}}
                >
                    <BsThreeDotsVertical className="text-[32px] text-white"/>
                </div>

                {
                    isClickThreeDot && <div className='absolute top-[40px] right-[80px] w-[200px] h-fit bg-slate-100 rounded-lg p-[10px] flex flex-col shadow-primaryShadow z-10' ref={threedotRef}>
                    <button className='text-start hover:bg-slate-200 px-[10px] py-[10px] font-semibold rounded-md flex flex-row items-center gap-[10px]'> <RiRestartFill className="text-[24px]"/> Restart</button>
                    <button className='text-start hover:bg-slate-200 px-[10px] py-[10px] font-semibold rounded-md flex flex-row items-center gap-[10px]'> <MdCancel className="text-[24px]"/> Cancel</button>
                </div>
                }
            </div>

            {/* chat */}
            <div className='p-[16px] h-[calc(100%-140px)] overflow-hidden overflow-y-auto flex flex-col gap-[10px]' ref={messageContainerRef}>
               {/* {messages.map((message, index) => (
                <div key={index}>{message}</div>
               ))} */}
               <MessagesBox 
                messages={["Welcome to ChatFashion!", " Hi, email@email.com", " First, let’s upload an image of yourself so we can get your skin tone", "Please upload your full face image for the best result!"]}
                time={1}
           
                />
              {
                isBotConverOneDone &&  
                <ImageUploader/>
              }
              {
                isUpdatedImage && <MessagesBox
                messages={["Double click on the area that best matches your skin tone!"]}
                time={2}
      
                />
              }
              
              
            </div>
            
           
        </div>
    )
}

export default MainChat
