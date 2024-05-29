import express from "express";
import cors from "cors";
import userInfoRoute from "./src/routes/userInfoRoute";
import signInRoute from "./src/routes/signInRoute";
import signUpRoute from "./src/routes/signUpRoute";
import findUsernameRoute from "./src/routes/findUsernameRoute";
import socketio, { Socket } from "socket.io";
import { createServer } from "http";
import { Queue } from "queue-typescript";

const app = express();
const PORT = 8000;

const server = createServer(app);
const ioServer = new socketio.Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const rootRoom = ioServer.of("/");
const readyRoom = ioServer.of("/ready-room");
const gameRoom = ioServer.of("/game-room");

app.use(express.json());
app.use(cors());
app.use("/userinfo", userInfoRoute);
app.use("/api/sign-up", signUpRoute);
app.use("/api/sign-in", signInRoute);
app.use("/api/find-username", findUsernameRoute);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);
app.use("/userinfo", userInfoRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  setInterval(() => {
    if (matchingUsers.length % 2 === 0 && matchingUsers.length !== 0) {
      const targetA = matchingUsers.shift() as Data | undefined;
      const targetB = matchingUsers.shift() as Data | undefined;
      console.log(targetA);
      console.log(targetB);
      if (targetA && targetB) {
        rootRoom.to(targetA.socketId).emit("match-success", targetB);
        rootRoom.to(targetB.socketId).emit("match-success", targetA);
      }
    }
  }, 2000);
});

interface Data {
  nickname: string;
  socketId: string;
}

const allUsers: Record<string, Data> = {};
const matchingUsers: Array<Record<string, Data>> = [];
// const matchingUsers: Queue<Data>= new Queue<Data>();

rootRoom.on("connection", (socket) => {
  socket.on("connect-main", (data: Data) => {
    allUsers[socket.id] = {
      nickname: data.nickname,
      socketId: socket.id,
    };
  });

  socket.on("disconnect", (data: any) => {
    //delete targetUser in matchingUsers.
    const index = matchingUsers.findIndex(
      (user) => user.socketId === data.user.socketId
    );
    if (index !== -1) {
      matchingUsers.splice(index, 1);
    }

    //delete targetUser in battlingUsers;
    //<--나중에 추가하자.

    delete allUsers[socket.id];
  });

  socket.on("start-matching", (data) => {
    matchingUsers.push({ socketId: data.socketId, nickname: data.nickname });
  });

  socket.on("cancel-matching", (data) => {
    const index = matchingUsers.findIndex(
      (user) => user.socketId === data.socketId
    );
    if (index !== -1) {
      matchingUsers.splice(index, 1);
    }
  });

  socket.on("cancel-matching-ready", (data) => {
    rootRoom.to(data.user.socketId).emit("matching-ready-quiet", true);
    const index = matchingUsers.findIndex(
      (user) => user.socketId === data.user.socketId
    );
    if (index !== -1) {
      matchingUsers.splice(index, 1);
    }
  });

  socket.on("matching-ready", (data: any) => {
    rootRoom.to(data.user.socketId).emit("matching-ready-state", data.state);
  });
});
