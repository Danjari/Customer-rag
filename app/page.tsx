"use client";
import Image from "next/image";
import { useEffect } from "react";
import Chat from "../components/Chat";

export default function Home() {
  return (
    <main className="flex flex-col h-screen bg-[#0b0f19] text-white">
      <nav className="flex justify-between items-center p-4 bg-[#040d17] border-b border-gray-800">
        <div className="flex items-center">
          <Image src="/ai-avatar.png" alt="Codebender Logo" height={50} width={150} />

          <h1 className="ml-3 text-lg font-semibold text-gray-400">
            <span className="text-white">Codebender</span>
          </h1>
        </div>
        <h1 className="text-sm font-semibold">
          Talk to <span className="text-yellow-400">The Last Codebender</span>
        </h1>
      </nav>
      <div className="flex-grow flex flex-col justify-between overflow-hidden">
        <div className="flex-grow p-4 overflow-y-auto">
          <Chat />
        </div>
       
      </div>
    </main>
  );
}
