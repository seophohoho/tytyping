import React from 'react';
import CenterFrame from './CenterFrame';
import InnerFrame from './InnerFrame';
import styles from '../styles/SignUp.module.css';

interface SignUpFormProps {
  onSubmit: (formData: any) => Promise<void>;
}

function SignUpForm({ onSubmit }: SignUpFormProps) {
  return (
    <div className={styles.App}>
      <CenterFrame />
      <InnerFrame onSubmit={onSubmit} />
    </div>
  );
}

export default SignUpForm;