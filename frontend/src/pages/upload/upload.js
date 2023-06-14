import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import DaumPostcode from "react-daum-postcode";
import { Link } from "react-router-dom";

const UploadPage = () => {
  const [propertyType, setPropertyType] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [deposit, setDeposit] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  useEffect(() => {
    handleAddressSearch();
  }, []);

  const handleAddressSearch = () => {
    // 주소 검색 모달 열기
  };

  const handleAddressSelect = (data) => {
    const fullAddress = data.address;
    setAddress(fullAddress);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleUpload = () => {
    // 업로드 처리 로직 작성
  };

  //@@가격 입력
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDepositChange = (event) => {
    setDeposit(event.target.value);
  };

  const handleMonthlyRentChange = (event) => {
    setMonthlyRent(event.target.value);
  };

  return (
    <>
      <Header />
      <h2>내 방 올리기</h2>
      <h3>계약 방식</h3>
      <form onSubmit={handleUpload}>
        <label>
          <input
            type="radio"
            name="propertyType"
            value="매매"
            checked={propertyType === "매매"}
            onChange={handlePropertyTypeChange}
          />
          매매
        </label>

        <label>
          <input
            type="radio"
            name="propertyType"
            value="전세"
            checked={propertyType === "전세"}
            onChange={handlePropertyTypeChange}
          />
          전세
        </label>

        <label>
          <input
            type="radio"
            name="propertyType"
            value="월세"
            checked={propertyType === "월세"}
            onChange={handlePropertyTypeChange}
          />
          월세
        </label>
        <br />
        <br />
        <p>주소 검색: {address}</p>

        {/* 주소 검색 모달 */}
        <DaumPostcode onComplete={handleAddressSelect} autoClose={true} />
        <br />
        <br />
        {propertyType === "매매" && (
          <div>
            <label>
              매매가격:
              <input type="text" value={price} onChange={handlePriceChange} />
            </label>
          </div>
        )}

        {propertyType === "전세" && (
          <div>
            <label>
              보증금:
              <input
                type="text"
                value={deposit}
                onChange={handleDepositChange}
              />
            </label>
            <br />
            <label>
              월세:
              <input
                type="text"
                value={monthlyRent}
                onChange={handleMonthlyRentChange}
              />
            </label>
          </div>
        )}

        {propertyType === "월세" && (
          <div>
            <label>
              보증금:
              <input
                type="text"
                value={deposit}
                onChange={handleDepositChange}
              />
            </label>
            <br />
            <label>
              월세:
              <input
                type="text"
                value={monthlyRent}
                onChange={handleMonthlyRentChange}
              />
            </label>
          </div>
        )}
        <br />
        <br />
        <input type="file" multiple onChange={handleFileChange} />
        <br />
        <br />
        <div>
          {selectedFiles.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`Image ${index + 1}`}
              style={{ width: "200px", marginRight: "10px" }}
            />
          ))}
        </div>
        <br />
        <br />
        <Link to="/MyPage">
          <button type="submit">매물 등록</button>
        </Link>
      </form>

      <Footer />
    </>
  );
};

export default UploadPage;
