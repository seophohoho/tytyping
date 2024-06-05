import React from 'react';
import styles from '../../styles/FindCenterFrame.module.css';

function RPCenterFrame() {
  return (
    <div className={styles.centerFrame}>
      <p className={styles.topText}>Reset your password</p>
      <div className={styles.blackLine}></div>
      <p className={styles.resetExplainText}>Please enter your new password</p>
    </div>
  );
}

export default RPCenterFrame;
