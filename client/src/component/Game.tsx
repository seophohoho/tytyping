import styles from '../styles/Main.module.css';
import nav from '../styles/Navbar.module.css';
import btn from '../styles/MatchingReady.module.css';
import game from '../styles/Game.module.css';

function Game() {
  return (
    <div className={`${styles.App}`}>
      <div className={nav.navbar}>
        <a href="#home" className={`${styles.navMenu} ${styles.logo}`}>
          Tytyping
        </a>
      </div>
      <div className={`${styles.mainBody}`}>
        <div className={`${game.gameContainer}`}>
          <div className={`${btn.matchingBtn}`}>ROUND 1</div>
          <div className={`${btn.matchingBtn} ${game.bigBox}`}>사과</div>
          <div className={`${btn.matchingBtn} ${game.bigBox}`}>Turn A</div>

          <div className={`${game.gameInputContainer}`}>
            <div className={`${game.gameInputUser}`}>
              <div className={`${btn.matchingBtn}`} style={{ borderBottom: '0px' }}>
                PLAYER A
              </div>
              <div className={`${btn.matchingBtn}`} style={{ borderBottom: '0px', borderLeft: '0px' }}>
                PLAYER B
              </div>
            </div>
            <div>
              <div className={`${btn.matchingBtn} ${game.inputContainer}`}>
                <input placeholder="단어를 입력해주세요." className={`${game.inputWordBox}`}></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
