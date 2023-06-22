// // import React from "react";
// // import example from "../assets/example.json";
// // import Footer from "../components/Footer";
// // import Header from "../components/Header";
// // import { Carousel } from "react-responsive-carousel";
// // import "react-responsive-carousel/lib/styles/carousel.min.css";
// // import "./stylePages.css";
// // import { useParams } from "react-router-dom";

// // const ListingDetail = () => {
// //   const storedData = sessionStorage.getItem("myData");
// //   const data = JSON.parse(storedData);
// //   const { saleItem } = useParams();
// //   const itemData = example.find((item) => item.saleItem === saleItem);

// //   return (
// //     <div className="listingDetail">
// //       <Header />
// //       <div className="listingDetailForm">
// //         <h1>상세 정보</h1>
// //         <div className="top">
// //           <Carousel className="imgTotal" showThumbs={false}>
// //             <div>
// //               <img
// //                 src={itemData.img1}
// //                 alt="Property Image"
// //                 style={{ width: "600px", height: "400px" }}
// //               />
// //             </div>
// //             <div>
// //               <img
// //                 src={itemData.img2}
// //                 alt="Property Image"
// //                 style={{ width: "600px", height: "400px" }}
// //               />
// //             </div>
// //             <div>
// //               <img
// //                 src={itemData.img3}
// //                 alt="Property Image"
// //                 style={{ width: "600px", height: "400px" }}
// //               />
// //             </div>
// //           </Carousel>
// //           <div className="keyContent">
// //             <h3>중요 정보</h3>
// //             <p>계약 방식: {itemData.propertyType}</p>
// //             <p>가격: {itemData.price}</p>
// //             <p>주소: {itemData.address}</p>
// //             <p>방 구조: {itemData.structure}</p>
// //             <p>옵션: {itemData.options.join(", ")}</p>
// //           </div>
// //         </div>
// //         <div className="content">
// //           <h3>상세 정보</h3>
// //           <p>{itemData.detailInfo}</p>
// //         </div>
// //       </div>
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default ListingDetail;

// import React from "react";
// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import "./stylePages.css";

// const ListingDetail = () => {
//   const storedData = sessionStorage.getItem("myData");
//   const data = JSON.parse(storedData);

//   return (
//     <div className="listingDetail">
//       <Header />
//       <div className="listingDetailForm">
//         <h1>상세 정보</h1>
//         <div className="top">
//           <Carousel className="imgTotal" showThumbs={false}>
//             {/* {data.img.map((imgUrl, index) => ( */}
//             {/* <div key={index}> */}
//             <div>
//               <img
//                 src={"http://localhost:8000/uploads/" + data.img1}
//                 alt="Property Image"
//                 style={{ width: "600px", height: "400px" }}
//               />
//             </div>
//             {/* ))} */}
//           </Carousel>
//           <div className="keyContent">
//             <h3>중요 정보</h3>
//             <p>계약 방식: {data.propertyType}</p>
//             <p>가격: {data.price}</p>
//             <p>주소: {data.address}</p>
//             <p>방 구조: {data.structure}</p>
//             {/* <p>옵션: {data.options.join(", ")}</p> */}
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

import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./stylePages.css";

const ListingDetail = () => {
  const storedData = sessionStorage.getItem("myData");
  const data = JSON.parse(storedData);

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
                src={"http://localhost:8000/uploads/" + data.img1}
                alt="Property Image"
                style={{ width: "600px", height: "400px" }}
              />
            </div>
            <div>
              <img
                src={"http://localhost:8000/uploads/" + data.img2}
                alt="Property Image"
                style={{ width: "600px", height: "400px" }}
              />
            </div>
            <div>
              <img
                src={"http://localhost:8000/uploads/" + data.img3}
                alt="Property Image"
                style={{ width: "600px", height: "400px" }}
              />
            </div>
            {/* ))}  */}
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
