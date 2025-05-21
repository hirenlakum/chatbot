"use client";
import { MarkDownPropsBody } from "../types/page";
import React from "react";
import ReactMarkDown from "react-markdown"

const MarkDown:React.FC<MarkDownPropsBody> = ({content}) =>{
    return(
        <>
        <div className="prose prose-invert max-w-none text-white">
<ReactMarkDown>
    {content}
</ReactMarkDown>
        </div>

        </>
    )
}

export default MarkDown