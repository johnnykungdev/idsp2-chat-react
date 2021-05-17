import socketIO from "socket.io-client";

const socket = socketIO("http://localhost:8000", { 
    withCredentials: true,
    autoConnect: false
});

export default socket;