import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpContainer from './container/SignUpContainer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
