import { useEffect, useState } from 'react';
import styles from '../../styles/MatchingReady.module.css';
import { GameState } from '../../constant/GameState';
import MatchedUserBox from '../commonComponent/MatchedUserBox';
import MatchedTargetUserBox from '../commonComponent/MatchedTargetUserBox';

function MatchingReadyComponent(props: any) {
  const { setGameState, socketInfo, userInfo, targetUserInfo } = props; // <--check
  const [targetReady, setTargetReady] = useState(false);
  const [userReady, setUserReady] = useState(false);

  const btnListener = () => {
    if (socketInfo) {
      setGameState(GameState.NONE);
      socketInfo.emit('cancel-matching-ready', { user: targetUserInfo });
    }
  };

  const userReadyListener = (ready: boolean) => {
    setUserReady(ready);
  };

  socketInfo.on('matching-ready-state', (data: any) => {
    setTargetReady(data);
  });

  useEffect(() => {
    if (targetReady === true && userReady === true) {
      setGameState(GameState.INGAME);
    }
  }, [targetReady, userReady]);

  return (
    <div className={`${styles.App}`}>
      <div className={`${styles.mainBody__matchingReady}`}>
        <MatchedUserBox
          userInfo={userInfo}
          targetUserInfo={targetUserInfo}
          socketInfo={socketInfo}
          userReadyListener={userReadyListener}
        />
        <button type="button" className={`${styles.matchingBtn}`} onClick={btnListener}>
          EXIT
        </button>
        <MatchedTargetUserBox userInfo={targetUserInfo} socketInfo={socketInfo} />
      </div>
    </div>
  );
}
export default MatchingReadyComponent;
