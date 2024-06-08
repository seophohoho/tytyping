import express from "express";
import cors from "cors";
import userInfoRoute from "./src/routes/userInfoRoute";
import signInRoute from "./src/routes/signInRoute";
import signUpRoute from "./src/routes/signUpRoute";
import findUsernameRoute from "./src/routes/findUsernameRoute";
import findPasswordRoute from "./src/routes/findPasswordRoute";
import resetPasswordRoute from "./src/routes/resetPasswordRoute";
import boardRoute from "./src/routes/boardRoute";
import socketio, { Socket } from "socket.io";
import { createServer } from "http";
import { Queue } from "queue-typescript";
import { match } from "assert";

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

app.use(express.json());
app.use(cors());
app.use("/userinfo", userInfoRoute);
app.use("/api/sign-up", signUpRoute);
app.use("/api/sign-in", signInRoute);
app.use("/api/forgot-username", findUsernameRoute);
app.use("/api/forgot-password", findPasswordRoute);
app.use("/api/reset-password", resetPasswordRoute);
app.use("/board", boardRoute);
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
      const targetA = matchingUsers.shift() as string;
      const targetB = matchingUsers.shift() as string;
      if (targetA && targetB) {
        if (allUsers[targetA].state === "matching") {
          allUsers[targetA].state = "waiting_0";
          rootRoom.to(targetA).emit("matching_success", allUsers[targetB]);
        }
        if (allUsers[targetB].state === "matching") {
          allUsers[targetB].state = "waiting_0";
          rootRoom.to(targetB).emit("matching_success", allUsers[targetA]);
        }
      }
    }
  }, 2000);
});

interface UserData {
  nickname: string;
  socketId: string;
  state: string;
}

interface GameRoomData {
  currentWord: string;
  inputWord: string;
  inputWordState: number;
  userA: string;
  userB: string;
}

const allUsers: Record<string, UserData> = {};
const matchingUsers: Array<string> = [];
const gameRoom: Record<string, GameRoomData> = {};

function printUsers(type: number) {
  if (type === 0) {
    console.log(allUsers);
  } else if (type === 1) {
    console.log(matchingUsers);
  }
}

rootRoom.on("connection", (socket) => {
  socket.on("connect-main", (data: any) => {
    allUsers[socket.id] = {
      nickname: data["userInfo"].nickname,
      socketId: socket.id,
      state: "none",
    };
  });

  socket.on("matching_start", (data) => {
    if (allUsers[data.socketId].state === "none") {
      allUsers[data.socketId].state = "matching";
      matchingUsers.push(data.socketId);
    }
  });

  socket.on("matching_cancel", (data) => {
    const idx = matchingUsers.indexOf(data.socketId);
    if (idx !== -1) {
      matchingUsers.splice(idx, 1);
      allUsers[data.socketId].state = "none";
    }
  });

  socket.on("waiting_my_state", (data: any) => {
    if (allUsers[socket.id].state === "waiting_0") {
      allUsers[socket.id].state = "waiting_1";

      rootRoom
        .to(data.userInfo.socketId)
        .emit("waiting_target_state", data.state);
    }

    if (
      allUsers[socket.id].state === "waiting_1" &&
      allUsers[data.userInfo.socketId].state === "waiting_1"
    ) {
      allUsers[socket.id].state = "ingame";
      allUsers[data.userInfo.socketId].state = "ingame";
      rootRoom.to(data.userInfo.socketId).emit("game_start", true);
      rootRoom.to(socket.id).emit("game_start", true);
    }
  });

  socket.on("waiting_my_cancel", (data: any) => {
    allUsers[socket.id].state = "none";
    allUsers[data.userInfo.socketId].state = "none";
    rootRoom.to(data.userInfo.socketId).emit("waiting_target_cancel", true);
  });

  socket.on("disconnect", (data: any) => {
    delete allUsers[socket.id];
  });
});
