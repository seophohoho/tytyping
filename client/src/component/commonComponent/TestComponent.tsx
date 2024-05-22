import { useEffect, useState } from 'react';
import styles from '../../styles/MatchingReady.module.css';
import { GameState } from '../../constant/GameState';

function TestComponent(props: any) {
  const { setGameState, targetUserInfo } = props; //<--check
  const [btnClick, setBtnClick] = useState(false);

  useEffect(()=>{
    console.log('TestComponent!!');
    console.log(targetUserInfo); //상대방의 데이터가 잘 들어왔음을 확인함.
  },[])

  return (
    <div>
      
    </div>
  );
}
export default TestComponent;