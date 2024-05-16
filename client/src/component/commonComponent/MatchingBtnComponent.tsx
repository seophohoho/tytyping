import { Link } from 'react-router-dom';
import styles from '../../styles/MatchingReady.module.css';

interface PageState {
  state: string;
}

function MatchingBtnComponent({ pageState }: { pageState: PageState }) {
  let toPath = '/main';

  if (pageState.state === 'MATCHING') {
    toPath = '/matching-ready';
  } else if (pageState.state === 'CANCEL') {
    toPath = '/main';
  }

  return (
    <Link to={toPath}>
      <button type="button" className={`${styles.matchingBtn}`}>
        {pageState.state}
      </button>
    </Link>
  );
}

export default MatchingBtnComponent;
