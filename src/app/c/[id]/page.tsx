"use client";

import { useParams } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { chatBody } from "@/app/types/page";
import ChatPage from "@/app/components/chat";
import { chatBodyProps } from "@/app/types/page";


const Chat: React.FC<chatBodyProps> = () => {
  const { id } = useParams();

  console.log(id);

  const [chat, setChat] = useState<chatBodyProps[]>();

  useEffect(() => {
    const fetch_User_Chat = async () => {
      const res = await axios.get(`/api/each_history/${id}`);

      setChat(res.data?.each_chat?.messages);
    };

    fetch_User_Chat();
  }, []);

  return (
    <>
      <ChatPage chat={chat} convid={id as string}  />
    </>
  );
};

export default Chat;
