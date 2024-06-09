import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Main.module.css';
import btn from '../styles/MatchingReady.module.css';
import game from '../styles/Game.module.css';

function Game(props: any) {
  const { userInfo, targetUserInfo, socketInfo, initGameInfo } = props;

  const [isTurn, setIsTurn] = useState(null);
  const [startWord, setStartWord] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [round] = useState(1);

  useEffect(() => {
    setStartWord(initGameInfo.initWord);
    setIsTurn(initGameInfo.turn);
    socketInfo.on('ingame_target_input', (data: any) => {
      // data에는 상대방이 작성한 단어와 올바른 단어인지 틀린 단어인지 판별하는 값이 있다.
      console.log(data);
      setInputValue(data.input);
      setIsCorrect(data.result);
    });
    socketInfo.on('ingame_change_response', (data: any) => {
      console.log('turn is over!');
      console.log(data);
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // useEffect(() => {}, [data]);

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isTurn === 1 && inputValue.charAt(0) === startWord) {
      try {
        const res = await axios.post('http://localhost:8000/ingame/is-correct', {
          word: inputValue,
        });
        if (res.data.message) {
          setIsCorrect(true);
          socketInfo.emit('ingame_my_input', { input: inputValue, targetUserInfo, result: true });
          // 1.5초 뒤에 아래 코드가 실행되도록 해주면 된다.
          socketInfo.emit('ingame_change_request', { targetUserInfo });
        } else {
          setIsCorrect(false);
          socketInfo.emit('ingame_my_input', { input: inputValue, targetUserInfo, result: false });
        }
      } catch (error) {
        console.error('Error submitting word:', error);
      } finally {
        console.log(isTurn);
        setInputValue('');
      }
    }
  };

  return (
    <div className={`${styles.App}`}>
      <div className={`${styles.mainBody}`}>
        <div className={`${game.gameContainer}`}>
          <div className={`${btn.matchingBtn}`}>ROUND {round}</div>
          <div className={`${btn.matchingBtn} ${game.bigBox}`}>{startWord}</div>
          <div className={`${btn.matchingBtn} ${game.bigBox}`}>${inputValue}</div>
          <div className={game.wrongWord}>
            {isCorrect ? `맞았습니다! 턴이 넘어갑니다.` : `없는 단어입니다. 다른 단어를 입력해주세요.`}
          </div>
          <div className={`${game.gameInputContainer}`}>
            <div className={`${game.gameInputUser}`}>
              {isTurn === 1 ? (
                <div className={`${btn.matchingBtn}`} style={{ borderBottom: '0px' }}>
                  {userInfo.nickname}
                </div>
              ) : (
                <div className={`${btn.matchingBtn}`} style={{ borderBottom: '0px', background: '#929292' }}>
                  {userInfo.nickname}
                </div>
              )}
              {isTurn === 1 ? (
                <div
                  className={`${btn.matchingBtn}`}
                  style={{ borderBottom: '0px', borderLeft: '0px', background: '#929292' }}
                >
                  {targetUserInfo.nickname}
                </div>
              ) : (
                <div className={`${btn.matchingBtn}`} style={{ borderBottom: '0px', borderLeft: '0px' }}>
                  {targetUserInfo.nickname}
                </div>
              )}
            </div>
            <div>
              <div className={`${btn.matchingBtn} ${game.inputContainer}`}>
                <input
                  placeholder={isTurn === 1 ? '단어를 입력해주세요.' : '입력불가'}
                  className={`${game.inputWordBox}`}
                  disabled={isTurn !== 1}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
