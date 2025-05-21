"use client";
import { useChat } from "@ai-sdk/react";
import { myPropsBody } from "../types/page";
import React, { useState } from "react";
import History_Side_Bar from "./History_Side_Bar";
import MarkDown from "./markDownViewr";
import BarChart from "./chartProvider";
import ChartToggle from "./chartToggle";


const ChatPage: React.FC<myPropsBody> = ({ convid, chat }) => {
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: `/api/chat/${convid}`,
    initialMessages:
      chat?.flatMap((item) => ({
        id: item.id,
        role: item.role,
        content: item.content,
        parts: [
          {
            type: "text",
            text: item.role === "user" ? item.content : item.responce,
          },
        ],
      })) || undefined,
    onResponse: () => {
      window.history.replaceState({}, "", `/c/${convid}`);
    },
  });

  const [isToggle, setIsToggle] = useState(false);

  const handleToggle = (data: any) => {
    setIsToggle(data);
  };

  const detactJson = (text: string) => {
    const isdetectJsonData = text.match(/```json([\s\S]*?)```/);

    if (isdetectJsonData && isdetectJsonData[1]) {
      return isdetectJsonData[1];
    }
    return text;
  };

  const [chartSelections, setChartSelections] = useState<{
    [key: number]: string;
  }>({});

  
  const handleChartSelect = (index: number, value: string) => {
    setChartSelections((prev) => ({ ...prev, [index]: value }));
  };

  return (
    <>
      <div className="flex">
        <History_Side_Bar />

        <div className="flex flex-col h-screen  overflow-y-auto w-full bg-[#121212] custom-scrollbar text-white">
          <div className="bg-black text-white text-xl font-bold p-4 border-b border-gray-700 shadow-sm text-center">
            AI ChatBot
            <ChartToggle toggleValue={isToggle} onToggle={handleToggle} />
          </div>

          {messages.length === 0 && (
            <div className="text-center  text-gray-400 mt-[300px]">
              <h2 className="text-xl md:text-2xl font-medium">
                What can I help you with?
              </h2>
              <p className="text-sm md:text-base mt-2 text-gray-500">
                Ask anything — I'm here to assist you!
              </p>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scroll">
            <div className="space-y-4">
              {isToggle
                ? messages.map((message, index) => (
                    <div key={index} className="whitespace-pre-wrap flex-1">
                      {message.role === "user" ? (
                        <div className="text-right">User:</div>
                      ) : (
                        "assistant:"
                      )}

                      {message.parts.map((part, i) => {
                        switch (part.type) {
                          case "text":
                            let chartData = null;

                            try {
                              const jsonData = detactJson(part.text);
                              chartData = JSON.parse(jsonData);
                            } catch (error) {
                              chartData = null;
                            }

                            if (
                              chartData &&
                              chartData.type &&
                              Array.isArray(chartData.data?.labels) &&
                              Array.isArray(chartData.data.datasets)
                            ) {
                              console.log(
                                "yaha chart wale me condition true ho rahi he"
                              );
                             

                              return (
                                <>
                                  <form>
                                    <select
                                      className="bg-black"
                                      value={chartSelections[index] || ""}
                                      onChange={(e) =>
                                        handleChartSelect(index, e.target.value)
                                      }
                                    >
                                      <option value="">Select Chart</option>
                                      <option value="bar">Bar Chart</option>
                                      <option value="pie">Pie Chart</option>
                                      <option value="line">Line Chart</option>
                                      <option value="doughnut">Doughnut</option>
                                    </select>
                                  </form>

                                  <div key={i} className="w-[600px] h-[300px]">
                                    <BarChart
                                      chartSelect={chartSelections[index] || ""}
                                      key={i}
                                      Chdata={chartData}
                                    />
                                  </div>
                                </>
                              );
                            } else {
                              return message.role === "user" ? (
                                <div
                                  key={message.id}
                                  className="text-right mt-2  "
                                >
                                  <div className="bg-slate-700  text-white p-3 rounded-lg inline-block">
                                    {part.text}
                                  </div>
                                </div>
                              ) : (
                                <div
                                  key={message.id}
                                  className="text-left mt-2 w-[600px]"
                                >
                                  <div className=" bg-gray-800  self-start text-gray-200 p-3 rounded-lg inline-block">
                                    <MarkDown content={part.text}></MarkDown>
                                  </div>
                                </div>
                              );
                            }
                        }
                      })}
                    </div>
                  ))
                : messages.map((message, index) => (
                    <div key={index} className="whitespace-pre-wrap flex-1">
                      {message.role === "user" ? (
                        <div className="text-right">User:</div>
                      ) : (
                        "assistant:"
                      )}

                      {message.parts.map((part, i) => {
                        switch (part.type) {
                          case "text":
                            return message.role === "user" ? (
                              <div
                                key={message.id}
                                className="text-right mt-2  "
                              >
                                <div className="bg-slate-700  text-white p-3 rounded-lg inline-block">
                                  {part.text}
                                </div>
                              </div>
                            ) : (
                              <div
                                key={message.id}
                                className="text-left mt-2 w-[600px]"
                              >
                                <div className=" bg-gray-800  self-start text-gray-200 p-3 rounded-lg inline-block">
                                  <MarkDown content={part.text}></MarkDown>
                                </div>
                              </div>
                            );
                        }
                      })}
                    </div>
                  ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-4 bg-[#1e1e1e] border-t border-gray-700 flex items-center gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask something..."
              className="flex-1 px-4 py-2 rounded-full bg-[#2a2a2a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
