import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { serverUrl } from '../../config/serverUrl';
import layout from '../../styles/Main.module.css';
import styles from '../../styles/Board.module.css';
import NavbarComponent from '../layoutComponent/NavbarComponent';

function BoardEditComponent() {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
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
    const fetchBoardDetail = async () => {
      try {
        const response = await axios.get(`${serverUrl}/board/readBoard/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error('Error fetching board detail:', error);
      }
    };

    fetchBoardDetail();
  }, [id]);

  const handleEdit = async () => {
    try {
      await axios.patch(`${serverUrl}/board/update/${id}`, {
        title,
        content,
      });
      alert('게시물이 성공적으로 수정되었습니다.');
      navigate(`/board/${id}`);
    } catch (error) {
      console.error('게시물 수정 오류:', error);
      alert('게시물 수정에 실패했습니다.');
    }
  };

  const handleCancel = () => {
    navigate(`/board`);
  };

  return (
    <div className={layout.App}>
      <NavbarComponent userInfo={userInfo.nickname} />
      <div className={layout.mainBody}>
        <div className={styles.board_container}>
          <div className={styles.board_header_container}>
            <h3 className={styles.board_title}>Issue 글 수정</h3>
            <div className={styles.board_btn_container}>
              <button type="button" className={styles.board_btn2} onClick={handleCancel} style={{ marginRight: '8px' }}>
                취소
              </button>
              <button type="button" className={styles.board_btn1} onClick={handleEdit}>
                수정
              </button>
            </div>
          </div>
          <div className={styles.board_write_container}>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.board_write_title}
            />
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={styles.board_write_content}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardEditComponent;
