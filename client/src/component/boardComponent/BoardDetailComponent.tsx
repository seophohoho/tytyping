import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.post(`${serverUrl}/userinfo`, { username: localStorage.getItem('userData') });
        if (res.status === 200) {
          console.log(res.data);
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

  if (!boardDetail) {
    return <div>Loading...</div>;
  }

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
            <div className={styles.board_detail_content}>{boardDetail.content}</div>
          </div>

          <p className={styles.boardDetail_solve}>{boardDetail.solve ? '해결됨' : '미해결'}</p>
        </div>
      </div>
    </div>
  );
}

export default BoardDetailComponent;
