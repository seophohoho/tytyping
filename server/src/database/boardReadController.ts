import mariadb from "mariadb";
import { DBconnection } from "./config";

const dbConfig = DBconnection();
const pool = mariadb.createPool(dbConfig);

async function readBoard() {
  try {
    const connection = await pool.getConnection();
    const rows = await connection.query("SELECT * FROM board");
    connection.release();
    return rows;
  } catch (error) {
    throw error;
  }
}

export { readBoard };
