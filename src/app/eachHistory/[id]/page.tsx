"use client";
import { useParams } from "next/navigation";
import axios from "axios"
import { useEffect } from "react";
import { useState } from "react";
import { eachChatBody } from "@/app/types/page";
import { useChat } from "@ai-sdk/react";
import { chatHistoryBody } from "@/app/types/page";
import Link from "next/link"


const EachHistory = () => {

    const {id} = useParams()
    console.log(id)

    const [data,setData] = useState<eachChatBody>()
    const [chatData,setChatData] = useState([])

    const fetchChatHistory = async () => {
       const res=  await axios.get(`/api/eachChat/${id}`)
       console.log(res.data)
       setData(res.data.chat)
    }


    const userAllHistory =  async() => {
const res= await axios.get("/api/each_user_chat")
 console.log(res.data.history)
 setChatData(res.data.history)
    }
    useEffect(()=>{
fetchChatHistory()
userAllHistory()
    },[])

    const {messages,input,handleInputChange,handleSubmit} = useChat()

    
    return(
        <>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">

  <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 flex flex-col space-y-6">
  <h1 className="text-center text-xl">AI Chatbot</h1>
    <div className="flex space-x-6">

      <div className="flex-1 overflow-auto max-h-[500px] bg-gray-50 p-4 rounded-lg">
        <div className="space-y-4">
    
             User:
     <div  className="text-left">
    
            <div  className="bg-blue-500 text-white p-3 rounded-lg inline-block">
              {data?.content}
            </div>
          </div> 
        assistant:
       <div  className="text-left">
          
            <div  className="bg-gray-300 text-gray-800 p-3 rounded-lg inline-block">
      {data?.responce}
            </div>
          </div>
         {messages.map(message => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === 'user' ? 'User: ' : 'assistant: '}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                return message.role==='user'?  <div key={message.id} className="text-left">
            <div  className="bg-blue-500 text-white p-3 rounded-lg inline-block">
               {part.text}
            </div>
          </div>  : 
          <div key={message.id} className="text-left">
            <div  className="bg-gray-300 text-gray-800 p-3 rounded-lg inline-block">
              {part.text}
            </div>
          </div>
            }
          })}
        </div>
      ))}
        </div>
      </div>
      
    
      <div className="w-1/3 bg-gray-200 p-4 rounded-lg max-h-[500px] overflow-y-auto">
        <h3 className="font-semibold text-lg text-gray-700 mb-4">Chat History</h3>
   
        <div className="space-y-3">
         {
          chatData.map((chat:chatHistoryBody)=>{
            return  <div key={chat.id} className="bg-gray-100 p-2 rounded-lg">
            <Link className="font-semibold" href={`/eachHistory/${chat.id}`}>{chat.content}</Link> 
          </div>
          })
         }
          
     
        </div>
      </div>
    </div>

  
    <form className="flex space-x-4" onSubmit={handleSubmit} >
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
    )
}

export default EachHistory