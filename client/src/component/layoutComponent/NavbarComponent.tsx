import { Link } from 'react-router-dom';
import styles from '../../styles/Navbar.module.css';
import { GameState } from '../../constant/GameState';

function NavbarComponent(props: any) {
  const { userInfo, gameState } = props;

  const shouldHideButtons =
    gameState === GameState.INGAME || gameState === GameState.MATCHING || gameState === GameState.MATCHING_READY;

  return (
    <div className={`${styles.navbar}`}>
      <a href="#home" className={`${styles.navMenu} ${styles.logo}`}>
        TyTyping
      </a>
      <ul className={`${styles.navMenu}`}>
        <li>
          <p className={`${styles.navLink}`}>{userInfo}</p>
        </li>
        {!shouldHideButtons && (
          <li>
            <button type="button" className={`${styles.navLink} ${styles.logout}`} style={{ margin: '0 10px 0 0' }}>
              <Link to="/board">Board</Link>
            </button>
            <button type="button" className={`${styles.navLink} ${styles.logout}`}>
              <Link to="/">Sign Out</Link>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
export default NavbarComponent;
