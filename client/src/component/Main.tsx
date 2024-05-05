import NavbarComponent from './NavbarComponent';
import MatchingBtnComponent from './MatchingBtnComponent';
import styles from '../styles/Main.module.css';
import FooterComponent from './FooterComponent';

function Main() {
  return (
    <div className={`${styles.App}`}>
      <NavbarComponent />
      <MatchingBtnComponent />
      <FooterComponent />
    </div>
  );
}

export default Main;
