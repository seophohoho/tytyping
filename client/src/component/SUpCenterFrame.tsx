import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/CenterFrame.module.css';

interface CenterFrameProps {
  to: string; // 추가: 클릭 시 이동할 URL 경로
}

const SUpCenterFrame: React.FC<CenterFrameProps> = ({ to }) => {
  return (
    <div className={styles.centerFrame}>
      <p className={styles.topText}>Sign - Up</p>
      <div className={styles.blackLine}></div>
      <Link to={to} className={styles.nonlineButton}>Sign In</Link>
    </div>
  );
}

export default SUpCenterFrame;
