"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/openai");
        const data = await res.json();
        setResponse(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <div>{response ? JSON.stringify(response) : "Loading..."}</div>
  );
}