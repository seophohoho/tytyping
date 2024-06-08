import { useEffect } from 'react';
import styles from '../../styles/MatchingReady.module.css';
import { GameState } from '../../constant/GameState';
import MatchedUserBox from '../commonComponent/MatchedUserBox';
import MatchedTargetUserBox from '../commonComponent/MatchedTargetUserBox';

function MatchingReadyComponent(props: any) {
  const { setGameState, socketInfo, userInfo, targetUserInfo } = props; // <--check

  const btnListner = () => {
    if (socketInfo) {
      setGameState(GameState.NONE);
      socketInfo.emit('waiting_my_cancel', { userInfo: targetUserInfo });
    }
  };

  useEffect(() => {
    socketInfo.on('waiting_target_cancel', () => {
      alert('상대방이 나갔습니다.');
      setGameState(GameState.NONE);
    });
  }, []);

  return (
    <div className={`${styles.App}`}>
      <div className={`${styles.mainBody__matchingReady}`}>
        <MatchedUserBox userInfo={userInfo} targetUserInfo={targetUserInfo} socketInfo={socketInfo} />
        <button type="button" className={`${styles.matchingBtn}`} onClick={btnListner}>
          EXIT
        </button>
        <MatchedTargetUserBox userInfo={targetUserInfo} socketInfo={socketInfo} />
      </div>
    </div>
  );
}
export default MatchingReadyComponent;
