import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/FindCenterFrame.module.css';

function FPCenterFrame() {
  return (
    <div className={styles.centerFrame}>
      <p className={styles.topText}>Forgot your password?</p>
      <div className={styles.blackLine} />
      <p className={styles.passwordexplainText}>Please enter your username & email</p>
      <Link to="/signin" className={styles.nonlineButton}>
        Sign In
      </Link>
    </div>
  );
}

export default FPCenterFrame;
