import React from "react";

import styles from "./chatThumbnail.module.css";

function chatThumbnail(props) {
    console.log(props.members);

    const onClickHandler = (userId) => {
        console.log(userId);
        props.setPage("chatroom");
        if (!props.conversationId) {
            props.setTarget([userId]);
        } else {
            props.setConversationId(props.conversationId)
        }

        // props.setConversationId(chatThumbnail.conversation_id);
    }

    const numOfMembers = props.members.length;

    return (
        <div className={styles.chatThumbnail} onClick={() => onClickHandler(props.members[0].userId)}>
            <div className={styles.avatarContainer}>
                <img src={props.members[0].avatar} className={styles.avatar}/>
            </div>
            <div className={styles.messageContainer}>
                <p className={styles.username}>
                    {
                        numOfMembers > 1?
                        `Group Chat (${numOfMembers + 1})` :
                        props.members[0].username
                    }
                </p>
                <p className={styles.latestMessage}>{props.latestMessage? props.latestMessage.text: null}</p>
            </div>
        </div>
    )
}

export default chatThumbnail;