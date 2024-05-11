import { Request, Response } from 'express';
import { getUserInfoByUsername } from '../database/signInModel';

async function signin(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    // 사용자 정보 가져오기
    const userInfo = await getUserInfoByUsername(username);
    
    // 사용자가 존재하는지 확인
    if (userInfo.length === 0) {
      return res.status(404).json({ message: '해당하는 사용자를 찾을 수 없습니다.' });
    }
    
    // 패스워드 확인
    if (userInfo[0].password !== password) {
      return res.status(401).json({ message: '패스워드가 올바르지 않습니다.' });
    }

    // 로그인 성공
    return res.status(200).json({ message: '로그인이 성공적으로 완료되었습니다.' });
  } catch (error:any) {
    console.error('Error during sign-in:', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
  }
}

export default signin