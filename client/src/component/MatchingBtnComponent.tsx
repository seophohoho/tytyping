import { useState } from 'react';
import styles from '../styles/MatchingBtn.module.css';

function MatchingBtnComponent(props: any) {
  const { socketInfo, userInfo } = props;
  const [btnClick, setBtnClick] = useState(false);

  const matchingBtnListner = () => {
    setBtnClick(true);
    socketInfo.emit('start-matching', { nickname: userInfo, socketId: socketInfo.id });
  };

  const cancelBtnListner = () => {
    setBtnClick(false);
    socketInfo.emit('cancel-matching', { nickname: userInfo, socketId: socketInfo.id });
  };

  return (
    <div className={`${styles.mainBody}`}>
      {btnClick ? (
        <>
          {' '}
          <div className={styles.spinner} />{' '}
          <button type="button" className={`${styles.matchingBtn}`} onClick={cancelBtnListner}>
            {' '}
            CALCEL{' '}
          </button>
        </>
      ) : (
        <button type="button" className={`${styles.matchingBtn}`} onClick={matchingBtnListner}>
          {' '}
          MATCHING{' '}
        </button>
      )}
    </div>
  );
}

export default MatchingBtnComponent;
