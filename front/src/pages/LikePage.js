import React, { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./stylePages.css";
import axios from "axios";

const LikePage = () => {
  const [filteredPropertyType, setFilteredPropertyType] = useState(null);
  const [sortByPrice, setSortByPrice] = useState(null);
  const [rows, setRows] = useState([]);
  const itemsPerRow = 3;
  const allButtonRef = useRef(null);
  useEffect(() => {
    allButtonRef.current.focus();
  }, []);
  let currentUser = localStorage.getItem("id");
  //   const userid = localStorage.getItem("userid");

  useEffect(() => {
    const results = axios.get(`/like/${currentUser}`);
    results
      .then((result) => {
        let data = result.data;
        console.log(data);

        let filteredItems = filteredPropertyType
          ? data.filter((item) => item.propertyType === filteredPropertyType)
          : data;

        if (sortByPrice === "expensive") {
          if (
            filteredPropertyType === "전세" ||
            filteredPropertyType === "월세"
          ) {
            filteredItems = filteredItems.sort((a, b) => b.deposit - a.deposit);
          } else {
            filteredItems = filteredItems.sort((a, b) => b.price - a.price);
          }
        } else if (sortByPrice === "cheap") {
          if (
            filteredPropertyType === "전세" ||
            filteredPropertyType === "월세"
          ) {
            filteredItems = filteredItems.sort((a, b) => a.deposit - b.deposit);
          } else {
            filteredItems = filteredItems.sort((a, b) => a.price - b.price);
          }
        }

        const updatedRows = filteredItems.reduce(
          (accumulator, currentValue, index) => {
            const rowIndex = Math.floor(index / itemsPerRow);
            if (!accumulator[rowIndex]) {
              accumulator[rowIndex] = [];
            }
            accumulator[rowIndex].push(currentValue);
            return accumulator;
          },
          []
        );
        setRows(updatedRows);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentUser, filteredPropertyType, sortByPrice]);
  const storedData = sessionStorage.getItem("myData");
  const data = JSON.parse(storedData);
  const imgClick = (item) => {
    const newUrl = `http://localhost:3000/listDetail`;
    const newWindow = window.open(newUrl);
    newWindow.sessionStorage.setItem("myData", JSON.stringify(item));
  };

  const filterByPropertyType = (propertyType) => {
    setFilteredPropertyType(propertyType);
  };

  const clearFilters = () => {
    setFilteredPropertyType(null);
    setSortByPrice(null);
  };

  const sortItemsByPrice = (order) => {
    setSortByPrice(order);
  };

  const propertyTypes = ["매매", "전세", "월세"];
  const priceOptions = [
    { label: "높은 가격순", value: "expensive" },
    { label: "낮은 가격순", value: "cheap" },
  ];

  return (
    <>
      <Header />
      <div className="listing">
        <div className="listingBox">
          <div className="listingTitleTop">
            <h2>내가 찜한 매물 목록</h2>
          </div>
          <div className="listingFilters">
            <div className="propertyType">
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <button
                  ref={allButtonRef}
                  className="dropdown-item"
                  onClick={clearFilters}
                >
                  전체
                </button>
                {propertyTypes.map((propertyType) => (
                  <button
                    key={propertyType}
                    className="dropdown-item"
                    onClick={() => filterByPropertyType(propertyType)}
                  >
                    {propertyType}
                  </button>
                ))}
              </div>
            </div>
            <div className="priceType">
              <div className="dropdown">
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  {priceOptions.map((option) => (
                    <button
                      key={option.value}
                      className="dropdown-item"
                      onClick={() => sortItemsByPrice(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="listingPost">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="listingRow">
                {row.map((item, itemIndex) => (
                  <ul key={itemIndex} className="listingItem">
                    <li>
                      <img
                        src={"http://192.168.0.30:8000/" + item.path1}
                        alt="Property"
                        style={{ width: "300px", height: "200px" }}
                        onClick={() => imgClick(item)}
                      />
                    </li>
                    <li>계약 방식: {item.propertyType}</li>
                    <li>주소: {item.address}</li>
                    {item.propertyType === "매매" && (
                      <li>매매가: {item.price}</li>
                    )}
                    {item.propertyType === "전세" && (
                      <li>보증금: {item.deposit}</li>
                    )}
                    {item.propertyType === "월세" && (
                      <li>
                        보증금: {item.deposit}, 월세: {item.monthlyRent}
                      </li>
                    )}
                    <li>방 구조: {item.structure}</li>
                    {/* <div>해당 옵션: {item.options.join(", ")}</div> */}
                  </ul>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LikePage;
