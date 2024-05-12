import { Request, Response } from 'express';
import { addUser } from '../database/signUpModel';
import bcrypt from 'bcryptjs'; // bcrypt 모듈 import

async function signup(req: Request, res: Response) {
    const { username, password, nickname, email } = req.body;
    try {
        // 1. 비밀번호 암호화
        const hashedPassword = await bcrypt.hash(password, 10);

        // 2. 아이디 최대 길이 검사
        if (username.length > 16) {
            return res.status(400).json({ message: '아이디는 16자 이내로 입력해주세요.' });
        }

        // 3. 닉네임 최대 길이 검사
        if (nickname.length > 10) {
            return res.status(400).json({ message: '닉네임은 10자 이내로 입력해주세요.' });
        }

        // 4. 이메일 형식 및 도메인 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validDomains = ['gmail.com', 'naver.com']; // 유효한 도메인 목록
        const domain = email.split('@')[1]; // 이메일에서 도메인 추출
        if (!emailRegex.test(email) || !validDomains.includes(domain)) {
            return res.status(400).json({ message: '올바른 이메일 형식이 아니거나 허용되지 않는 도메인입니다.' });
        }

        // 5. 사용자 추가
        await addUser(username, hashedPassword, nickname, email);
        return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
    } catch (error: any) {
        console.error('Error during signup:', error);
        return res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
    }
}

export default signup;
