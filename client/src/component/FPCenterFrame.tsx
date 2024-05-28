import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/FindCenterFrame.module.css';

const FPCenterFrame: React.FC = () => {
  return (
    <div className={styles.centerFrame}>
      <p className={styles.topText}>Forgot your password?</p>
      <div className={styles.blackLine}></div>
      <p className={styles.explainText}>Please enter your username && email</p>
      <Link to="/signin" className={styles.nonlineButton}>
        Sign In
      </Link>
    </div>
  );
};

export default FPCenterFrame;
