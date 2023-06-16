import { useQueryClient, useQuery } from "react-query";
import React from "react";
// import example from "../assets/data2.json";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

const Listing = () => {
  const queryClient = useQueryClient();
  const { query } = useQuery("markerInfo", () => axios.get("/room").then(({ data }) => data));
  // query 안에 data, isLoading, isSuccess, isError 등 다양한게 있다.
  console.log(query);

  // const { isLoading, error, data } = useQuery({
  //   queryKey: ["Info"],
  //   queryFn: () => fetch("/room").then((res) => res.json()),
  // });
  // console.log(data);

  // if (isLoading) return "Loading...";

  // if (error) return "An error has occurred: " + error.message;
  const itemsPerRow = 3; // 한 줄에 표시할 항목 수

  // data 배열을 itemsPerRow만큼씩 나누어 2차원 배열로 변환
  if (!query) {
    return <div>hi</div>;
  } else {
    const rows = query.reduce((accumulator, currentValue, index) => {
      const rowIndex = Math.floor(index / itemsPerRow);
      if (!accumulator[rowIndex]) {
        accumulator[rowIndex] = [];
      }
      accumulator[rowIndex].push(currentValue);
      return accumulator;
    }, []);

    return (
      <div>
        <Header />
        <h1>동산동의 매물 목록</h1>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex", width: "100%" }}>
              {row.map((item, itemIndex) => (
                <div key={itemIndex} style={{ flex: "0.25%", padding: "5px" }}>
                  <div>
                    <img src={item.img} alt="Property" style={{ width: "20rem", height: "auto" }} />
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
        <Footer />
      </div>
    );
  }
};

export default Listing;
