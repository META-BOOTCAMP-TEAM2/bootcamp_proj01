import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DaumPostcode from "react-daum-postcode";
import { Link } from "react-router-dom";

const UploadPage = () => {
  const [propertyType, setPropertyType] = useState(""); //계약 방식
  const [selectedFiles, setSelectedFiles] = useState([]); //사진 파일
  const [address, setAddress] = useState(""); //주소 등록
  const [price, setPrice] = useState(""); //매매 가격
  const [deposit, setDeposit] = useState(""); //전세 가격
  const [monthlyRent, setMonthlyRent] = useState(""); //월세 가격
  const [structure, setStructure] = useState(""); //방 구조
  const [selectedOptions, setSelectedOptions] = useState([]); //옵션 선택

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  const handleStructureChange = (event) => {
    setStructure(event.target.value);
  };

  const handleOptionChange = (event) => {
    const option = event.target.value;
    setSelectedOptions((prevOptions) => {
      if (prevOptions.includes(option)) {
        return prevOptions.filter((prevOption) => prevOption !== option);
      } else {
        return [...prevOptions, option];
      }
    });
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
              <input
                type="text"
                placeholder="만원 단위로 입력해주세요"
                value={price}
                onChange={handlePriceChange}
              />
            </label>
          </div>
        )}

        {propertyType === "전세" && (
          <div>
            <label>
              보증금:
              <input
                type="text"
                placeholder="만원 단위로 입력해주세요"
                value={deposit}
                onChange={handleDepositChange}
              />
            </label>
            <br />
            <label>
              월세:
              <input
                type="text"
                placeholder="만원 단위로 입력해주세요"
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
                placeholder="만원 단위로 입력해주세요"
                value={deposit}
                onChange={handleDepositChange}
              />
            </label>
            <br />
            <label>
              월세:
              <input
                type="text"
                placeholder="만원 단위로 입력해주세요"
                value={monthlyRent}
                onChange={handleMonthlyRentChange}
              />
            </label>
          </div>
        )}
        <br />
        <br />
        <label>
          <input
            type="radio"
            name="structure"
            value="원룸"
            checked={structure === "원룸"}
            onChange={handleStructureChange}
          />
          원룸
        </label>
        <label>
          <input
            type="radio"
            name="structure"
            value="1.5룸"
            checked={structure === "1.5룸"}
            onChange={handleStructureChange}
          />
          1.5룸
        </label>
        <label>
          <input
            type="radio"
            name="structure"
            value="2룸 이상"
            checked={structure === "2룸 이상"}
            onChange={handleStructureChange}
          />
          2룸 이상
        </label>
        <br />
        <br />
        <label>
          <input
            type="checkbox"
            name="options"
            value="냉장고"
            checked={selectedOptions.includes("냉장고")}
            onChange={handleOptionChange}
          />
          냉장고
        </label>
        <label>
          <input
            type="checkbox"
            name="options"
            value="세탁기"
            checked={selectedOptions.includes("세탁기")}
            onChange={handleOptionChange}
          />
          세탁기
        </label>
        <label>
          <input
            type="checkbox"
            name="options"
            value="에어컨"
            checked={selectedOptions.includes("에어컨")}
            onChange={handleOptionChange}
          />
          에어컨
        </label>
        <label>
          <input
            type="checkbox"
            name="options"
            value="침대"
            checked={selectedOptions.includes("침대")}
            onChange={handleOptionChange}
          />
          침대
        </label>
        <label>
          <input
            type="checkbox"
            name="options"
            value="책상"
            checked={selectedOptions.includes("책상")}
            onChange={handleOptionChange}
          />
          책상
        </label>
        <br />
        <br />
        <input type="file" multiple onChange={handleFileChange} />
        <br />

        <div>
          {selectedFiles.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`Image ${index + 1}`}
              style={{ width: "250px", height: "200px", marginRight: "20px" }}
            />
          ))}
        </div>
        <br />
        <div>상세 설명을 적어주세요 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        {/* <input type="text" style={{ width: "400px", height: "50px" }} /> */}
        <textarea style={{ width: "400px", height: "60px" }}></textarea>
        <br />
        <br />
        <Link to="/MyPage">
          <button type="submit">매물 등록</button>
        </Link>
      </form>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default UploadPage;
