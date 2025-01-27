import React, { useEffect, useRef } from "react";
import { useYoozekStore } from "../store/store";
import { useAssistantMessages } from "../hooks/useAssistantMessages";
import { IPCChannels } from "../../main/ipcHandlers/ipc-types";
import { MessageHistory, TextInput } from "../components";

const Chat: React.FC = () => {

    const messages = useYoozekStore(state => state.messages)
    const setMessage = useYoozekStore(state => state.setMessage)
    const messageListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTo({
                top: messageListRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [messages]);

    useAssistantMessages((message) =>
        setMessage(message)
    )

    const handleEnterPress = async (text: string) => {
        window.api.send(IPCChannels.SendUserMessage, { role: "user", text })
        setMessage({ role: "user", text })
    }

    return (
        <>
            <MessageHistory ref={messageListRef} messages={Object.values(messages)}/>
            <TextInput onEnterPress={handleEnterPress}/>
        </>
    );
}

export default Chat;