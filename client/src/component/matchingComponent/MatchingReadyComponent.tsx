import { useEffect, useState } from 'react';
import styles from '../../styles/MatchingReady.module.css';
import { GameState } from '../../constant/GameState';
import MatchedUserBox from '../commonComponent/MatchedUserBox';

function MatchingReadyComponent(props: any) {
  const { setGameState, socketInfo, userInfo, targetUserInfo } = props; //<--check
  const [btnClick, setBtnClick] = useState(false);

  const btnListner = () => {
    if (socketInfo) {
      socketInfo.emit('cancel-matching', { nickname: userInfo.nickname, socketId: socketInfo.id });
      setGameState(GameState.NONE);
    }
  };

  const readyListener = () => {
    setBtnClick(!btnClick);
    console.log('ready');
  };

  useEffect(() => {
    console.log('TestComponent!!');
    console.log(targetUserInfo); //상대방의 데이터가 잘 들어왔음을 확인함.
  }, []);

  console.log('소켓:', props.targetUserInfo.nickname);
  return (
    <div className={`${styles.App}`}>
      <div className={`${styles.mainBody__matchingReady}`}>
        <MatchedUserBox player={props.userInfo.nickname} />
        <button type="button" className={`${styles.matchingBtn}`} onClick={btnListner}>
          EXIT
        </button>
        <MatchedUserBox player={props.targetUserInfo.nickname} />
      </div>
    </div>
  );
}
export default MatchingReadyComponent;
