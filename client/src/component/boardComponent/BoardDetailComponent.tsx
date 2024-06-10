import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import layout from '../../styles/Main.module.css';
import styles from '../../styles/Board.module.css';
import { serverUrl } from '../../config/serverUrl';
import NavbarComponent from '../layoutComponent/NavbarComponent';

interface BoardDetailData {
  id: number;
  title: string;
  writer: string;
  date: string;
  content: string;
  solve: boolean;
}

function BoardDetailComponent() {
  const { id } = useParams<{ id: string }>();
  const [boardDetail, setBoardDetail] = useState<BoardDetailData | null>(null);
  const [userInfo, setUserInfo] = useState({ nickname: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.post(`${serverUrl}/userinfo`, { username: localStorage.getItem('userData') });
        if (res.status === 200) {
          setUserInfo({ nickname: res.data });
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    async function fetchBoardDetail() {
      try {
        const response = await axios.get(`${serverUrl}/board/readBoard/${id}`);
        setBoardDetail(response.data);
      } catch (error) {
        console.error('Error fetching board detail:', error);
      }
    }

    fetchBoardDetail();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${serverUrl}/board/delete/${id}`);
      if (response.status === 200) {
        alert('게시물이 성공적으로 삭제되었습니다.');
        navigate(`/board`);
      }
    } catch (error) {
      console.error('게시물 삭제 오류:', error);
      alert('게시물 삭제에 실패했습니다.');
    }
  };

  const handleEdit = () => {
    navigate(`/board/edit/${id}`);
  };

  if (!boardDetail) {
    return <div>Loading...</div>;
  }

  const handleSolveChange = async (solve: boolean) => {
    try {
      console.log(solve);
      const solveValue = solve ? 1 : 0;
      const response = await axios.patch(`${serverUrl}/board/edit/${id}`, {
        solve: solveValue,
      });
      if (response.status === 200) {
        setBoardDetail((prevDetail) => (prevDetail ? { ...prevDetail, solve } : prevDetail));
        alert('문제가 해결되었습니다.');
      }
    } catch (error) {
      console.error('해결 상태 업데이트 오류: ', error);
      alert('해결 상태 업데이트에 실패했습니다.');
    }
  };

  const formatContent = (content: string) => ({
    __html: content.replace(/\n/g, '<br>'),
  });

  return (
    <div className={layout.App}>
      <NavbarComponent userInfo={userInfo.nickname} />
      <div className={layout.mainBody}>
        <div className={styles.board_container}>
          <div className={styles.board_detail_container}>
            <div className={styles.board_detail_header} style={{ flexDirection: 'column', alignItems: 'start' }}>
              <h3 className={styles.board_title}>{boardDetail.title}</h3>
              <div className={styles.board_detail_info}>
                <div>작성자: {boardDetail.writer}</div>
                <div>작성 날짜: {boardDetail.date}</div>
              </div>
            </div>
            <div className={styles.board_detail_content} dangerouslySetInnerHTML={formatContent(boardDetail.content)} />
          </div>
          <div className={styles.board_detail_bottom}>
            {userInfo.nickname === boardDetail.writer && (
              <div className={styles.board_btn_container}>
                <button type="button" className={styles.board_btn1} style={{ marginRight: '8px' }} onClick={handleEdit}>
                  수정
                </button>
                <button type="button" className={styles.board_btn2} onClick={handleDelete}>
                  삭제
                </button>
              </div>
            )}
            <div className={styles.board_solve_dropdown}>
              <select
                id="solve"
                value={boardDetail.solve ? 'true' : 'false'}
                onChange={(e) => handleSolveChange(e.target.value === 'true')}
                style={{
                  width: '80px',
                  height: '32px',
                  background: '#eee',
                  border: '2px solid #5c5c5c',
                  outline: 'none',
                }}
              >
                <option value="true">해결됨</option>
                <option value="false">미해결</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardDetailComponent;
