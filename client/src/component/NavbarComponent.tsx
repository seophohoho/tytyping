import styles from '../styles/Navbar.module.css';

function NavbarComponent() {
  return (
    <div className={`${styles.navbar}`}>
      {/* logo */}
      <a href="#home" className={`${styles.navMenu} ${styles.logo}`}>
        TyTyping
      </a>
      <ul className={`${styles.navMenu}`}>
        <li>
          <p className={`${styles.navLink}`}>Nickname</p>
        </li>
        <li>
          <p className={`${styles.navLink} ${styles.logout}`}>Log Out</p>
        </li>
      </ul>
    </div>
  );
}
export default NavbarComponent;