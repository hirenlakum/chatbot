"use client";

import { useEffect } from "react";

import { useState } from "react";

import ChatPage from "./components/chat";

import { v4 as uuidv4 } from "uuid";

export default function Chat(req: Request) {
  const [cid, setCid] = useState("");

  useEffect(() => {
    const id = uuidv4();
    setCid(id);
  }, []);

  return (
    <>
      <ChatPage key={cid} convid={cid} />
    </>
  );
}
