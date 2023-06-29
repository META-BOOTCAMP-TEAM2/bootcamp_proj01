// import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../components/authContext";

// //컴포넌트& css
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import "./stylePages.css";
// import axios from "axios";

// const MyPage = () => {
//   const [userInfo, setUserInfo] = useState({});

//   const { currentUser } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         console.log(`/users/${currentUser}`);
//         const res = await axios.get(`/users/${currentUser}`);
//         console.log(res.data);
//         const result = res.data;
//         setUserInfo(result);
//       } catch (err) {
//         alert(err);
//       }
//     };
//     fetchData();
//   }, []);
//   const btnClick = () => {
//     const newUrl = `http://localhost:3000/myLists`;
//     const newWindow = window.open(newUrl);
//     newWindow.sessionStorage.setItem("myData", JSON.stringify());
//   };

//   return (
//     <div className="MyPage">
//       <Header />
//       <div className="Title">
//         <h2>My Page</h2>
//       </div>
//       <div className="content">
//         <h3>나의 정보</h3>
//         <p> 이름 : {userInfo.name}</p>
//         <p> 아이디 : {userInfo.userid}</p>
//         <p> 이메일 주소 : {userInfo.email}</p>
//         <p> 연락처 : {userInfo.phone}</p>
//       </div>
//       <Link to="/myLists">
//         <button className="myUpLoad" onClick={() => btnClick()}>
//           내가 올린 매물
//         </button>
//       </Link>
//       <Footer />
//     </div>
//   );
// };

// export default MyPage;

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/authContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./stylePages.css";
import axios from "axios";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({});
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`/users/${currentUser}`);
        const res = await axios.get(`/users/${currentUser}`);
        console.log(res.data);
        const result = res.data;
        setUserInfo(result);
      } catch (err) {
        alert(err);
      }
    };
    fetchData();
  }, []);

  const btnClick1 = async () => {
    try {
      const res = await axios.get(`/post/${currentUser}`);
      const result = res.data;
      const newUrl = "/myLists";
      const newWindow = window.open(newUrl);
      newWindow.sessionStorage.setItem("myData", JSON.stringify(result));
      console.log(result);
    } catch (err) {
      alert(err);
    }
  };

  const btnClick2 = async () => {
    try {
      const res = await axios.get(`/post/${currentUser}`);
      const result = res.data;
      const newUrl = "/likePage";
      const newWindow = window.open(newUrl);
      newWindow.sessionStorage.setItem("myData", JSON.stringify(result));
      console.log(result);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div>
      <Header />
      <div className="myPage">
        <div className="myPageImg"></div>
        <div className="myPageContent">
          <div className="myPageTitle">
            <h2>My Page</h2>
          </div>

          <div className="myPageBox">
            <h3 className="myPageSubTitle">나의 정보</h3>
            <div className="myPageInfo">
              {" "}
              <p> 이름 : {userInfo.name}</p>
              <p> 아이디 : {userInfo.userid}</p>
              <p> 이메일 주소 : {userInfo.email}</p>
              <p> 연락처 : {userInfo.phone}</p>
            </div>
          </div>

          <div>
            <button className="myPageMyUpLoad" onClick={() => btnClick1()}>
              내가 올린 매물
            </button>
            <div>
              <button className="myLove" onClick={() => btnClick2()}>
                내가 찜한 매물
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyPage;
