import { Request, Response } from 'express';
import { sendUsernameByEmail } from '../database/findUsernameModel';

export const forgotUsernameController = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        // 이메일로 아이디 전송
        await sendUsernameByEmail(email);
        return res.status(200).json({ message: '이메일로 아이디를 전송했습니다.' });
    } catch (error:any) {
        console.error('Error during forgot username:', error);
        return res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
    }
};