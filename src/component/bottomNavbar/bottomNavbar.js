import React from "react";

import styles from "./bottomNavbar.module.css";

function bottomNavbar(props) {
    return (
        <div className={styles.bottomNavbar}>
            <div className={styles.navOption} onClick={() => props.setPage("users")}>Users</div>
            <div className={styles.navOption} onClick={() => props.setPage("chats")}>Chats</div>
        </div>
    )
}

export default bottomNavbar;