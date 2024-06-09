import mariadb from "mariadb";
import { DBconnection } from "./config";

const dbConfig = DBconnection();
const pool = mariadb.createPool(dbConfig);

async function readDetail(id: string) {
  const boardId = id;

  try {
    const connection = await pool.getConnection();
    const rows = await connection.query("SELECT * FROM board WHERE id=?", [
      boardId,
    ]);
    connection.release();
    if (rows.length > 0) {
      const formattedDate = new Date(rows[0].date).toISOString().split("T")[0];
      return { ...rows[0], date: formattedDate };
    } else {
      return;
    }
  } catch (error) {
    throw error;
  }
}

export { readDetail };
