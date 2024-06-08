import styles from '../../styles/Board.module.css';

function BoardWriteComponent() {
  return (
    <div className={styles.board_container}>
      <div className={styles.board_header_container}>
        <h3 className={styles.board_title}>Issue 글쓰기</h3>
        <div className={styles.board_btn}>등록</div>
      </div>
      <div className={styles.board_write_container}>
        <input placeholder="제목을 입력해주세요." className={styles.board_write_title} />
        <textarea placeholder="내용을 입력해주세요." className={styles.board_write_content} />
      </div>
    </div>
  );
}

export default BoardWriteComponent;
