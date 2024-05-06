import { useEffect, useState } from 'react';
import axios from 'axios';

import NavbarComponent from './NavbarComponent';
import FooterComponent from './FooterComponent';
import { serverUrl } from '../config/serverUrl';
import styles from '../styles/Main.module.css';
import loading from '../styles/Loading.module.css';
import MatchingBtnComponent from './commonComponent/MatchingBtnComponent';

function MatchingReady() {
  const [nickname, setNickname] = useState('');
  const buttonState = { state: 'CANCEL' };

  useEffect(() => {
    setNickname('test');
    console.log(nickname);
    axios.post(`${serverUrl}/userInfo`, { username: 'testman' }).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        setNickname(res.data);
      }
    });
  });
  return (
    <div className={`${styles.App}`}>
      <NavbarComponent userInfo={nickname} />
      <div className={`${styles.mainBody}`}>
        <div className={loading.foldingCube}>
          <div className={`${loading.cube} ${loading.cube1}`} />
          <div className={`${loading.cube} ${loading.cube2}`} />
          <div className={`${loading.cube} ${loading.cube4}`} />
          <div className={`${loading.cube} ${loading.cube3}`} />
        </div>
        <MatchingBtnComponent pageState={buttonState} />
      </div>
      <FooterComponent />
    </div>
  );
}

export default MatchingReady;
