import { useEffect, useState } from 'react';
import styles from '../../styles/MatchingReady.module.css';
import { GameState } from '../../constant/GameState';
import MatchedUserBox from '../commonComponent/MatchedUserBox';
import { traceDeprecation } from 'process';
import MatchedTargetUserBox from '../commonComponent/MatchedTargetUserBox';

function MatchingReadyComponent(props: any) {
  const { setGameState, socketInfo, userInfo, targetUserInfo } = props; //<--check
  const [btnClick, setBtnClick] = useState(false);

  const btnListner = () => {
    if (socketInfo) {
      setGameState(GameState.NONE);
      socketInfo.emit('cancel-matching-ready', { user: targetUserInfo });
    }
  };

  const readyListener = () => {
    setBtnClick(!btnClick);
    console.log('ready');
  };

  useEffect(() => {
    console.log('TestComponent!!');
    console.log(targetUserInfo); //상대방의 데이터가 잘 들어왔음을 확인함.
    socketInfo.on('matching-ready-quiet', () => {
      alert('상대방이 나감.');
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
