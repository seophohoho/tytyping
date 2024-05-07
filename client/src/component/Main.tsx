import { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarComponent from './NavbarComponent';
import MatchingBtnComponent from './MatchingBtnComponent';
import styles from '../styles/Main.module.css';
import { serverUrl } from '../config/serverUrl';

function Main() {
  const [nickname, setNickname] = useState('');

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
