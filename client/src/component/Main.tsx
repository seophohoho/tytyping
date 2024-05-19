import { useEffect, useState } from 'react';
import axios from 'axios';
import { Socket, io } from 'socket.io-client';
import NavbarComponent from './NavbarComponent';
import MatchingBtnComponent from './commonComponent/MatchingBtnComponent';
import styles from '../styles/Main.module.css';
import { serverUrl } from '../config/serverUrl';

function Main() {
  const [nickname, setNickname] = useState('');
  const buttonState = { state: 'MATCHING' };
  const [isNicknameSet, setIsNicknameSet] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [socketInfo, setSocketInfo] = useState<Socket | null>(null);

  useEffect(() => {
    axios.post(`${serverUrl}/userinfo`, { username: 'test' }).then((res) => {
      if (res.status === 200) {
        setNickname(res.data);
        setIsNicknameSet(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!isNicknameSet) return;
    const rootSocket = io(`${serverUrl}/`);
    console.log('socket 연결!!!!!!!!!!!!!!!!!!!');
    function onConnect() {
      setIsConnected(true);
      if (rootSocket) {
        setSocketInfo(rootSocket);
        rootSocket.emit('connect-main', { socketId: rootSocket.id, nickname });
      }
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    rootSocket.on('connect', onConnect);
    rootSocket.on('disconnect', onDisconnect);
    rootSocket.on('match-success', (data) => {
      console.log(data);
    });

    return () => {
      rootSocket.off('connect', onConnect);
      rootSocket.off('disconnect', onDisconnect);
    };
  }, [isNicknameSet]);

  return (
    <div className={`${styles.App}`}>
      <NavbarComponent userInfo={nickname} />
      <div className={`${styles.mainBody}`}>
        <MatchingBtnComponent pageState={buttonState} />
      </div>
      {/* <MatchingBtnComponent socketInfo={socketInfo} userInfo={nickname} /> */}
    </div>
  );
}

export default Main;
