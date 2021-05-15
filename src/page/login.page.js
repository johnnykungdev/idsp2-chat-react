import React, { useState } from "react";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeHandler = (newValue, name) => {
        if (name === "email") {
            return setEmail(newValue);
        } else if (name === "password") {
            return setPassword(newValue);
        }
        return
    }

    const submitHandler = (e) => {
        e.preventDefault();
        fetch("http://localhost:8000/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
            credentials: "include"
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            props.setUser(data);
            props.setPage("chats")
        })
        .catch(error => console.log(error));
    }

    return (
        <div>
            <form onSubmit={(e) => submitHandler(e)}>
                <input placeholder="email" onChange={(e) => onChangeHandler(e.target.value, "email")} />
                <input placeholder="password" onChange={(e) => onChangeHandler(e.target.value, "password")}/>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Login;