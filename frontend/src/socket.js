import { io } from "socket.io-client";

const socket = io("https://poll-webapp.onrender.com/");
export default socket;