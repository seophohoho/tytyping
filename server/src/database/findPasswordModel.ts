import nodemailer from "nodemailer";
import mariadb from "mariadb";
import { DBconnection } from "./config"; // DB 연결 정보 가져오기

// SMTP 설정
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "gmltn1052@gmail.com",
    pass: "xjxs pafx ryzw pslw",
  },
});

// MariaDB 연결 풀 생성
const pool = mariadb.createPool(DBconnection());

// 인증 코드 전송 함수
export async function sendVerificationCode(username: string, email: string) {
  let conn;
  try {
    conn = await pool.getConnection();
    const query = "SELECT * FROM account WHERE username = ? AND email = ?";
    const rows = await conn.query(query, [username, email]);

    if (rows.length === 0) {
      throw new Error("입력한 정보와 일치하는 사용자가 없습니다.");
    }

    // 인증 코드 생성
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    // 인증 코드를 이메일로 전송
    const mailOptions = {
      from: "gmltn1052@gmail.com",
      to: email,
      subject: "비밀번호 재설정을 위한 인증코드 발송",
      text: `안녕하세요, ${username}님!\n\n비밀번호 재설정을 위한 인증코드는 다음과 같습니다.\n\n인증코드: ${code}\n\n이 인증코드를 사용하여 비밀번호를 재설정해주세요.\n\n감사합니다.`,
    };

    await transporter.sendMail(mailOptions);

    console.log("이메일로 인증코드를 성공적으로 전송했습니다.");

    // 인증 코드를 DB에 저장 (auth 테이블 사용)
    const insertQuery =
      "INSERT INTO auth (email, code) VALUES (?, ?) ON DUPLICATE KEY UPDATE code = ?";
    await conn.query(insertQuery, [email, code, code]);
  } catch (error) {
    console.error("Error during sending verification code:", error);
    throw new Error("이메일 전송에 실패했습니다.");
  } finally {
    if (conn) conn.release();
  }
}

// 인증 코드 검증 함수
export async function verifyCode(
  username: string,
  email: string,
  code: string
) {
  let conn;
  try {
    conn = await pool.getConnection();
    const query = "SELECT * FROM auth WHERE email = ? AND code = ?";
    const rows = await conn.query(query, [email, code]);

    if (rows.length === 0) {
      return false; // 인증 코드 불일치
    }

    // 인증 코드 일치
    return true;
  } catch (error) {
    console.error("Error during verifying code:", error);
    throw new Error("코드 검증에 실패했습니다.");
  } finally {
    if (conn) conn.release();
  }
}
