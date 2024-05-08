import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/CenterFrame.module.css';

function CenterFrame() {
    return (
        <div className={styles.centerFrame}>
            <p className={styles.signUpText}>Sign Up</p>
            <div className={styles.blackLine}></div>
            <Link to="/signin" className={styles.signInButton}>Sign In</Link>
        </div>
    );
}

export default CenterFrame;