import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Board.module.css';

interface BoardReadProps {
  onWriteBtnClick: () => void;
}

interface BoardData {
  id: number; // 고유한 ID로 변경
  index: number;
  title: string;
  writer: string;
  date: string;
  solve: boolean;
}

function BoardReadComponent({ onWriteBtnClick }: BoardReadProps) {
  const [boardData, setBoardData] = useState<BoardData[]>([]);

  useEffect(() => {
    async function fetchBoardData() {
      try {
        const response = await axios.post('http://localhost:8000/board/readBoard');
        console.log(response.data);
        setBoardData(response.data); // 배열로 설정
      } catch (error) {
        console.error('Error: ', error);
      }
    }

    fetchBoardData();
  }, []);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <div className={styles.board_container}>
      <div className={styles.board_header_container}>
        <h3 className={styles.board_title}>Issue 게시판</h3>
        <button type="button" tabIndex={0} className={styles.board_btn} onClick={onWriteBtnClick}>
          글쓰기
        </button>
      </div>
      <table className={styles.board_table}>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>글쓴이</th>
            <th>작성 날짜</th>
            <th>해결 여부</th>
          </tr>
        </thead>
        <tbody>
          {boardData
            .slice()
            .reverse()
            .map((board) => (
              <tr key={board.id}>
                <td>{board.index}</td>
                <td>{board.title}</td>
                <td>{board.writer}</td>
                <td>{formatDate(board.date)}</td>
                <td>{board.solve ? 'O' : 'X'}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default BoardReadComponent;
