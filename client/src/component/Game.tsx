import styles from '../styles/Main.module.css';
import btn from '../styles/MatchingReady.module.css';
import game from '../styles/Game.module.css';

function Game(props: any) {
  const { setGameState, socketInfo, userInfo, targetUserInfo } = props;
  console.log(userInfo);
  console.log(targetUserInfo);
  return (
    <div className={`${styles.App}`}>
      <div className={`${styles.mainBody}`}>
        <div className={`${game.gameContainer}`}>
          <div className={`${btn.matchingBtn}`}>ROUND 1</div>
          <div className={`${btn.matchingBtn} ${game.bigBox}`}>사과</div>
          <div className={`${btn.matchingBtn} ${game.bigBox}`}>Turn A</div>

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
                <input placeholder="단어를 입력해주세요." className={`${game.inputWordBox}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
