import mariadb from "mariadb";
import { DBconnection } from "./config";

const dbConfig = DBconnection();
const pool = mariadb.createPool(dbConfig);

async function deleteBoard(boardId: string) {
  try {
    const connection = await pool.getConnection();

    const query = "DELETE FROM board WHERE id = ?";
    await connection.query(query, [boardId]);

    connection.release();
    return;
  } catch (error) {
    throw error;
  }
}

export { deleteBoard };
