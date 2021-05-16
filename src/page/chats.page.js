import React, { useEffect, useState } from "react";

import BottomNavbar from "../component/bottomNavbar/bottomNavbar";

import styles from "./chats.module.css";

import ChatThumbnail from "../component/chatsThumbnail/chatThumbnail";
//stubdata
import url from "../util/backendUrl";

function Chats(props) {
    const [chats, setChats] = useState([]);
    const setPage = props.setPage;

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

        // setChats(stubdata.chats);
    }, [])

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