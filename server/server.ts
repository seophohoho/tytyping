import express from "express";
import cors from "cors";
import userInfoRoute from "./src/routes/userInfoRoute";
import signInRoute from "./src/routes/signInRoute";
import signUpRoute from "./src/routes/signUpRoute";
import findUsernameRoute from "./src/routes/findUsernameRoute";
import findPasswordRoute from "./src/routes/findPasswordRoute";
import resetPasswordRoute from "./src/routes/resetPasswordRoute";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

app.use("/userinfo", userInfoRoute);
app.use("/api/sign-up", signUpRoute);
app.use("/api/sign-in", signInRoute);
app.use("/api/forgot-username", findUsernameRoute);
app.use("/api/forgot-password", findPasswordRoute);
app.use("/api/reset-password", resetPasswordRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
