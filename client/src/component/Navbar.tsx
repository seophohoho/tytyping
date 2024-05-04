import { useState } from "react";
import  styles from '../styles/Navbar.module.css';

function Navbar() {
  // adding the states 
  const [isActive, setIsActive] = useState(false);
  //add the active class
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };
  //clean up function to remove the active class
  const removeActive = () => {
    setIsActive(false)
  }

  const handleLogout = () => {
    // 로그아웃 버튼 클릭 시 /main 경로로 이동
    console.log('test');
  };
  return (
    <div className="App">
      <header className="App-header">
        <nav className={`${styles.navbar}`}>
          {/* logo */}
          <a href='#home' className={`${styles.navMenu} ${styles.logo}`}>TyTyping</a>
          <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
            <li onClick={removeActive}>
              <p className={`${styles.navLink}`}>Nickname</p>
            </li>
            <li onClick={handleLogout}>
              <p className={`${styles.navLink} ${styles.logout}`}>Log Out</p>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
export default Navbar;