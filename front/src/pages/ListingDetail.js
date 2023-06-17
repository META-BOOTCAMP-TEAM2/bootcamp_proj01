import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./stylePages.css";
import example from "../assets/example.json";

const ListingDetail = () => {
  const storedData = sessionStorage.getItem("myData");
  const data = JSON.parse(storedData);
  console.log(typeof data);
  console.log(typeof example);
  const itemsPerRow = 4; // 한 줄에 표시할 항목 수

  const rows = data.reduce((accumulator, currentValue, index) => {
    const rowIndex = Math.floor(index / itemsPerRow);
    if (!accumulator[rowIndex]) {
      accumulator[rowIndex] = [];
    }
    accumulator[rowIndex].push(currentValue);
    return accumulator;
  }, []);

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
                  <img src={item.img} alt="Property" style={{ width: "300px", height: "200px" }} />
                </div>
                <div>계약 방식: {item.propertyType}</div>
                <br />
                <div>주소: {item.address}</div>
                <br />
                <div>가격: {item.price}</div>
                <br />
                <div>방 구조: {item.structure}</div>
                <br />
                <div>해당 옵션: {item.options.join(", ")}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default ListingDetail;
