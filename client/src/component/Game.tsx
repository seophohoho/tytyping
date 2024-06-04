import { useState } from 'react';
import styles from '../styles/Main.module.css';
import btn from '../styles/MatchingReady.module.css';
import game from '../styles/Game.module.css';
// import ResultComponent from './layoutComponent/ResultComponent';

function Game(props: any) {
  const { setGameState, socketInfo, userInfo, targetUserInfo } = props;
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (inputValue.trim()) {
        console.log('Input value:', inputValue);

        setInputValue('');
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div className={`${styles.App}`}>
        <div className={`${styles.mainBody}`}>
          <div className={`${game.gameContainer}`}>
            <div className={`${btn.matchingBtn}`}>ROUND 1</div>
            <div className={`${btn.matchingBtn} ${game.bigBox}`}>사과</div>
            <div className={`${btn.matchingBtn} ${game.bigBox}`}>Turn {userInfo.nickname}</div>
            <div className={`${game.gameInputContainer}`}>
              <div className={`${game.gameInputUser}`}>
                <div className={`${btn.matchingBtn}`} style={{ borderBottom: '0px', position: 'relative' }}>
                  <div className={`${game.gameLifeBox}`}>
                    <div className={`${game.gameLifeNone}`} />
                    <div className={`${game.gameLifeNone}`} />
                    <div className={`${game.gameLifeNone}`} />
                  </div>
                  {userInfo.nickname}
                </div>
                <div
                  className={`${btn.matchingBtn}`}
                  style={{ borderBottom: '0px', borderLeft: '0px', background: '#d9d9d9' }}
                >
                  {targetUserInfo.nickname}
                </div>
              </div>
              <div>
                <div className={`${btn.matchingBtn} ${game.inputContainer}`}>
                  <div className={`${game.timerContainer}`}>
                    <div className={`${game.timerBar}`} />
                  </div>
                  <input
                    placeholder="단어를 입력해주세요."
                    className={`${game.inputWordBox}`}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ResultComponent setGameState={setGameState} /> */}
    </div>
  );
}

export default Game;
