import React from 'react';
import styles from '../../styles/FindInnerFrame.module.css';

interface FPInnerFrameProps {
  username: string;
  email: string;
  verificationCode: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVerificationCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheck: () => void;
  onConfirm: () => void;
  isVerificationSent: boolean;
  isVerificationChecked: boolean;
}
function FPInnerFrame({
  username,
  email,
  verificationCode,
  onUsernameChange,
  onEmailChange,
  onVerificationCodeChange,
  onCheck,
  onConfirm,
  isVerificationSent,
  isVerificationChecked,
}: FPInnerFrameProps) {
  return (
    <div className={styles.innerFrame}>
      <div className={styles.inputContainer}>
        <div className={styles.labelBox}>Username</div>
        <input
          type="text"
          className={styles.usernameInput}
          placeholder=" "
          value={username}
          onChange={onUsernameChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.labelBox}>Email</div>
        <input type="email" className={styles.emailInput} placeholder=" " value={email} onChange={onEmailChange} />
      </div>
      {!isVerificationChecked && (
        <button type="button" className={styles.lineButton} onClick={onCheck}>
          Check
        </button>
      )}
      {isVerificationSent && (
        <>
          <div className={styles.inputContainer}>
            <div className={styles.labelBox}>Code</div>
            <input
              type="text"
              className={styles.verificationCodeInput}
              placeholder=" "
              value={verificationCode}
              onChange={onVerificationCodeChange}
            />
          </div>
          <button type="button" className={styles.confirmButton} onClick={onConfirm}>
            Confirm
          </button>
        </>
      )}
    </div>
  );
}

export default FPInnerFrame;
