import React from 'react';
import styles from '../styles/FindInnerFrame.module.css';

interface RPInnerFrameProps {
    newPassword: string;
    confirmPassword: string;
    onNewPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
}

const RPInnerFrame: React.FC<RPInnerFrameProps> = ({ newPassword, confirmPassword, onNewPasswordChange, onConfirmPasswordChange, onSubmit }) => {
    return (
        <div className={styles.innerFrame}>
            <div className={styles.inputContainer}>
                <div className={styles.labelBox}>new</div>
                <input 
                    type="password" 
                    className={styles.passwordInput}
                    placeholder=" "
                    value={newPassword}
                    onChange={onNewPasswordChange} 
                />
            </div>
            <div className={styles.inputContainer}>
                <div className={styles.labelBox}>confirm</div>
                <input 
                    type="password" 
                    className={styles.passwordInput}
                    placeholder=" "
                    value={confirmPassword}
                    onChange={onConfirmPasswordChange} 
                />
            </div>
            <button className={styles.lineButton} onClick={onSubmit}>
                OK
            </button>
        </div>
    );
}

export default RPInnerFrame;
