import { useState } from 'react';
import styles from '../styles/MatchingBtn.module.css';

function MatchingBtnComponent() {
  const [btnClick,setBtnClick] = useState(false);

  const matchingBtnListner = () =>{
    setBtnClick(true);
  }

  const cancelBtnListner = () =>{
    setBtnClick(false)
  }

  return (
    <div className={`${styles.mainBody}`}>
      {
        btnClick ? <> <div className={styles.spinner}></div> <button type="button" className={`${styles.matchingBtn}`} onClick={cancelBtnListner}> CALCEL </button></>:
        <button type="button" className={`${styles.matchingBtn}`} onClick={matchingBtnListner}> MATCHING </button>
      }
    </div>
  );
}

export default MatchingBtnComponent;
