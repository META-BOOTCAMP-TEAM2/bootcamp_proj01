import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import areas from "./areas";
import Map from "../../components/Map";
import "../stylePages.css";

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
    <div>
      <Header />
      <div className="location">
        <div className="locationTitle">
          <h2>지역을 선택하세요</h2>
        </div>
        <div className="locationContent">
          <div className="locationTable1">
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
          <div className="locationTable2">
            {selectedCity && (
              <table>
                <thead>
                  <tr>
                    <th>시/군/구</th>
                  </tr>
                </thead>
                <tbody>
                  {areas[selectedCity].map((area) => (
                    <tr key={area}>
                      <td
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
          <div className="locationMap">
            <p className="locationMapTitle">[ 지도 ]</p>{" "}
            <Map
              selectedCity={selectedCity}
              selectedArea={selectedArea}
              hoveredArea={hoveredArea}
            />
          </div>
        </div>{" "}
      </div>
      <Footer />
    </div>
  );
};

export default Location;
