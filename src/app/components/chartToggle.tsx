"use client";
import { useState } from "react";
import { togglePropsBody } from "../types/page";

const ChartToggle: React.FC<togglePropsBody> = ({ toggleValue, onToggle }) => {
  const toggleChartMode = () => {
    onToggle(!toggleValue);
  };
  return (
    <>
      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-medium">
          Chart Mode: {toggleValue ? "ON" : "OFF"}
        </span>
        <button
          onClick={toggleChartMode}
          className={`w-14 h-8 flex items-center rounded-full p-1 duration-300 ${
            toggleValue ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          <div
            className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${
              toggleValue ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </>
  );
};

export default ChartToggle;
