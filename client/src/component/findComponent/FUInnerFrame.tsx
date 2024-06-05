import React from 'react';
import styles from '../../styles/FindInnerFrame.module.css';

interface FUInnerFrameProps {
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

function FUInnerFrame({ email, onChange, onSubmit }: FUInnerFrameProps) {
  return (
    <div className={styles.innerFrame}>
      <div className={styles.inputContainer}>
        <div className={styles.labelBox}>email</div>
        <input type="email" className={styles.emailInput} placeholder=" " value={email} onChange={onChange} />
        <button className={styles.lineButton} onClick={onSubmit}>
          OK
        </button>
      </div>
    </div>
  );
}

export default FUInnerFrame;
