import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styles from '../styles/Main.module.css';
import btn from '../styles/MatchingReady.module.css';
import game from '../styles/Game.module.css';
import { GameState } from '../constant/GameState';
import { serverUrl } from '../config/serverUrl';

function Game(props: any) {
  const { userInfo, targetUserInfo, socketInfo, setGameState, initGameInfo } = props;

  const [isTurn, setIsTurn] = useState<number | null>(null);
  const [startWord, setStartWord] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [round] = useState(1);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setStartWord(initGameInfo.initWord);
    setIsTurn(initGameInfo.turn);
    socketInfo.on('ingame_target_input', (data: any) => {
      setInputValue(data.input);
      setIsCorrect(data.result);
    });
    socketInfo.on('ingame_change_response', (data: any) => {
      console.log('turn is over!');
      setIsTurn(data.turn);
      setStartWord(data.startWord);
      setInputValue('');
      console.log(data);
    });
    socketInfo.on('ingame_result_response', (data: any) => {
      console.log(data);
      if (data.result) {
        alert('승리!');
        setGameState(GameState.NONE);
      } else {
        alert('패배!');
        setGameState(GameState.NONE);
      }
    });
  }, [initGameInfo, socketInfo, setGameState]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isTurn && inputValue.charAt(0) !== startWord) {
      setIsCorrect(false);
      socketInfo.emit('ingame_my_input', { input: inputValue, targetUserInfo, result: false });
      setInputValue('');
    }
    if (e.key === 'Enter' && isTurn === 1 && inputValue.charAt(0) === startWord) {
      try {
        const res = await axios.post(`${serverUrl}/ingame/is-correct`, {
          word: inputValue,
        });
        if (res.data.message) {
          setIsCorrect(true);
          socketInfo.emit('ingame_my_input', { input: inputValue, targetUserInfo, result: true });
          socketInfo.emit('ingame_change_request', {
            targetUserInfo,
            startWord: inputValue.charAt(inputValue.length - 1),
          });
        } else {
          setIsCorrect(false);
          socketInfo.emit('ingame_my_input', { input: inputValue, targetUserInfo, result: false });
        }
      } catch (error) {
        console.error('Error submitting word:', error);
      } finally {
        setInputValue('');
      }
    }
  };

  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.animation = 'none';
      progressBarRef.current.offsetHeight;
      progressBarRef.current.style.animation = '';

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        console.log('제한 시간 끝!');
        if (isTurn) {
          socketInfo.emit('ingame_result_request', { targetUserInfo });
        }
      }, 5000);
    }
  }, [startWord, isTurn, socketInfo, targetUserInfo]);

  return (
    <div className={`${styles.App}`}>
      <div className={`${styles.mainBody}`}>
        <div className={`${game.gameContainer}`}>
          <div className={`${btn.matchingBtn}`}>ROUND {round}</div>
          <div className={`${btn.matchingBtn} ${game.bigBox}`}>{startWord}</div>
          <div className={`${btn.matchingBtn} ${game.bigBox}`}>{inputValue}</div>
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
                <div className={game.progress_container}>
                  {isTurn === 1 ? (
                    <div className={game.progress_bar} ref={progressBarRef} />
                  ) : (
                    <div className={game.progress_bar} ref={progressBarRef} style={{ background: '#929292' }} />
                  )}
                </div>
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
