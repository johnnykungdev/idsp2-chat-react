import React, { useEffect, useState } from "react";

//components
import ChatHistory from "../containers/chatHistory/chatHistory";
import ChatInput from "../component/chatInput/chatInput";
//socket
import socket from "../util/socketIO.util";
//style
import styles from "./chat.module.css";
//backend url
import url from "../util/backendUrl";

function Chatroom(props) {
    // const [conversationId, setConversationId] = useState(null);
    const conversationId = props.conversationId;
    const setConversationId = props.setConversationId;

    useEffect(() => {
        console.log(socket);
        if (!conversationId) {
            console.log("your target is ", props.target);
            console.log("--- fetching ----")
            fetch(`${url}/api/conversation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: props.user.userId,
                    target: props.target //[arrays that contain userIds]
                }),
                credentials: "include"
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setConversationId(data);
                console.log("socket connection", socket.connected);
                socket.emit("enter chatroom", {
                    conversationId: data
                })
            })
            .catch(error => console.log(error))
        } 
        else {
            console.log("socket io join room : ", conversationId);
            socket.emit("enter chatroom", {
                conversationId
            })
        }
    }, []);

    useEffect(() => {
        return () => {
            console.log("is leaving chatroom, conversationId: ", conversationId);
            console.log("socket.connection", socket.connected);
            if (conversationId) {
                console.log("emit leave room");
                socket.emit("leaveChatroom", conversationId);
            }
        }
    });

    const backToChats = (e) => {
        e.preventDefault();
        props.setConversationId(null);
        props.setPage("chats");
    }
    
    return (
        <div className={styles.roompage}>
            <nav className={styles.nav}>
                <button onClick={(e) => backToChats(e)}>Back to chats</button>
            </nav>
            <ChatHistory 
                user={props.user} 
                target={props.target} 
                conversationId={conversationId} />
            <ChatInput 
                user={props.user} 
                target={props.target} 
                conversationId={conversationId} />
        </div>
    )
}

export default Chatroom;