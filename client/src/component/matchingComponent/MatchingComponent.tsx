import React from 'react';
import styles from '../../styles/MatchingReady.module.css';
import loading from '../../styles/Loading.module.css';
import { GameState } from '../../constant/GameState';
import { Socket } from 'socket.io-client';

interface MatchingComponentProps {
  setGameState: (state: GameState) => void;
  socketInfo: Socket | null;
  userInfo: {
    nickname: string;
  };
}

const MatchingComponent: React.FC<MatchingComponentProps> = (props) => {
  const { setGameState, socketInfo, userInfo } = props;

  const btnListner = () => {
    if (socketInfo) {
      socketInfo.emit('matching_cancel', { nickname: userInfo.nickname, socketId: socketInfo.id });
      setGameState(GameState.NONE);
    }
  };

  return (
    <div className={`${styles.App}`}>
      <div className={`${styles.mainBody__matching}`}>
        <div className={`${loading.foldingCube}`}>
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
};

export default MatchingComponent;
