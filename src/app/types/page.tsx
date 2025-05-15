export interface UserBody{
    userName:string,
    password:number
}

export interface chatHistoryBody{
    content:string,
    id:string
}

export interface eachChatBody{
    id:string,
    content:string,
    responce:string
}