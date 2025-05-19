"use client";

import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { chatBody } from "@/app/types/page";
import { chatHistoryBody } from "@/app/types/page";
import Link from "next/link";

const Chat = () => {
  const { id } = useParams();


  

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: `/api/chat/${id}`,
  });
  const [chat, setChat] = useState<chatBody[]>();
  const [history, setHistory] = useState<chatHistoryBody[]>();

  useEffect(() => {
    const fetch_User_Chat = async () => {
      const res = await axios.get(`/api/each_history/${id}`);
  
      setChat(res.data?.each_chat?.messages);
    };

    const fetch_user_chat_history = async () => {
      const res = await axios.get("/api/user_chat_history");
 
      setHistory(res.data?.history?.conversations);
    };

    fetch_User_Chat();
    fetch_user_chat_history();
  }, []);

  const filterData = history?.filter((value: any) => value.conid !== id);
  console.log(filterData);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 flex flex-col space-y-6">
          <h1 className="text-center text-xl">AI Chatbot</h1>
          <div className="flex space-x-6">
            <div className="flex-1 overflow-auto max-h-[500px] bg-gray-50 p-4 rounded-lg">
              {chat?.map((value: any, index) => {
                return (
                  <div key={index} className="whitespace-pre-wrap">
                    user:
                    <div className="text-left mb-3">
                      <div
                        key={value.id}
                        className="bg-blue-500 text-white p-3 rounded-lg inline-block"
                      >
                        {value.content}
                      </div>
                    </div>
                    assistant:
                    <div className="text-left mb-3">
                      <div
                        key={value.id}
                        className="bg-gray-300 text-gray-800 p-3 rounded-lg inline-block"
                      >
                        {value.responce}
                      </div>
                    </div>
                  </div>
                );
              })}

              {
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="whitespace-pre-wrap">
                      {message.role === "user" ? "User: " : "assistant: "}
                      {message.parts.map((part, i) => {
                        switch (part.type) {
                          case "text":
                            return message.role === "user" ? (
                              <div key={message.id} className="text-left">
                                <div className="bg-blue-500 text-white p-3 rounded-lg inline-block">
                                  {part.text}
                                </div>
                              </div>
                            ) : (
                              <div key={message.id} className="text-left">
                                <div className="bg-gray-300 text-gray-800 p-3 rounded-lg inline-block">
                                  {part.text}
                                </div>
                              </div>
                            );
                        }
                      })}
                    </div>
                  ))}
                </div>
              }
            </div>

            <div className="w-1/3 bg-gray-200 p-4 rounded-lg max-h-[500px] overflow-y-auto">
              <h3 className="font-semibold text-lg text-gray-700 mb-4">
                Chat History
              </h3>

              <div className="space-y-3">
                {filterData?.map((value: any) => {
                  return (
                    <div key={value.id} className="bg-gray-100 p-2 rounded-lg">
                      <Link
                        className="font-semibold"
                        href={`/c/${value.conid}`}
                      >
                        {value?.messages[0]?.content}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <form className="flex space-x-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={handleInputChange}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-lg focus:outline-none hover:bg-blue-600"
            >
              Send
            </button>
          </form>
        </div>
      </div>
   
    </>
  );
};

export default Chat;
