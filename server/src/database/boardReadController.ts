import mariadb from "mariadb";
import { DBconnection } from "./config";

const dbConfig = DBconnection();
const pool = mariadb.createPool(dbConfig);

async function readBoard() {
  try {
    const connection = await pool.getConnection();
    const rows = await connection.query("SELECT * FROM board");
    connection.release();
    const formattedDate = new Date(rows[0].date).toISOString().split("T")[0];
    return { ...rows[0], date: formattedDate };
  } catch (error) {
    throw error;
  }
}

export { readBoard };
