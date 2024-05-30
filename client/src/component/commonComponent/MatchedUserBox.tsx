import { useEffect, useState } from 'react';
import styles from '../../styles/MatchingReady.module.css';

interface MatchedUserBoxProps {
  userInfo: any;
  targetUserInfo: any;
  socketInfo: any;
  userReadyListener: (ready: boolean) => void;
}

function MatchedUserBox({ userInfo, targetUserInfo, socketInfo, userReadyListener }: MatchedUserBoxProps) {
  const [btnClick, setBtnClick] = useState(false);

  const readyListener = () => {
    const newBtnClickState = !btnClick;
    setBtnClick(newBtnClickState);
    userReadyListener(newBtnClickState);
    socketInfo.emit('matching-ready', { user: targetUserInfo, state: newBtnClickState });
  };

  useEffect(() => {
    console.log('TestComponent!!');
    console.log(userInfo); // 상대방의 데이터가 잘 들어왔음을 확인함.
  }, [userInfo]);

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
