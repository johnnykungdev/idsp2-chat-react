import React, { useEffect, useState } from "react";
//socket.io
import socket from "../../util/socketIO.util"
//styles
import styles from "./chatHistory.module.css";
//backend url
import url from "../../util/backendUrl";

function ChatHistory(props) {
    const [messages, setMessages] = useState([]);
    console.log("target", props.target);

    useEffect(() => {
        console.log("1");
        console.log(props.conversationId);

        if (props.conversationId) {
            fetch(`${url}/api/conversation/${props.conversationId}/message`, {
                credentials: "include"
            })
            .then(resp => resp.json())
            .then(data => {
                console.log("message", data.messages);
                setMessages(data.messages);
                // socket.connect();
            })
            .catch(error => console.log(error))
        }
    }, [props.conversationId])

    useEffect(() => {
        console.log("chat history socket", socket);
        socket.on("received", data => {
            console.log("received data", data.messages);
            setMessages(data.messages);
        })

        // return () => socket.disconnect();
    })

    console.log("messages", messages);

    const messageDivs = messages.map(message => {
        if (message.userId === props.user.userId) {
            return (
                <div  key={message.createdAt} className={styles.selfMsgContainer} className={styles.selfMsg}>{message.text}</div>
            );
        } else {
            return (
                <div key={message.createdAt} className={styles.othersMsg}>{message.text}</div>
            );
        }
    })
    console.log("chat history", messages);

    return (
        <div className={styles.messageContainer}>
            {messageDivs}
        </div>
    )
}

export default ChatHistory;