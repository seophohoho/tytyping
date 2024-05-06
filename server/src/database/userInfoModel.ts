import mariadb from "mariadb";
import { DBconnection } from "./config";

const dbConfig = DBconnection();
const pool = mariadb.createPool(dbConfig);

async function getUserInfo(data: any) {
  try {
    const connectionDB = await pool.getConnection();
    const query = `select * from userinfo where username = '${data.username}'`;
    const rows = await connectionDB.execute(query);
    connectionDB.release();
    console.log(rows);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

export default getUserInfo;
