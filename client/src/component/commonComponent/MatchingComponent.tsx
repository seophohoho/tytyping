import { useState } from 'react';
import styles from '../../styles/MatchingReady.module.css';
import loading from '../../styles/Loading.module.css';
import { GameState } from '../../constant/GameState';

function MatchingComponent(props: any) {
  const { setGameState, socketInfo, userInfo} = props; //<--check
  const [btnClick, setBtnClick] = useState(false);

  const btnListner = () => {
    socketInfo.emit('cancel-matching',{ nickname: userInfo.nickname, socketId: socketInfo.id });
    setGameState(GameState.NONE);
  }

  return (
    <div className={`${styles.App}`}>
        <div className={`${styles.mainBody__center}`}>
            <div className={loading.foldingCube}>
                <div className={`${loading.cube} ${loading.cube1}`} />
                <div className={`${loading.cube} ${loading.cube2}`} />
                <div className={`${loading.cube} ${loading.cube4}`} />
                <div className={`${loading.cube} ${loading.cube3}`} />
            </div>
            <button type="button" className={`${styles.matchingBtn}`} onClick={btnListner}>
            CANCEL
            </button>
        </div>
    </div>
  );
}
export default MatchingComponent;