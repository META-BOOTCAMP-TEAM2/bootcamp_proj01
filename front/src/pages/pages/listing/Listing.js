import React from "react";
import example from "./example";

const Listing = () => {
  const itemsPerRow = 3; // 한 줄에 표시할 항목 수

  // example 배열을 itemsPerRow만큼씩 나누어 2차원 배열로 변환
  const rows = example.reduce((accumulator, currentValue, index) => {
    const rowIndex = Math.floor(index / itemsPerRow);
    if (!accumulator[rowIndex]) {
      accumulator[rowIndex] = [];
    }
    accumulator[rowIndex].push(currentValue);
    return accumulator;
  }, []);

  return (
    <div>
      <h1>동산동의 매물 목록</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex", width: "100%" }}>
            {row.map((item, itemIndex) => (
              <div key={itemIndex} style={{ flex: "0.25%", padding: "5px" }}>
                <div>
                  <img
                    src={item.img}
                    alt="Property"
                    style={{ width: "20rem", height: "auto" }}
                  />
                </div>
                <div>계약 방식: {item.propertyType}</div>
                <div>주소: {item.address}</div>
                <div>가격: {item.price}</div>
                <div>방 구조: {item.structure}</div>
                <div>해당 옵션: {item.options.join(", ")}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listing;
