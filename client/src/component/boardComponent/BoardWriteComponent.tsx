import { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Board.module.css';

interface UserInfo {
  nickname: string;
}

interface Props {
  userInfo: UserInfo;
  onRegisterSuccess: () => void;
}

function BoardWriteComponent({ userInfo, onRegisterSuccess }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleWrite = () => {
    try {
      axios.post('http://localhost:8000/board', {
        title,
        writer: userInfo.nickname,
        content,
      });
      alert('게시글이 등록되었습니다.');
      onRegisterSuccess();
    } catch (error) {
      alert('게시글 작성 중 오류가 발생했습니다.');
      console.error('Error: ', error);
    }
  };

  return (
    <div className={styles.board_container}>
      <div className={styles.board_header_container}>
        <h3 className={styles.board_title}>Issue 글쓰기</h3>
        <button type="button" className={styles.board_btn} onClick={handleWrite}>
          등록
        </button>
      </div>
      <div className={styles.board_write_container}>
        <input
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.board_write_title}
        />
        <textarea
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.board_write_content}
        />
      </div>
    </div>
  );
}

export default BoardWriteComponent;
