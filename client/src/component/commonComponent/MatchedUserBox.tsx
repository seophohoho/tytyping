import { useState } from 'react';

import styles from '../../styles/MatchingReady.module.css';

function MatchedUserBox({ player }: any) {
  const [btnClick, setBtnClick] = useState(false);
  const readyListener = () => {
    setBtnClick(!btnClick);
    console.log('ready');
  };

  return (
    <div className={`${styles.matchingUser__container}`}>
      <div className={`${styles.matchingUser__userName}`}>{player}</div>
      <div className={`${styles.matchingBtn}`} style={{ margin: '43% 0 0 0' }} onClick={readyListener}>
        Prepare
      </div>
    </div>
  );
}

export default MatchedUserBox;
