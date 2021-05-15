import React, { useEffect, useState } from "react";
//socket.io
import socket from "../../util/socketIO.util"
//style
import styles from "./chatinput.module.css";

function ChatInput(props) {
    const [chatInput, setChatInput] = useState("");
    console.log("props.conversationId", props.conversationId);
    const inputChangeHandler = (event) => {
        const message = event.target.value;
        setChatInput(message);
    }

    const submitMessage = (event) => {
        //do some post request to the server
        event.preventDefault();
        if (!chatInput.length) return;
        console.log("send message to server, message: ", chatInput);
        console.log(socket);
        console.log("conversationId", props.conversationId);
        socket.emit('chat message', {
            userId: props.user.userId,
            conversationId: props.conversationId,
            text: chatInput
        });
        setChatInput("");
    }

    return (
        <div className={styles.chatInputBar}>
            <div className={styles.bar}>
                <input 
                    className={styles.chatInput}
                    placeholder="enter some message" 
                    value={chatInput} 
                    onChange={(e) => inputChangeHandler(e)}/>
                <button 
                    className={styles.submitButton}
                    onClick={(e) => submitMessage(e)}>
                    Submit
                </button>
            </div>
        </div>
    )
}

export default ChatInput;