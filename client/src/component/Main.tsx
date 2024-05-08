import { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import NavbarComponent from './NavbarComponent';
import MatchingBtnComponent from './MatchingBtnComponent';
import styles from '../styles/Main.module.css';
import { serverUrl } from '../config/serverUrl';

function Main() {
  const [nickname, setNickname] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    const newSocket = io(`${serverUrl}/game`);

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    newSocket.on('connect', onConnect);
    newSocket.on('disconnect', onDisconnect);

    return () => {
      newSocket.off('connect', onConnect);
      newSocket.off('disconnect', onDisconnect);
    };
  }, []);

  useEffect(() => {
    setNickname('test');
    console.log(nickname);
    axios.post(`${serverUrl}/userinfo`, { username: 'testman' }).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        setNickname(res.data);
      }
    });
  }, []);
  return (
    <div className={`${styles.App}`}>
      <NavbarComponent userInfo={nickname} />
      <MatchingBtnComponent />
    </div>
  );
}

export default Main;