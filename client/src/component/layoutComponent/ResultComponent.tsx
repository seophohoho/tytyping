import styles from '../../styles/Game.module.css';
import { GameState } from '../../constant/GameState';

function ResultComponent(props: any) {
  const { setGameState } = props;
  const exitBtnListener = () => {
    setGameState(GameState.NONE);
  };
  return (
    <div className={`${styles.modalContainer}`}>
      <h3 className={`${styles.modalTitle}`}>RESULT</h3>
      <button type="button" className={`${styles.modalBtn}`} onClick={exitBtnListener}>
        EXIT
      </button>
    </div>
  );
}

export default ResultComponent;
