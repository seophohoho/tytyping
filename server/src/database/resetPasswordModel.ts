import mariadb from "mariadb";
import bcrypt from "bcryptjs";
import { DBconnection } from "./config"; // DB 연결 정보 가져오기

const pool = mariadb.createPool(DBconnection());

export async function resetPassword(email: string, newPassword: string) {
  let conn;
  try {
    conn = await pool.getConnection();

    // 이메일이 존재하는지 확인
    const checkQuery = "SELECT * FROM account WHERE LOWER(email) = LOWER(?)";
    const checkRows = await conn.query(checkQuery, [email]);
    console.log("checkRows:", checkRows); // 쿼리 결과 출력

    if (checkRows.length === 0) {
      throw new Error("해당 이메일을 가진 사용자가 없습니다.");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const query =
      "UPDATE account SET password = ? WHERE LOWER(email) = LOWER(?)";
    const result = await conn.query(query, [hashedPassword, email]);
    console.log("update result:", result); // 업데이트 결과 출력

    if (result.affectedRows === 0) {
      throw new Error(
        "비밀번호를 업데이트할 수 없습니다. 이메일을 확인해주세요."
      );
    }

    return true;
  } catch (error) {
    console.error("Error during password reset:", error);
    throw new Error("비밀번호 업데이트에 실패했습니다.");
  } finally {
    if (conn) conn.release();
  }
}
