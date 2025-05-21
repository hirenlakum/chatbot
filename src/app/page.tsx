import ChatPage from "./components/chat";
import BarChart from "./components/chartProvider";



import { v4 as uuidv4 } from "uuid";

export default function Chat(req: Request) {
  const id = uuidv4();

  return (
    <>
      <ChatPage key={id} convid={id} chat={[]}  />
     
    </>
  );
}
