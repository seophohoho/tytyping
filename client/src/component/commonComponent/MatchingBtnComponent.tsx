import styles from '../../styles/MatchingReady.module.css';
import { GameState } from '../../constant/GameState';

function MatchingBtnComponent(props: any) {
  const { setGameState } = props; //<--check

  const matchingBtnListner = () => {
    setGameState(GameState.MATCHING);
  };

  return (
    <div>
      <button type="button" className={`${styles.matchingBtn}`} onClick={matchingBtnListner}>
        MATCHING
      </button>
    </div>
  );
}
export default MatchingBtnComponent;
