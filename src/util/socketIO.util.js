import socketIO from "socket.io-client";

const socket = socketIO("http://idsp.link", { 
    withCredentials: true,
    autoConnect: false
});

export default socket;