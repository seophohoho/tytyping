import mariadb from "mariadb";
import { DBconnection } from "./config";

const dbConfig = DBconnection();
const pool = mariadb.createPool(dbConfig);

async function createBoard(title: string, writer: string, content: string) {
  try {
    const connection = await pool.getConnection();

    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    const solve = false;

    const query =
      "INSERT INTO board (title, writer, content, date, solve) VALUES (?, ?, ?, ?, ?)";
    await connection.query(query, [title, writer, content, date, solve]);

    connection.release();
    console.log("data insert successful");
  } catch (error) {
    throw error;
  }
}

export { createBoard };
