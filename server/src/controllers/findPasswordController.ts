import { Request, Response } from "express";
import {
  sendVerificationCode,
  verifyCode,
} from "../database/findPasswordModel";

// 인증 코드 전송 컨트롤러
export const sendVerificationCodeController = async (
  req: Request,
  res: Response
) => {
  const { username, email } = req.body;
  try {
    await sendVerificationCode(username, email);
    return res
      .status(200)
      .json({ message: "인증 코드가 이메일로 전송되었습니다." });
  } catch (error: any) {
    console.error("Error during sending verification code:", error);
    return res
      .status(500)
      .json({ message: "서버 오류가 발생했습니다.", error: error.message });
  }
};

// 인증 코드 검증 컨트롤러
export const verifyCodeController = async (req: Request, res: Response) => {
  const { username, email, code } = req.body;
  try {
    const isValid = await verifyCode(username, email, code);
    if (isValid) {
      return res.status(200).json({
        message: "인증 코드가 일치합니다. 비밀번호 초기화 페이지로 이동합니다.",
      });
    } else {
      return res
        .status(400)
        .json({ message: "인증 코드가 일치하지 않습니다." });
    }
  } catch (error: any) {
    console.error("Error during verifying code:", error);
    return res
      .status(500)
      .json({ message: "서버 오류가 발생했습니다.", error: error.message });
  }
};
