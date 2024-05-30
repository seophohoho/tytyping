import React from 'react';
import styles from '../../styles/InnerFrame.module.css';

interface InnerFrameProps {
  formData: any;
  onChange: (key: string, value: string) => void;
  onSubmit: () => void;
}

function SInInnerFrame({ formData, onChange, onSubmit }: InnerFrameProps) {
  const { username, password } = formData;

  return (
    <div className={styles.innerFrame}>
      <div className={styles.inputContainer}>
        <div className={styles.labelBox}>username</div>
        <input
          type="text"
          className={styles.usernameInput}
          placeholder=" "
          value={username}
          onChange={(e) => onChange('username', e.target.value)}
        />
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.labelBox}>password</div>
        <input
          type="password"
          className={styles.passwordInput}
          placeholder=" "
          value={password}
          onChange={(e) => onChange('password', e.target.value)}
        />
      </div>
      <button type="button" className={styles.lineButtonverIn} onClick={onSubmit}>
        Sign In
      </button>
    </div>
  );
}

export default SInInnerFrame;
