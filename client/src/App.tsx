import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './component/Main';
import SignUpContainer from './container/SignUpContainer';

function App() {
  return (
    <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="/signup" element={<SignUpContainer />} />
    </Routes>
  );
}

export default App;
