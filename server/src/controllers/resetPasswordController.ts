import { Request, Response } from "express";
import { resetPassword } from "../database/resetPasswordModel";

export const resetPasswordController = async (req: Request, res: Response) => {
  const { email, newPassword } = req.body;
  try {
    const success = await resetPassword(email, newPassword);
    return res
      .status(200)
      .json({ message: "비밀번호가 성공적으로 변경되었습니다." });
  } catch (error: any) {
    console.error("Error during password reset:", error);
    if (error.message === "해당 이메일을 가진 사용자가 없습니다.") {
      return res.status(404).json({ message: error.message });
    } else {
      return res.status(500).json({
        message: "비밀번호 변경에 실패했습니다.",
        error: error.message,
      });
    }
  }
};
