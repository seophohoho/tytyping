import mariadb from 'mariadb';
import { DBconnection } from './config';

const dbConfig = DBconnection();
const pool = mariadb.createPool(dbConfig);

async function getUserInfoByUsername(username: string) {
  try {
    const connection = await pool.getConnection();
    const query = `SELECT * FROM userinfo WHERE username = ?`;
    const rows = await connection.query(query, [username]);
    connection.release();
    return rows;
  } catch (error) {
    console.error('Error retrieving user info:', error);
    throw error;
  }
}

async function addUser(username: string, password: string, nickname: string, email: string) {
  try {
      const connection = await pool.getConnection();
      const query = `INSERT INTO userinfo (username, password, nickname, email) VALUES (?, ?, ?, ?)`;
      await connection.query(query, [username, password, nickname, email]);
      connection.release();
  } catch (error) {
      console.error('Error adding user:', error);
      throw error;
  }
}

export { getUserInfoByUsername, addUser };
