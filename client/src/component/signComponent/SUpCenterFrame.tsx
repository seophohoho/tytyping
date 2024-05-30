import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/CenterFrame.module.css';

interface CenterFrameProps {
  to: string;
}

function SUpCenterFrame({ to }: CenterFrameProps) {
  return (
    <div className={styles.centerFrame}>
      <p className={styles.topText}>Sign - Up</p>
      <div className={styles.blackLine} />
      <Link to={to} className={styles.nonlineButton}>
        Sign In
      </Link>
    </div>
  );
}

export default SUpCenterFrame;
