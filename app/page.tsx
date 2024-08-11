"use client";
import Image from "next/image";
// import { useEffect } from "react";
import Chat from "../components/Chat";
import { UserButton } from "@clerk/nextjs";
import { useMediaQuery } from 'react-responsive';
export default function Home() {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  return (
    <main className={`flex flex-col ${isMobile ? 'h-[calc(100vh-20px)]' : 'h-screen'} bg-[#0b0f19] text-white`}>
      <nav className="flex justify-between items-center p-4 bg-[#040d17] border-b border-gray-800">
        <div className="flex items-center">
          <h1 className="ml-3 text-lg font-semibold text-gray-400">
            <span className="text-grey">DevBuddy</span>
          </h1>
        </div>
        <div className="flex items-center flex-grow justify-center">
        <h1 className="text-sm font-semibold text-grey ">
          
          Discuss Anything <span className="text-blue-400"> Interview Related</span>
        </h1>
        </div>
        <UserButton showName={!isMobile} />
      </nav>

      {/* Center the Chat component and apply a maximum width */}
      <div className="flex-grow flex justify-center">
        <div className="w-full max-w-4xl flex flex-col justify-between overflow-hidden">
        
          <Chat />
          
        </div>
      </div>
    </main>
  );
}

