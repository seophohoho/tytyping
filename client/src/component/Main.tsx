import axios from 'axios';
import { useEffect, useState } from 'react';

import { Socket, io } from 'socket.io-client';
import { serverUrl } from '../config/serverUrl';
import { GameState } from '../constant/GameState';
import NavbarComponent from './layoutComponent/NavbarComponent';
import MatchingComponent from './matchingComponent/MatchingComponent';
import NoneMatchingComponent from './commonComponent/NoneMatchingComponent';

import MatchingReadyComponent from './matchingComponent/MatchingReadyComponent';
import styles from '../styles/Main.module.css';

function Main() {
  const [socketInfo, setSocketInfo] = useState<Socket | null>(null);
  const [userInfo, setUserInfo] = useState({ nickname: '' });
  const [isUserInfoSet, setIsUserInfoSet] = useState(false);
  const [gameState, setGameState] = useState(GameState.NONE);
  const [targetUserInfo, setTargetUserInfo] = useState({ nickname: '' });

  // 컴포넌트 mount 시 동작
  useEffect(() => {
    // user정보 업데이트 함수
    const fetchUserInfo = async () => {
      try {
        const res = await axios.post(`${serverUrl}/userinfo`, { username: 'test' }); // 차후 수정 필요. 닉네임 test인 유저 검색.
        if (res.status === 200) {
          setUserInfo({ nickname: res.data });
          setIsUserInfoSet(true);
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  // User정보가 수정되면 동작
  useEffect(() => {
    if (!isUserInfoSet) return () => {};

    const rootSocket = io(`${serverUrl}/`);
    console.log('socket 연결 성공.');

    rootSocket.on('connect', () => {
      if (rootSocket) {
        setSocketInfo(rootSocket);
        rootSocket.emit('connect-main', { socketId: rootSocket.id, userInfo });
      }
    });

    rootSocket.on('disconnect', () => {
      console.log('socket disconnected');
    });

    return () => {
      rootSocket.off('connect');
      rootSocket.off('disconnect');
      rootSocket.close();
    };
  }, [isUserInfoSet, userInfo]);

  const renderComponent = () => {
    switch (gameState) {
      case GameState.NONE:
        return (
          <NoneMatchingComponent
            setGameState={setGameState}
            socketInfo={socketInfo}
            userInfo={userInfo}
            setTargetUserInfo={setTargetUserInfo}
          />
        );
      case GameState.MATCHING:
        return <MatchingComponent setGameState={setGameState} socketInfo={socketInfo} userInfo={userInfo} />;
      case GameState.MATCHING_READY:
        return (
          <MatchingReadyComponent
            setGameState={setGameState}
            socketInfo={socketInfo}
            userInfo={userInfo}
            targetUserInfo={targetUserInfo}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.App}>
      <NavbarComponent userInfo={userInfo.nickname} />
      <div className={styles.mainBody}>{renderComponent()}</div>
    </div>
  );
}

export default Main;
