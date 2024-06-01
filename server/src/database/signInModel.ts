import mariadb from "mariadb";
import { DBconnection } from "./config";

const dbConfig = DBconnection();
const pool = mariadb.createPool(dbConfig);

async function getUserInfoByUsername(username: string) {
  try {
    const connection = await pool.getConnection();
    const query = `SELECT * FROM account WHERE username = ?`; // 수정: userinfo 대신 account 테이블로 변경
    const rows = await connection.query(query, [username]);
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error retrieving user info:", error);
    throw error;
  }
}

export { getUserInfoByUsername };
