import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/FindCenterFrame.module.css';

function FUCenterFrame() {
  return (
    <div className={styles.centerFrame}>
      <p className={styles.topText}>Forgot your username?</p>
      <div className={styles.blackLine} />
      <p className={styles.usernameexplainText}>Please enter your email</p>
      <Link to="/" className={styles.nonlineButton}>
        Sign In
      </Link>
    </div>
  );
}

export default FUCenterFrame;
