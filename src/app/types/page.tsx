export interface UserBody{
    userName:string,
    password:number
}


export interface eachChatBody{
    id:string,
    content:string,
    responce:string
}

export interface converSationBody{
    id:string,
    userId:string
}


interface messageBody{
    content:string,
    responce:string,
    id:string
}

export interface chatHistoryBody{
    id:string,
    userId:string,
    messages:messageBody[]
}

export  interface each_chat_body{
    content:string,
    responce:string,
    id:string,
    conversationId:string
}

export interface chatBody{
    id:string,
    content:string,
    responce:string
}

export interface MarkDownPropsBody{
    content:string
}

export interface partBody{
    type:string,
    text:string
}
export interface chatBodyProps{
    id:string,
    content:string,
    responce:string
    role:"system" | "user" | "assistant" | "data"
}

export interface myPropsBody{
    convid:string,
    chat:chatBodyProps[]|undefined,
   
}

export interface chartBodyProps{
   
    chartSelect:string,
    Chdata:{
    
 type:"bar" | "line" | "pie" | "doughnut",
      data: {
  
    labels: string[],
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string | string[];
      borderColor?:string,
      borderWidth?:number,
      tension?:number

    }[];
  };
    }
     
}

export interface togglePropsBody{
  toggleValue:boolean,
  onToggle:(data:any)=>void
}