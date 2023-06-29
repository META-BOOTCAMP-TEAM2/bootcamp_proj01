// import React, { useState, useEffect } from "react";
// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import axios from "axios";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import "./stylePages.css";
// import HeartButton from "../components/heartButton";

// const ListingDetail = (props) => {
//   const [like, setLike] = useState(false);
//   const userId = localStorage.getItem("id");
//   const storedData = sessionStorage.getItem("myData");

//   const data = JSON.parse(storedData);
//   const postId = data.id;
//   console.log(data);

//   const fetchData = async () => {
//     const res = await axios.get(`/like/${userId}/${postId}`);
//     console.log(res.data.length);
//     if (res.data.length !== 0) setLike(true);
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const toggleLike = async () => {
//     try {
//       if (like) {
//         // 이미 좋아요한 경우, 삭제 요청 보내기
//         const response = await axios.delete(`/like/${userId}`, {
//           data: {
//             postid: postId, // 매물의 ID
//             userid: userId, // 로컬 스토리지에서 가져온 사용자 ID
//           },
//         });
//         console.log(response.data); // 서버 응답 확인 (예: 좋아요 삭제 결과)
//       } else {
//         // 좋아요하지 않은 경우, 등록 요청 보내기
//         const response = await axios.post("/like/", {
//           postid: postId, // 매물의 ID
//           userid: userId, // 로컬 스토리지에서 가져온 사용자 ID
//         });
//         console.log(response.data); // 서버 응답 확인 (예: 좋아요 등록 결과)
//       }
//       setLike(!like);
//       localStorage.setItem("likeStatus", JSON.stringify(!like));
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   return (
//     <div className="listingDetail">
//       <Header />
//       <div className="listingDetailForm">
//         <h1>상세 정보</h1>
//         <div className="top">
//           <Carousel className="imgTotal" showThumbs={false}>
//             {/* { data.img.map((imgUrl, index) => ( */}
//             <div>
//               <img
//                 src={"http://localhost:8000/uploads/" + data.path1}
//                 alt="Property Image"
//                 style={{ width: "600px", height: "400px" }}
//               />
//             </div>
//             <div>
//               <img
//                 src={"http://localhost:8000/uploads/" + data.path2}
//                 alt="Property Image"
//                 style={{ width: "600px", height: "400px" }}
//               />
//             </div>
//             <div>
//               <img
//                 src={"http://localhost:8000/uploads/" + data.path3}
//                 alt="Property Image"
//                 style={{ width: "600px", height: "400px" }}
//               />
//             </div>
//           </Carousel>
//           <div className="keyContent">
//             <h3>중요 정보</h3>
//             <p>계약 방식: {data.propertyType}</p>
//             {data.propertyType === "매매" && <p>가격: {data.price}</p>}
//             {data.propertyType === "전세" && <p>보증금: {data.deposit}</p>}
//             {data.propertyType === "월세" && (
//               <p>
//                 보증금: {data.deposit}, 월세: {data.monthlyRent}
//               </p>
//             )}
//             <p>주소: {data.address}</p>
//             <p>방 구조: {data.structure}</p>
//             {/* <p>옵션: {data.options.join(", ")}</p> */}
//             <HeartButton like={like} onClick={toggleLike} />
//             {/* <Detail content={content} /> */}
//           </div>
//         </div>
//         <div className="content">
//           <h3>상세 정보</h3>
//           <p>{data.additionalInfo}</p>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ListingDetail;

import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./stylePages.css";
import HeartButton from "../components/heartButton";

const ListingDetail = (props) => {
  const [like, setLike] = useState(false);
  const userId = localStorage.getItem("id");
  const storedData = sessionStorage.getItem("myData");

  const data = JSON.parse(storedData);
  const postId = data.id;
  console.log(data.address);

  const fetchData = async () => {
    const res = await axios.get(`/like/${userId}/${postId}`);
    console.log(res.data.length);
    if (res.data.length !== 0) setLike(true);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const toggleLike = async () => {
    try {
      if (!userId) {
        // 로컬 스토리지에 저장된 ID가 없을 때 처리
        console.log("ID가 없습니다.");
        return;
      }

      if (like) {
        // 이미 좋아요한 경우, 삭제 요청 보내기
        const response = await axios.delete(`/like/${userId}`, {
          data: {
            postid: postId, // 매물의 ID
            userid: userId, // 로컬 스토리지에서 가져온 사용자 ID
          },
        });
        console.log(response.data); // 서버 응답 확인 (예: 좋아요 삭제 결과)
      } else {
        // 좋아요하지 않은 경우, 등록 요청 보내기
        const response = await axios.post("/like/", {
          postid: postId, // 매물의 ID
          userid: userId, // 로컬 스토리지에서 가져온 사용자 ID
        });
        console.log(response.data); // 서버 응답 확인 (예: 좋아요 등록 결과)
      }
      setLike(!like);
      localStorage.setItem("likeStatus", JSON.stringify(!like));
    } catch (error) {
      console.error(error);
    }
  };

  // 로컬 스토리지에 저장된 ID가 없으면 토글 버튼이 작동하지 않도록 처리
  // if (!userId) {
  //   return (
  //     <div className="listingDetail">
  //       <Header />
  //       <div className="listingDetailForm">
  //         <h1>상세 정보</h1>
  //         <p>ID가 없습니다.</p>
  //       </div>
  //       <Footer />
  //     </div>
  //   );
  // }

  return (
    <div className="listingDetail">
      <Header />
      <div className="listingDetailForm">
        <h1>상세 정보</h1>
        <div className="top">
          <Carousel className="imgTotal" showThumbs={false}>
            {/* { data.img.map((imgUrl, index) => ( */}
            <div>
              <img
                src={"http://192.168.0.30:8000/" + data.path1}
                alt="Property Image"
                style={{ width: "600px", height: "400px" }}
              />
            </div>
            <div>
              <img
                src={"http://192.168.0.30:8000/" + data.path2}
                alt="Property Image"
                style={{ width: "600px", height: "400px" }}
              />
            </div>
            <div>
              <img
                src={"http://192.168.0.30:8000/" + data.path3}
                alt="Property Image"
                style={{ width: "600px", height: "400px" }}
              />
            </div>
          </Carousel>
          <div className="keyContent">
            <h3>중요 정보</h3>
            <p>계약 방식: {data.propertyType}</p>
            {data.propertyType === "매매" && <p>가격: {data.price}</p>}
            {data.propertyType === "전세" && <p>보증금: {data.deposit}</p>}
            {data.propertyType === "월세" && (
              <p>
                보증금: {data.deposit}, 월세: {data.monthlyRent}
              </p>
            )}
            <p>주소: {data.address}</p>
            <p>방 구조: {data.structure}</p>
            {/* <p>옵션: {data.options.join(", ")}</p> */}
            <HeartButton like={like} onClick={toggleLike} />
            {/* <Detail content={content} /> */}
          </div>
        </div>
        <div className="content">
          <h3>상세 정보</h3>
          <p>{data.additionalInfo}</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ListingDetail;
