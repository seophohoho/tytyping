import React from 'react';
import styles from '../styles/FindInnerFrame.module.css';

interface FPInnerFrameProps {
    username: string;
    email: string;
    onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
}

const FPInnerFrame: React.FC<FPInnerFrameProps> = ({ username, email, onUsernameChange, onEmailChange, onSubmit }) => {
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
                <input 
                    type="email" 
                    className={styles.emailInput}
                    placeholder=" "
                    value={email}
                    onChange={onEmailChange} 
                />
            </div>
            <button className={styles.lineButton} onClick={onSubmit}>
                OK
            </button>
        </div>
    );
}

export default FPInnerFrame;
