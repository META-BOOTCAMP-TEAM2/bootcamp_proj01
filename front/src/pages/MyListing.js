import React, { useState, useEffect, useRef } from "react";
import example from "../assets/example.json";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./stylePages.css";

const Listing = () => {
  const [filteredPropertyType, setFilteredPropertyType] = useState(null);
  const [sortByPrice, setSortByPrice] = useState(null);

  const itemsPerRow = 3;
  const allButtonRef = useRef(null);
  useEffect(() => {
    allButtonRef.current.focus();
  }, []);

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

  let filteredItems = filteredPropertyType
    ? example.filter((item) => item.propertyType === filteredPropertyType)
    : example;

  if (sortByPrice === "expensive") {
    filteredItems = filteredItems.sort((a, b) => b.price - a.price);
  } else if (sortByPrice === "cheap") {
    filteredItems = filteredItems.sort((a, b) => a.price - b.price);
  }

  const rows = filteredItems.reduce((accumulator, currentValue, index) => {
    const rowIndex = Math.floor(index / itemsPerRow);
    if (!accumulator[rowIndex]) {
      accumulator[rowIndex] = [];
    }
    accumulator[rowIndex].push(currentValue);
    return accumulator;
  }, []);

  const propertyTypes = ["매매", "전세", "월세"];
  const priceOptions = [
    { label: "높은 가격순", value: "expensive" },
    { label: "낮은 가격순", value: "cheap" },
  ];

  return (
    <div className="listing">
      <Header />
      <h1>매물 목록</h1>
      <div className="filters">
        <div className="propertyType">
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
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
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
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
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((item, itemIndex) => (
            <div key={itemIndex} className="item">
              <div className="box">
                <div>
                  <img
                    src={item.img}
                    alt="Property"
                    style={{ width: "300px", height: "200px" }}
                  />
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

export default Listing;
