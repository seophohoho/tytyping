import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './component/Main';
import MatchingReady from './component/MatchingReady';
import Game from './component/Game';

function App() {
  return (
    <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="/matching-ready" element={<MatchingReady />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

export default App;
