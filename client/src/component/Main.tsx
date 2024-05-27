import { useEffect, useState } from 'react';
import axios from 'axios';
import { Socket, io } from 'socket.io-client';
import NavbarComponent from './NavbarComponent';
import styles from '../styles/Main.module.css';
import { serverUrl } from '../config/serverUrl';
import { GameState } from '../constant/GameState';
import MatchingComponent from './commonComponent/MatchingComponent';
import NoneMatchingComponent from './commonComponent/NoneMatchingComponent';
import TestComponent from './commonComponent/TestComponent';

function Main() {
  const [socketInfo, setSocketInfo] = useState<Socket | null>(null);
  const [userInfo, setUserInfo] = useState({ nickname: '' });
  const [isUserInfoSet, setIsUserInfoSet] = useState(false);
  const [gameState, setGameState] = useState(GameState.NONE);
  const [targetUserInfo, setTargetUserInfo] = useState({ nickname: '' });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.post(`${serverUrl}/userinfo`, { username: 'test' });
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
        return <TestComponent setGameState={setGameState} targetUserInfo={targetUserInfo} />;
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
