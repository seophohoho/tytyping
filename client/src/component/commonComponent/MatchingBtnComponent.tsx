import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from '../../styles/MatchingReady.module.css';

function MatchingBtnComponent(props: any) {
  const { socketInfo, userInfo } = props;
  const [btnClick, setBtnClick] = useState(false);

  const matchingBtnListner = () => {
    setBtnClick(true);
    socketInfo.emit('start-matching', { nickname: userInfo, socketId: socketInfo.id });
  };

  // const cancelBtnListner = () => {
  //   setBtnClick(false);
  //   socketInfo.emit('cancel-matching', { nickname: userInfo, socketId: socketInfo.id });
  // };

  let toPath = '/main';

  if (props.pageState.state === 'MATCHING') {
    toPath = '/matching-ready';
  } else if (props.pageState.state === 'CANCEL') {
    toPath = '/main';
  }

  return (
    <Link to={toPath}>
      <button type="button" className={`${styles.matchingBtn}`} onClick={matchingBtnListner}>
        {props.pageState.state}
      </button>
    </Link>
  );
}
export default MatchingBtnComponent;
