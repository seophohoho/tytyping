import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpForm from './SignUpForm';

function SignUpContainer() {
  const handleSubmit = (formData: any) => {
    // onSubmit 처리 로직 추가
    console.log(formData);
  };

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpForm onSubmit={handleSubmit} />} />
      </Routes>
    </Router>
  );
}

export default SignUpContainer;
