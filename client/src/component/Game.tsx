import styles from '../styles/Main.module.css';
import nav from '../styles/Navbar.module.css';
import btn from '../styles/MatchingReady.module.css';
import game from '../styles/Game.module.css';
import { useEffect, useState } from 'react';

function Game(props: any) {
  const { userInfo, targetUserInfo, socketInfo, setGameState, initGameInfo } = props;

  const [isTurn, setIsTurn] = useState(null);
  const [startWord, setStartWord] = useState('');
  const [round, setRound] = useState(1);

  useEffect(() => {
    setStartWord(initGameInfo.initWord);
    setIsTurn(initGameInfo.turn);
  }, []);

  return (
    <div className={`${styles.App}`}>
      <div className={`${styles.mainBody}`}>
        <div className={`${game.gameContainer}`}>
          <div className={`${btn.matchingBtn}`}>ROUND {round}</div>
          <div className={`${btn.matchingBtn} ${game.bigBox}`}>{startWord}</div>
          <div className={`${btn.matchingBtn} ${game.bigBox}`}>
            {isTurn === 0 ? '상대 턴' : isTurn === 1 ? '내 턴' : ''}
          </div>

          <div className={`${game.gameInputContainer}`}>
            <div className={`${game.gameInputUser}`}>
              <div className={`${btn.matchingBtn}`} style={{ borderBottom: '0px' }}>
                {userInfo.nickname}
              </div>
              <div className={`${btn.matchingBtn}`} style={{ borderBottom: '0px', borderLeft: '0px' }}>
                {targetUserInfo.nickname}
              </div>
            </div>
            <div>
              <div className={`${btn.matchingBtn} ${game.inputContainer}`}>
                <input
                  placeholder={isTurn === 1 ? '단어를 입력해주세요.' : '입력불가'}
                  className={`${game.inputWordBox}`}
                  disabled={isTurn !== 1}
                />{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
