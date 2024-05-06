import { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarComponent from './NavbarComponent';
import MatchingBtnComponent from './commonComponent/MatchingBtnComponent';
import styles from '../styles/Main.module.css';
import FooterComponent from './FooterComponent';
import { serverUrl } from '../config/serverUrl';

function Main() {
  const [nickname, setNickname] = useState('');
  const buttonState = { state: 'MATCHING' };

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
      <div className={`${styles.mainBody}`}>
        <MatchingBtnComponent pageState={buttonState} />
      </div>
      <FooterComponent />
    </div>
  );
}

export default Main;
