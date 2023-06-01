"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";

import { FullMessageType } from "@/app/types";
import useConversation from "@/app/hooks/useConversation";

import MessageBox from "./MessageBox";

interface BodyProps {
    initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({
    initialMessages
}) => {
    const [messages, setMessages] = useState(initialMessages);
    const mssgBottom = useRef<HTMLDivElement>(null);

    const { conversationId } = useConversation();

    useEffect(() => {
      axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId]);
    

    return ( 
        <div className="flex-1 overflow-y-auto">
            {messages.map((message, i) => (
                <MessageBox 
                    isLast={i === messages.length - 1}
                    key={message.id}
                    data={message}
                />
            ))}
            <div ref={mssgBottom} className="pt-24" />
        </div>
    );
}
 
export default Body;