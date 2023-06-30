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
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./stylePages.css";
import HeartButton from "../components/heartButton";
import addressChange from "../components/addressChange";
const { kakao } = window;

const ListingDetail = (props) => {
  const [like, setLike] = useState(false);
  const userId = localStorage.getItem("id");
  const storedData = sessionStorage.getItem("myData");

  const data = JSON.parse(storedData);
  const postId = data.id;
  const sessionUserId = data.userid;
  const localUserId = localStorage.getItem("userid");
  const [showButton, setShowButton] = useState(false);
  const [contentHeight, setContentHeight] = useState(310); // 기본 높이
  console.log(data.address);

  const fetchData = async () => {
    const res = await axios.get(`/like/${userId}/${postId}`);
    console.log(res.data.length);
    if (res.data.length !== 0) setLike(true);
  };

  const navigate = useNavigate();

  const deleteData = async () => {
    const res = await axios.delete(`/post/${postId}`, {
      data: {
        postid: postId, // 매물의 ID
        userid: userId, // 로컬 스토리지에서 가져온 사용자 ID
      },
    });
    alert("삭제하시겠습니까?");
    navigate("/mypage");

    console.log(res.data);
  };
  // const deleteData = async () => {
  //   try {
  //     const res = await axios.delete(`/post/${postId}`, {
  //       data: {
  //         postid: postId, // 매물의 ID
  //         userid: userId, // 로컬 스토리지에서 가져온 사용자 ID
  //       },
  //     });
  //     sessionStorage.removeItem("myData");
  //     window.location.href - "/mypage";
  //   } catch (error) {
  //     console.log("hi");
  //   }
  // };

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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (localUserId && localUserId === sessionUserId) {
      setShowButton(true); // 버튼 보이기
      setContentHeight(310); // 컨텐츠 높이 변경
    } else {
      setShowButton(false); // 버튼 숨기기
      setContentHeight(360); // 컨텐츠 높이 변경
    }
  }, [localUserId, sessionUserId]);

  useEffect(() => {
    const mapContainer = document.getElementById("map");

    const getAddressPosition = async () => {
      try {
        const position = await addressChange(data.address);
        const options = {
          center: new kakao.maps.LatLng(position.lat, position.lng),
          level: 5,
        };
        const map = new kakao.maps.Map(mapContainer, options);
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(position.lat, position.lng),
          map: map,
        });
      } catch (error) {
        console.log(error);
      }
    };

    getAddressPosition();
  }, [data]);

  return (
    <>
      <Header />
      <div className="ListingDetail">
        <div className="listingDetail">
          <div className="listingDetailTitle">
            <h2>상세 정보</h2>
          </div>
          <div className="listingDetailContentTotal">
            <div className="listingDetailContentTop">
              <Carousel className="listingDetailImgTotal" showThumbs={false}>
                <img
                  src={"http://192.168.0.30:8000/" + data.path1}
                  alt="Property Image"
                  style={{ width: "600px", height: "400px" }}
                />
                <img
                  src={"http://192.168.0.30:8000/" + data.path2}
                  alt="Property Image"
                  style={{ width: "600px", height: "400px" }}
                />
                <img
                  src={"http://192.168.0.30:8000/" + data.path3}
                  alt="Property Image"
                  style={{ width: "600px", height: "400px" }}
                />
              </Carousel>
              <div className="listingDetailContentTopSide">
                {showButton && (
                  <button
                    id="DeleteButton"
                    type="submit"
                    className="listingDelete"
                    onClick={deleteData}
                  >
                    게시물 삭제
                  </button>
                )}
                <div className="listingDetailKeyContent" style={{ height: `${contentHeight}px` }}>
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
                  <div className="listingDetailHeart">
                    <HeartButton like={like} onClick={toggleLike} />
                    찜하기
                  </div>
                  {/* <Detail content={content} /> */}
                </div>
              </div>
            </div>
            <div className="listingDetailContentBottom">
              <div className="listingDetailSubContent">
                <h3>부가 설명</h3>
                <p>{data.additionalInfo}</p>
                <p>옵션: {data.options}</p>
              </div>
              <div className="listingDetailMap">
                <h3>위치 확인</h3>
                <div id="map" style={{ width: "400px", height: "300px" }}></div>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListingDetail;
