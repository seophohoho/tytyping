import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/CenterFrame.module.css';

interface CenterFrameProps {
  to: string;
}

const SInCenterFrame: React.FC<CenterFrameProps> = ({ to }) => {
  return (
    <div className={styles.centerFrame}>
      <p className={styles.topText}>Sign - In</p>
      <div className={styles.blackLine}></div>
      <Link to={to} className={styles.nonlineButton}>Sign Up</Link>
      <div className={styles.bottomLinks}>
        <Link to="/forgot-username" className={styles.nonlineFindButton1}>Forgot Your Username?</Link>
        <span className={styles.separator}>|</span>
        <Link to="/forgot-password" className={styles.nonlineFindButton2}>Forgot Your Password?</Link>
      </div>
    </div>
  );
}

export default SInCenterFrame;
