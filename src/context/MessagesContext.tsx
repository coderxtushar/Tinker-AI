import { createContext, ReactNode } from "react";

export interface Message {
    role: string;
    content: ReactNode;
    id: string;
    text: string;
    // Add other message properties as needed
}

export interface MessagesContextType {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export const MessagesContext = createContext<MessagesContextType>({
    messages: [],
    setMessages: () => {},
});