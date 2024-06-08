import styles from '../../styles/Navbar.module.css';

function NavbarComponent(props: any) {
  const { userInfo } = props;
  return (
    <div className={`${styles.navbar}`}>
      <a href="#home" className={`${styles.navMenu} ${styles.logo}`}>
        TyTyping
      </a>
      <ul className={`${styles.navMenu}`}>
        <li>
          <p className={`${styles.navLink}`}>{userInfo}</p>
        </li>
        <li>
          <button type="button" className={`${styles.navLink} ${styles.logout}`} style={{ margin: '0 10px 0 0' }}>
            Board
          </button>
          <button type="button" className={`${styles.navLink} ${styles.logout}`}>
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
}
export default NavbarComponent;
