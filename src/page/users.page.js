import React, { useEffect, useState } from "react";

import BottomNavbar from "../component/bottomNavbar/bottomNavbar";

import styles from "./userpage.module.css";

import socket from "../util/socketIO.util";

import GrpModal from "../component/grpModal/grpModal";

function UsersPage(props) {
    const [userList, setUserList] = useState([]);
    const [grpModal, setGrpModal] = useState(false);

    useEffect(() => {
        console.log(socket);
        socket.emit("activeUsers");
    }, [])

    useEffect(() => {
        socket.on("activeUsers", (users) => {
            console.log(users)
            setUserList(users);
        })

        // return () => socket.off("activeUsers");
    }, [])

    const selectUserAndChat = (userId) => {
        props.setTarget([userId]);
        props.setPage("chatroom");
    }

    const userDivs = userList.map(user => {
        if (user.userId === props.user.userId) {
            return (
                <div className={styles.selfContainer}>
                    {user.username}(yourself);
                </div>
            )
        } else {
            return (
                <div className={styles.userContainer}>
                    <div className={styles.userName}>{user.username}</div>
                    <div className={styles.messageButton} onClick={() => selectUserAndChat(user.userId)}>Message</div>
                </div>
            )
        }
    })

    return (
        <div className={styles.UsersPage}>
            {
                grpModal?
                <GrpModal users={userList} userId={props.user.userId} setTarget={props.setTarget} setPage={props.setPage}/> : null
            }
            <h2>Users <button onClick={() => setGrpModal(!grpModal)}>add group chat</button></h2>
            <div className={styles.usersContainer}>
                {userDivs}
            </div>
            <BottomNavbar setPage={props.setPage}/>
        </div>
    )
}

export default UsersPage;