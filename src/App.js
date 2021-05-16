import './App.css';
import { useState, useEffect } from "react";
import Chats from "./page/chats.page";
import Chatroom from "./page/chatroom.page";
import Login from "./page/login.page";
import UsersPage from './page/users.page';

import socket from "./util/socketIO.util";
//backend url
import url from "./util/backendUrl";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");
  const [target, setTarget] = useState(null);
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    //authentication
    fetch("${url}/api/user/authenticate", {
      credentials: "include"
    })
    .then(resp => resp.json())
    .then(data => {
      if (!data.message) {
        console.log(data);
        setUser(data);
        setPage("chats");
      } 
    })
    .catch(error => console.log(error));
  }, [])

  useEffect(() => {
    if (user) {
      console.log("--- connect socket in APP ---");
      socket.connect();
      console.log(socket);
    }

    return () => {
      console.log("--- socket disconnected");
      socket.disconnect()
    };
  }, [user])

  let renderedComponent;

  if (!user || page === "login") {
    renderedComponent = <Login setUser={setUser} setPage={setPage} />
  } else if (page === "chats" && user.userId) {
    renderedComponent = <Chats 
      setPage={setPage} 
      setTarget={setTarget} 
      user={user}  
      setConversationId={setConversationId} />
  } else if (page === "chatroom") {
    renderedComponent = <Chatroom 
      setPage={setPage}
      user={user} 
      target={target} 
      conversationId={conversationId}
      setConversationId={setConversationId}
    />
  } else if (page === "users") {
    renderedComponent = <UsersPage 
      user={user} 
      target={target} 
      setTarget={setTarget} 
      setPage={setPage} 
    />
  }

  return (
    <div className="App">
      {renderedComponent}
    </div>
  )
}

export default App;
