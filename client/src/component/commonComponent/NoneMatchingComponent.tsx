import styles from '../../styles/MatchingReady.module.css';
import { GameState } from '../../constant/GameState';

function NoneMatchingComponent(props: any) {
  const { setGameState, socketInfo, userInfo, setTargetUserInfo } = props; // <--check

  const matchingBtnListner = () => {
    setGameState(GameState.MATCHING);
    socketInfo.emit('matching_start', { nickname: userInfo.nickname, socketId: socketInfo.id });
    socketInfo.on('matching_success', (data: any) => {
      setTargetUserInfo({ socketId: data.socketId, nickname: data.nickname });
      setGameState(GameState.MATCHING_READY);
    });
  };

  return (
    <div>
      <button type="button" className={`${styles.matchingBtn}`} onClick={matchingBtnListner}>
        MATCHING
      </button>
    </div>
  );
}
export default NoneMatchingComponent;
