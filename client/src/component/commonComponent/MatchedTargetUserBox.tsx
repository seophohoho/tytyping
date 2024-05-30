import { useEffect, useState } from 'react';

import styles from '../../styles/MatchingReady.module.css';

function MatchedTargetUserBox(props: any) {
  const { userInfo, socketInfo } = props; // <--check
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log('TestComponent!!');
    console.log(userInfo); // 상대방의 데이터가 잘 들어왔음을 확인함.
    socketInfo.on('matching-ready-state', (data: any) => {
      setIsReady(data);
    });
  }, []);

  return (
    <div className={`${styles.matchingUser__container}`}>
      <div className={`${styles.matchingUser__userName}`}>{userInfo.nickname}</div>
      <div className={`${styles.targetMatchingBtn}`} style={{ margin: '43% 0 0 0' }}>
        {isReady ? 'Ready' : 'Not Ready'}
      </div>
    </div>
  );
}

export default MatchedTargetUserBox;
