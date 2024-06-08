import styles from '../../styles/Board.module.css';

interface BoardReadProps {
  onWriteBtnClick: () => void;
}

function BoardReadComponent({ onWriteBtnClick }: BoardReadProps) {
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
          <tr>
            <td>1</td>
            <td>아이디 비밀번호 이상해요</td>
            <td>타이핑 지박령</td>
            <td>2024.06.08</td>
            <td>X</td>
          </tr>
          <tr>
            <td>2</td>
            <td>아이디 비밀번호 이상해요</td>
            <td>타이핑 지박령</td>
            <td>2024.06.08</td>
            <td>X</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BoardReadComponent;
