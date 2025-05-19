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

export interface myPropsBody{
    convid:string
}