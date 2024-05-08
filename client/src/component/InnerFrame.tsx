import React, { useState } from 'react';
import styles from '../styles/InnerFrame.module.css';

interface InnerFrameProps {
  onSubmit: (formData: any) => Promise<void>;
}

function InnerFrame({ onSubmit }: InnerFrameProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = async () => {
    try {
      await onSubmit({ username, password, nickname, email });
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  return (
    <div className={styles.innerFrame}>
      <input
        type="text"
        className={styles.usernameInput}
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className={styles.passwordInput}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        className={styles.nicknameInput}
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <input
        type="email"
        className={styles.emailInput}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className={styles.signUpButton} onClick={handleSignUp}>
        Sign Up
      </button>
    </div>
  );
}

export default InnerFrame;