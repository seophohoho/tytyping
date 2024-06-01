import express from "express";
import { resetPasswordController } from "../controllers/resetPasswordController";

const router = express.Router();

// 비밀번호 리셋 요청 처리
router.post("/", resetPasswordController);

export default router;
