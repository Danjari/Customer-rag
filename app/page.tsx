"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    hello();
  }, []);
  async function hello() {
    const response = await fetch("/api/hello").then((res) => res.json());
    console.log("response :", response);
  }
  return (
    <div>Hello World</div>
  );
}
