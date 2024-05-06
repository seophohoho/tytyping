import { useEffect, useState } from 'react';
import axios from 'axios';

import NavbarComponent from './NavbarComponent';
import FooterComponent from './FooterComponent';
import { serverUrl } from '../config/serverUrl';

function MatchingReady() {
  const [nickname, setNickname] = useState('');

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
    <div className="$styles.App">
      <NavbarComponent userInfo={nickname} />
      <FooterComponent />
    </div>
  );
}

export default MatchingReady;
