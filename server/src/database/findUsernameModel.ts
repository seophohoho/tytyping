import nodemailer from 'nodemailer';
import mariadb from 'mariadb';
import { DBconnection } from './config'; // DB 연결 정보 가져오기

// SMTP 설정
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your.email@gmail.com', // 보내는 이메일 주소
        pass: 'yourPassword' // 이메일 비밀번호
    }
});

// MariaDB 연결 풀 생성
const pool = mariadb.createPool(DBconnection());

// 이메일로 아이디 전송 함수
export async function sendUsernameByEmail(email: string) {
    let conn;
    try {
        conn = await pool.getConnection();

        // 이메일로 사용자 찾기
        const rows = await conn.query(`SELECT username FROM users WHERE email = ?`, [email]);

        if (rows.length === 0) {
            throw new Error('해당 이메일로 등록된 사용자가 없습니다.');
        }

        const username = rows[0].username;

        // 이메일 내용 설정
        const mailOptions = {
            from: 'your.email@gmail.com', // 보내는 이메일 주소
            to: email, // 받는 이메일 주소
            subject: '아이디 찾기 안내', // 이메일 제목
            text: `귀하의 아이디는 ${username}입니다.` // 아이디 정보
        };

        // 이메일 전송
        await transporter.sendMail(mailOptions);

        console.log('이메일로 아이디를 성공적으로 전송했습니다.');
    } catch (error) {
        console.error('Error during sending username by email:', error);
        throw new Error('이메일 전송에 실패했습니다.');
    } finally {
        if (conn) conn.release(); // 연결 반환
    }
}
