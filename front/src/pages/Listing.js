// import React from "react";
// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import "./stylePages.css";

// const Listing = () => {
//   const storedData = sessionStorage.getItem("myData");
//   const data = JSON.parse(storedData);
//   const itemsPerRow = 4; // 한 줄에 표시할 항목 수
//   const imgClick = (item) => {
//     const newUrl = `http://localhost:3000/listDetail/${item.id}`;
//     const newWindow = window.open(newUrl);
//     newWindow.sessionStorage.setItem("myData", JSON.stringify(item));
//   };

//   const rows = data.reduce((accumulator, currentValue, index) => {
//     const rowIndex = Math.floor(index / itemsPerRow);
//     if (!accumulator[rowIndex]) {
//       accumulator[rowIndex] = [];
//     }
//     accumulator[rowIndex].push(currentValue);
//     return accumulator;
//   }, []);
//   console.log(data[1]);

//   return (
//     <div className="listing">
//       <Header />
//       <h1>매물 목록</h1>
//       {rows.map((row, rowIndex) => (
//         <div key={rowIndex} className="row">
//           {row.map((item, itemIndex) => (
//             <div key={itemIndex} className="item">
//               <div className="box">
//                 <div>
//                   <img
//                     src={"http://localhost:8000/uploads/" + item.img1}
//                     alt="Property"
//                     style={{ width: "300px", height: "200px" }}
//                     onClick={() => imgClick(item)}
//                   />
//                 </div>
//                 <div>계약 방식: {item.propertyType}</div>
//                 <br />
//                 <div>주소: {item.address}</div>
//                 <br />
//                 <div>가격: {item.price}</div>
//                 <br />
//                 <div>방 구조: {item.structure}</div>
//                 <br />
//                 {/* <div>해당 옵션: {item.options.join(", ")}</div> */}
//               </div>
//             </div>
//           ))}
//         </div>
//       ))}
//       <Footer />
//     </div>
//   );
// };

// export default Listing;

import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./stylePages.css";

const Listing = () => {
  const storedData = sessionStorage.getItem("myData");
  const data = JSON.parse(storedData);
  const itemsPerRow = 3; // 한 줄에 표시할 항목 수
  console.log("1");
  const imgClick = (item) => {
    const newUrl = `http://localhost:3000/listDetail`;
    const newWindow = window.open(newUrl);
    newWindow.sessionStorage.setItem("myData", JSON.stringify(item));
  };

  const rows = data.reduce((accumulator, currentValue, index) => {
    const rowIndex = Math.floor(index / itemsPerRow);
    if (!accumulator[rowIndex]) {
      accumulator[rowIndex] = [];
    }
    accumulator[rowIndex].push(currentValue);
    return accumulator;
  }, []);
  console.log(data);

  return (
    <div className="listing">
      <Header />
      <h1>매물 목록</h1>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((item, itemIndex) => (
            <div key={itemIndex} className="item">
              <div className="box">
                <div>
                  <img
                    src={"http://localhost:8000/uploads/" + item.filename1}
                    alt="Property"
                    style={{ width: "300px", height: "200px" }}
                    onClick={() => imgClick(item)}
                  />
                </div>
                <div>계약 방식: {item.propertyType}</div>
                <br />
                <div>주소: {item.address}</div>
                <br />
                {item.propertyType === "매매" && (
                  <div>매매가: {item.price}</div>
                )}
                {item.propertyType === "전세" && (
                  <div>보증금: {item.deposit}</div>
                )}
                {item.propertyType === "월세" && (
                  <div>
                    보증금: {item.deposit}, 월세: {item.monthlyRent}
                  </div>
                )}
                <br />
                <div>방 구조: {item.structure}</div>
                <br />
                {/* <div>해당 옵션: {item.options.join(", ")}</div> */}
              </div>
            </div>
          ))}
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default Listing;
