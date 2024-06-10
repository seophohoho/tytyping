import mariadb from "mariadb";
import { DBconnection } from "./config";

const dbConfig = DBconnection();
const pool = mariadb.createPool(dbConfig);

async function updateBoard(
  boardId: string,
  updateData: { title: string; content: string }
) {
  try {
    const connection = await pool.getConnection();

    const query = "UPDATE board SET title = ?, content = ? WHERE id = ?";
    await connection.query(query, [
      updateData.title,
      updateData.content,
      boardId,
    ]);

    connection.release();
    return { message: "게시글이 성공적으로 수정되었습니다." };
  } catch (error) {
    throw error;
  }
}
export { updateBoard };
