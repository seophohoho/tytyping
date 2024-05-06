import { Request, Response } from 'express';
import getUserInfoByUsername from '../database/signUpModel';

async function signup(req: Request, res: Response) {
  const { username } = req.body;
  try {
    const userInfo = await getUserInfoByUsername(username);
    if (userInfo.length > 0) {
      return res.status(400).json({ message: '이미 존재하는 사용자입니다.' });
    }
    return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
  }
}

export default signup;
