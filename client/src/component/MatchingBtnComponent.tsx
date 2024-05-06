import styles from '../styles/MatchingBtn.module.css';

function MatchingBtnComponent() {
  return (
    <div className={`${styles.mainBody}`}>
      <button type="button" className={`${styles.matchingBtn}`}>
        MATCHING
      </button>
    </div>
  );
}

export default MatchingBtnComponent;
