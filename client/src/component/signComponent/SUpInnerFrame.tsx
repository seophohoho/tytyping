import React from 'react';
import styles from '../../styles/InnerFrame.module.css';

interface InnerFrameProps {
  formData: {
    username: string;
    password: string;
    nickname: string;
    email: string;
  };
  onChange: (key: string, value: string) => void;
  onSubmit: () => void;
}

function SUpInnerFrame({ formData, onChange, onSubmit }: InnerFrameProps) {
  const { username, password, nickname, email } = formData;

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
      <div className={styles.inputContainer}>
        <div className={styles.labelBox}>nickname</div>
        <input
          type="text"
          className={styles.nicknameInput}
          placeholder=" "
          value={nickname}
          onChange={(e) => onChange('nickname', e.target.value)}
        />
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.labelBox}>email</div>
        <input
          type="email"
          className={styles.emailInput}
          placeholder=" "
          value={email}
          onChange={(e) => onChange('email', e.target.value)}
        />
      </div>
      <button type="button" className={styles.lineButton} onClick={onSubmit}>
        Sign Up
      </button>
    </div>
  );
}

export default SUpInnerFrame;
