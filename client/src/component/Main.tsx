import { useEffect, useInsertionEffect, useState } from 'react';
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
  const [userInfo, setUserInfo] = useState({nickname:""});
  const [isUserInfoSet, setIsUserInfo] = useState(false);
  const [gameState,setGameState] = useState(GameState.NONE);
  const [targetUserInfo,setTargetUserInfo] = useState({nickname:""});

  useEffect(() => {
    axios.post(`${serverUrl}/userinfo`, { username: 'test' }).then((res) => {
      if (res.status === 200) {
        setUserInfo({nickname:res.data});
        setIsUserInfo(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!isUserInfoSet) return;
    const rootSocket = io(`${serverUrl}/`);
    console.log('socket 연결 성공.');

    rootSocket.on('connect', ()=>{
      if (rootSocket) {
        setSocketInfo(rootSocket);
        rootSocket.emit('connect-main', { socketId: rootSocket.id, userInfo:userInfo });
      }
    });

    rootSocket.on('disconnect',()=>{

    });

    return () => {
      rootSocket.off('connect');
      rootSocket.off('disconnect');
    };
  }, [isUserInfoSet]);

  const renderComponent = () =>{
    switch(gameState){
      case GameState.NONE:
        return <NoneMatchingComponent setGameState={setGameState} socketInfo={socketInfo} userInfo={userInfo} setTargetUserInfo={setTargetUserInfo}/>;
      case GameState.MATCHING:
        return <MatchingComponent setGameState={setGameState} socketInfo={socketInfo} userInfo={userInfo}/>;
      case GameState.MATCHING_READY:
        return <TestComponent setGameState={setGameState} targetUserInfo={targetUserInfo}/>
    }
  }

  return (
    <div className={`${styles.App}`}>
      <NavbarComponent userInfo={userInfo.nickname} />
      <div className={`${styles.mainBody}`}>
        {renderComponent()}
      </div>
    </div>
  );
}

export default Main;