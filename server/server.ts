import express from "express";
import cors from "cors";
import userInfoRoute from "./src/routes/userInfoRoute";
import socketio from "socket.io";
import { createServer } from "http";

const app = express();
const PORT = 8000;

const server = createServer(app);
const ioServer = new socketio.Server(server,{
  cors:{
    origin: '*',
    methods:["GET","POST"]
  }
});
const gameSocket = ioServer.of('/game');

app.use(express.json());
app.use(cors({
  origin: "*",
  methods:["GET","POST"]
}));
app.use("/userinfo", userInfoRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

gameSocket.on('connection',(socket)=>{
  console.log(socket.id);
  socket.on('disconnect',()=>{
    console.log('disconnect '+socket.id);
  })
});