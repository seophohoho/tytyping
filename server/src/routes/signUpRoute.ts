import express from "express";
import signupController from "../controllers/signUpController";

const router = express.Router();

router.post("/", signupController); // POST 요청을 signupController로 라우팅

export default router;
