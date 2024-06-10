import mariadb from "mariadb";
import { DBconnection } from "./config";

const dbConfig = DBconnection();
const pool = mariadb.createPool(dbConfig);

async function updateSolved(boardId: string, solve: number) {
  try {
    const connection = await pool.getConnection();

    const query = "UPDATE board SET solve=? WHERE id = ?";
    await connection.query(query, [solve, boardId]);

    connection.release();
    return { message: "해결 상태가 성공적으로 수정되었습니다." };
  } catch (error) {
    throw error;
  }
}
export { updateSolved };
