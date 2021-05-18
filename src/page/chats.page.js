import React, { useEffect, useState } from "react";

import BottomNavbar from "../component/bottomNavbar/bottomNavbar";

import styles from "./chats.module.css";

import ChatThumbnail from "../component/chatsThumbnail/chatThumbnail";
//stubdata
import url from "../util/backendUrl";
//socket
import socket from "../util/socketIO.util";

function Chats(props) {
    const [chats, setChats] = useState([]);
    const setPage = props.setPage;
    console.log(chats);

    useEffect(() => {
        fetch(`${url}/api/conversation`, {
            credentials: "include"
        })
        .then(resp => resp.json())
        .then(data => {
            console.log("conversations", data)
            setChats(data);
        })
        .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        console.log(chats);
        socket.on("updateChats", (latestConversations) => {
            // console.log("coming in new Message", newMessage);
            // console.log(chats);
            // const clonedChats = [...chats];
            // console.log(clonedChats);
            // const changedConversationIndex = clonedChats.findIndex(chat => chat.conversationId === newMessage.conversationId);
            // console.log(changedConversationIndex);
            // clonedChats[changedConversationIndex].messages = [newMessage];
            setChats(latestConversations);
        })

        return () => socket.off("updateChats");
    }, [chats])

    let chatThumbnails;
    if (chats.length) {
        chatThumbnails = chats.map(chat => 
            <ChatThumbnail 
                setPage={props.setPage}
                setTarget={props.setTarget}
                key={chat.conversationId}
                conversationId={chat.conversationId}
                members={chat.members}
                latestMessage={chat.messages[0]}
                setConversationId={props.setConversationId} />);
    }

    return (
        <div className={styles.chats}>
            {chatThumbnails}
            <BottomNavbar setPage={props.setPage}/>
        </div>
    )
}

export default Chats;