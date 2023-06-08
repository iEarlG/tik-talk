"use client";

import { useState, useRef, useEffect } from "react";
import { find } from "lodash";
import axios from "axios";

import { pusherClient } from "@/app/libs/pusher";
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

    useEffect(() => {
     pusherClient.subscribe(conversationId);
     mssgBottom?.current?.scrollIntoView();

     const messageHandler = (message: FullMessageType) => {
        axios.post(`/api/conversations/${conversationId}/seen`)

        setMessages((current) => {
            if (find(current, { id: message.id })) {
                return current;
            }
            return [...current, message];
        });

        mssgBottom?.current?.scrollIntoView();
     };

     const updatedMessageHandler = (newMessage: FullMessageType) => {
        setMessages((current) => current.map((currentMessage) => {
            if (currentMessage.id === newMessage.id) {
                return newMessage;
            }

            return currentMessage
        }));
     };

     pusherClient.bind("messages:new", messageHandler);
     pusherClient.bind("message:update", updatedMessageHandler);
     
     return () => {
        pusherClient.unsubscribe(conversationId);
        pusherClient.unbind("messages:new", messageHandler);

        pusherClient.unbind("message:update", updatedMessageHandler);
     }
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