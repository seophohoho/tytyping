import mariadb from "mariadb";
import { DBconnection } from "./config";

const dbConfig = DBconnection();
const pool = mariadb.createPool(dbConfig);

async function getUserInfo(data: any) {
  try {
    const connectionDB = await pool.getConnection();
    console.log("연결");
    const query = `select * from account where username = '${data.username}'`;
    const rows = await connectionDB.execute(query);
    console.log(rows);
    connectionDB.release();
    return rows;
  } catch (error) {
    console.log(error);
  }
}

export default getUserInfo;
