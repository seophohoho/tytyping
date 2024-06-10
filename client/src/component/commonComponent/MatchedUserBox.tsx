import { useEffect, useState } from 'react';

import styles from '../../styles/MatchingReady.module.css';

function MatchedUserBox(props: any) {
  const { userInfo, targetUserInfo, socketInfo } = props; // <--check
  const [btnClick, setBtnClick] = useState(false);

  const readyListener = () => {
    setBtnClick(!btnClick);
    socketInfo.emit('waiting_my_state', { userInfo: targetUserInfo, state: !btnClick });
  };

  useEffect(() => {
    console.log('TestComponent!!');
    console.log(userInfo); // 상대방의 데이터가 잘 들어왔음을 확인함.
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      readyListener();
    }
  };

  return (
    <div className={`${styles.matchingUser__container}`}>
      <div className={`${styles.matchingUser__userName}`}>{userInfo.nickname}</div>
      <div
        className={`${styles.matchingBtn}`}
        style={{ margin: '43% 0 0 0' }}
        onClick={readyListener}
        onKeyPress={handleKeyPress}
        role="button"
        tabIndex={0}
      >
        {btnClick ? 'Ready' : 'Not Ready'}
      </div>
    </div>
  );
}

export default MatchedUserBox;
