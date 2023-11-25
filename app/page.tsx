import MainChat from "@/sections/MainChat";
import Messages from "@/sections/Messages";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="w-[calc(100%-280px)] absolute right-0 bottom-0 h-screen bg-slate-200 flex flex-row">
        <Messages/>
        <MainChat/>
      </div>
    </>
  );
}
