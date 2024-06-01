import mariadb from "mariadb";
import { DBconnection } from "./config";

const dbConfig = DBconnection();
const pool = mariadb.createPool(dbConfig);

async function addUser(
  username: string,
  password: string,
  nickname: string,
  email: string
) {
  try {
    const connection = await pool.getConnection();
    const accountQuery = `INSERT INTO account (username, password, nickname, email) VALUES (?, ?, ?, ?)`;

    await connection.query(accountQuery, [username, password, nickname, email]);

    connection.release();
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}

export { addUser };
