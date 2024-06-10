import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Main.module.css';
import NavbarComponent from './layoutComponent/NavbarComponent';
import BoardReadComponent from './boardComponent/BoardReadComponent';
import BoardWriteComponent from './boardComponent/BoardWriteComponent';
import { serverUrl } from '../config/serverUrl';

function Board() {
  const [boardState, setBoardState] = useState({ state: 'read' });
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

  const handleWriteBtn = () => {
    setBoardState({ state: 'write' });
  };

  const handleBoardStateChange = (state: string) => {
    setBoardState({ state });
  };

  const renderBoardComponent = () => {
    if (boardState.state === 'read') {
      return <BoardReadComponent onWriteBtnClick={handleWriteBtn} />;
    }
    return <BoardWriteComponent userInfo={userInfo} onRegisterSuccess={() => handleBoardStateChange('read')} />;
  };

  return (
    <div className={styles.App}>
      <NavbarComponent userInfo={userInfo.nickname} />
      <div className={styles.mainBody}>{renderBoardComponent()}</div>
    </div>
  );
}

export default Board;
