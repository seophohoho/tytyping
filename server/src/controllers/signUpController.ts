import { Request, Response } from 'express';
import { addUser } from '../database/signUpModel';

async function signup(req: Request, res: Response) {
    const { username, password, nickname, email } = req.body;
    try {
        // 입력된 정보로 사용자 추가
        await addUser(username, password, nickname, email);
        return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
    } catch (error:any) {
        console.error('Error during signup:', error);
        return res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
    }
}

export default signup;
