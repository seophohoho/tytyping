import { useState } from 'react';
import styles from '../../styles/MatchingReady.module.css';
import { GameState } from '../../constant/GameState';

function TestComponent(props: any) {
  const { setGameState } = props; //<--check
  const [btnClick, setBtnClick] = useState(false);

  const matchingBtnListner = () => {
    
  }

  return (
    <div>
      <button type="button" className={`${styles.matchingBtn}`} onClick={matchingBtnListner}>
        매칭 성공!
      </button>
    </div>
  );
}
export default TestComponent;