"use client";
import { useState } from "react";
import { chatHistoryBody } from "../types/page";
import { useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const History_Side_Bar = () => {
  const [history, setHistory] = useState<chatHistoryBody[]>();
  useEffect(() => {
    const fetch_user_chat_history = async () => {
      const res = await axios.get("/api/user_chat_history");
      setHistory(res.data?.history?.conversations);
    };

    fetch_user_chat_history();
  }, []);

  return (
    <>
      <div className="w-[300px] bg-gray-900  h-screen overflow-y-auto px-3 py-4 custom-scrollbar">
        <h1 className="text-gray-100 text-lg font-bold mb-4 border-b border-gray-700 pb-2 text-center">
          Chat History
        </h1>
      
          {history?.map((value: any) => {
            return (
                <div className="space-y-2" key={value.id}>
                  <Link
                className="text-gray-200 block text-[15px] font-medium hover:bg-gray-800 cursor-pointer p-2 rounded-md"
                href={`/c/${value.conid}`}
              >
                {value?.messages[0]?.content}
              </Link>
                   </div>
            );
          })}
       
      </div>
    </>
  );
};

export default History_Side_Bar;

