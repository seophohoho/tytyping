// import { useEffect, useState } from 'react';
// import axios from 'axios';

// import NavbarComponent from './NavbarComponent';
// import { serverUrl } from '../config/serverUrl';
// import styles from '../styles/Main.module.css';
// import loading from '../styles/Loading.module.css';
// // import MatchingBtnComponent from './commonComponent/MatchingBtnComponent';
// import MatchingUserComponent from './commonComponent/MatchingUserComponent';

// function MatchingReady() {
//   const [nickname, setNickname] = useState('');
//   const [matchState, setMatchState] = useState(true); //default true.
//   const buttonState = { state: 'CANCEL' };

//   useEffect(() => {
//     // axios.post(`${serverUrl}/userInfo`, { username: 'testman' }).then((res) => {
//     //   if (res.status === 200) {
//     //     console.log(res.data);
//     //     setNickname(res.data);
//     //   }
//     // });

//     // // 매칭 상태 관리
//     // if (matchState === true) {
//     //   setMatchState(true);
//     //   // axios를 통해 값을 받아서 setMatchState의 값을 true로 변경.
//     // }
//   });
//   return (
//     <div className={`${styles.App}`}>
//       <NavbarComponent userInfo={nickname} />
//       <div className={`${styles.mainBody}`}>
//         {matchState && <MatchingUserComponent />}
//         <div className={`${styles.mainBody__center}`}>
//           {!matchState && (
//             <div className={loading.foldingCube}>
//               <div className={`${loading.cube} ${loading.cube1}`} />
//               <div className={`${loading.cube} ${loading.cube2}`} />
//               <div className={`${loading.cube} ${loading.cube4}`} />
//               <div className={`${loading.cube} ${loading.cube3}`} />
//             </div>
//           )}
//           <MatchingBtnComponent pageState={buttonState} />
//         </div>
//         {matchState && <MatchingUserComponent />}
//       </div>
//     </div>
//   );
// }

// export default MatchingReady;
