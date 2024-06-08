import { useState } from 'react';
import styles from '../styles/Main.module.css';
import NavbarComponent from './layoutComponent/NavbarComponent';
import BoardReadComponent from './boardComponent/BoardReadComponent';
import BoardWriteComponent from './boardComponent/BoardWriteComponent';

function Board() {
  const [boardState, setBoardState] = useState({ state: 'read' });
  const [userInfo] = useState({ nickname: 'test' });

  const handleWriteBtn = () => {
    setBoardState({ state: 'write' });
  };

  const handleBoardStateChange = (state: string) => {
    setBoardState({ state });
  };

  const renderBoardComponent = () => {
    if (boardState.state === 'read') {
      return <BoardReadComponent onWriteBtnClick={handleWriteBtn} />;
    }
    return <BoardWriteComponent userInfo={userInfo} onRegisterSuccess={() => handleBoardStateChange('read')} />;
  };

  return (
    <div className={styles.App}>
      <NavbarComponent userInfo={userInfo.nickname} />
      <div className={styles.mainBody}>{renderBoardComponent()}</div>
    </div>
  );
}

export default Board;
