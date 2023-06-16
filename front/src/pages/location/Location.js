import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import areas from "./areas";
import Map from "../../components/Map";
import "./Location.css";
import { useQuery } from "react-query";
import { fetchCoins } from "../.././components/ReactQuery";

const Location = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [hoveredArea, setHoveredArea] = useState("");

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedArea("");
    setHoveredArea("");
  };

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
    setHoveredArea("");
  };

  const handleAreaMouseEnter = (area) => {
    setHoveredArea(area);
  };

  const handleAreaMouseLeave = () => {
    setHoveredArea("");
  };

  return (
    <>
      <div className="location">
        <Header />
        <div className="table2">
          <table style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>시/도</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(areas).map((city) => (
                <tr key={city}>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                    }}
                    onMouseEnter={() => handleAreaMouseEnter(city)}
                    onMouseLeave={handleAreaMouseLeave}
                    onClick={() => handleCityChange({ target: { value: city } })}
                    className={selectedCity === city ? "selected" : ""}
                  >
                    {city}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table1">
          {selectedCity && (
            <table>
              <thead>
                <tr>
                  <th>지역을 선택하세요</th>
                </tr>
              </thead>
              <tbody>
                {areas[selectedCity].map((area) => (
                  <tr key={area}>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "5px",
                      }}
                      onMouseEnter={() => handleAreaMouseEnter(area)}
                      onMouseLeave={handleAreaMouseLeave}
                      onClick={() => handleAreaChange({ target: { value: area } })}
                      className={selectedArea === area ? "selected" : ""}
                    >
                      {area}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <Map selectedCity={selectedCity} selectedArea={selectedArea} hoveredArea={hoveredArea} />

        <Footer />
      </div>
    </>
  );
};

export default Location;
