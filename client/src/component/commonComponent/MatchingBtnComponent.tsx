import { Link } from 'react-router-dom';
import styles from '../../styles/MatchingBtn.module.css';

interface PageState {
  state: string;
}

function MatchingBtnComponent({ pageState }: { pageState: PageState }) {
  let toPath = '/main';

  if (pageState.state === 'MATCHING') {
    toPath = '/matching-ready';
  } else if (pageState.state === 'Cancel') {
    toPath = '/main';
  }

  return (
    <div className={`${styles.mainBody}`}>
      <Link to={toPath}>
        <button type="button" className={`${styles.matchingBtn}`}>
          {pageState.state}
        </button>
      </Link>
    </div>
  );
}

export default MatchingBtnComponent;
