import React, { useEffect, useState } from "react";

import styles from "./grpModal.module.css";

function GrpModal(props) {
    const [usersStatus, setUsersStatus] = useState([]);
    console.log(usersStatus);
    const currentUserId = props.userId;

    useEffect(() => {
        let userList = [];
        props.users.forEach(user => {
            if (user.userId !== currentUserId) {
                userList.push({
                    ...user,
                    check: false
                })
            }
        })
        setUsersStatus(userList);
    }, [props.users])

    const userSelectHandler = (userId) => {
        console.log("userId", userId);
        const clonedUserStatus = [...usersStatus];
        const indexOfSelectedUser = clonedUserStatus.findIndex(user => user.userId === userId);
        console.log("indeexofselectedUser", indexOfSelectedUser);
        clonedUserStatus[indexOfSelectedUser].check = !clonedUserStatus[indexOfSelectedUser].check;
        setUsersStatus(clonedUserStatus);
    }

    const inviteToChatRoom = () => {
        let targetList = [];
        usersStatus.forEach(user => {
            if (user.check) {
                targetList.push(user.userId);
            }
        });
        console.log(targetList);
        props.setTarget(targetList);
        props.setPage("chatroom");
    }

    let userOptions;
    if (usersStatus.length) {
        userOptions = usersStatus.map(user => {
            return (
                <div className={styles.userBar}>
                    <div>{user.username}</div>
                    <input 
                        type="checkbox" 
                        checked={user.check}
                        onChange={() => userSelectHandler(user.userId)}/>
                </div>
            )
        })
    }
    
    return (
        <>
            <div className={styles.modal}>
                <h3>Invite People</h3>
                <div className={styles.userOptionsContainer}>
                    {userOptions}
                </div>
                <div className={styles.buttonBar}>
                    <button className={styles.inviteButton} onClick={() => inviteToChatRoom()}>invite</button>
                </div>
            </div>
            <div className={styles.backdrop}></div>
        </>
    )
}

export default GrpModal;