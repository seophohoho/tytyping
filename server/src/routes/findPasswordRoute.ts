import express from "express";
import {
  sendVerificationCodeController,
  verifyCodeController,
} from "../controllers/findPasswordController";

const router = express.Router();

// 인증 코드 전송 요청 처리
router.post("/send-code", sendVerificationCodeController);

// 인증 코드 검증 요청 처리
router.post("/verify-code", verifyCodeController);

export default router;
