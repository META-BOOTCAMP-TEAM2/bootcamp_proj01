import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";

const UploadPage = () => {
  const [inputs, setInputs] = useState({
    propertyType: "매매", //계약방식
    address: "", //주소
    price: "", //매매가
    deposit: "", //전세가
    monthlyRent: "", //월세가
    structure: "원룸", //방구조
    additionalInfo: "",
    // options: [],
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [err, setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((prevOption) => prevOption !== option)
      : [...selectedOptions, option];

    setInputs((prevInputs) => ({
      ...prevInputs,
      options: updatedOptions, // 선택한 옵션을 업데이트된 options으로 설정
    }));

    return updatedOptions; // 업데이트된 options 반환
  };

  //카카오 주소검색

  useEffect(() => {
    handleAddressSearch();
  }, []);

  const handleAddressSearch = () => {
    // 주소 검색 모달 열기
  };

  const handleAddressSelect = (data) => {
    const fullAddress = data.address;
    setInputs((prevInputs) => ({
      ...prevInputs,
      address: fullAddress,
    }));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();

      // inputs 값 추가
      for (const [key, value] of Object.entries(inputs)) {
        formData.append(key, value);
      }

      // 이미지 파일 추가
      for (const file of selectedFiles) {
        formData.append("images", file);
      }

      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(`res.data 값: ${res.data}`);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="upload">
        <Header />

        <form className="uploadForm">
          <h2>내 방 올리기</h2>
          <h3>계약 방식</h3>
          <div>
            <select
              name="propertyType"
              value={inputs.propertyType}
              onChange={handleChange}
            >
              <option value="매매">매매</option>
              <option value="전세">전세</option>
              <option value="월세">월세</option>
            </select>
          </div>
          <br />

          <div className="매매방식에 따른 입력">
            {inputs.propertyType === "매매" && (
              <div>
                <label>
                  매매가격:
                  <input
                    type="text"
                    placeholder="만원 단위로 입력해주세요"
                    name="price"
                    value={inputs.price}
                    onChange={handleChange}
                  />
                </label>
              </div>
            )}
            {inputs.propertyType === "전세" && (
              <div>
                <label>
                  전세가:
                  <input
                    type="text"
                    placeholder="만원 단위로 입력해주세요"
                    name="deposit"
                    value={inputs.deposit}
                    onChange={handleChange}
                  />
                </label>
                <br />
              </div>
            )}
            {inputs.propertyType === "월세" && (
              <div>
                <label>
                  보증금:
                  <input
                    type="text"
                    placeholder="만원 단위로 입력해주세요"
                    name="deposit"
                    value={inputs.deposit}
                    onChange={handleChange}
                  />
                </label>
                <br />
                <label>
                  월세:
                  <input
                    type="text"
                    placeholder="만원 단위로 입력해주세요"
                    name="monthlyRent"
                    value={inputs.monthlyRent}
                    onChange={handleChange}
                  />
                </label>
              </div>
            )}
          </div>
          <br />
          <br />
          <h3>위치 등록</h3>
          <br />
          <p>
            주소 검색: <div style={{ color: "red" }}>{inputs.address}</div>
          </p>
          <br />
          {/* 주소 검색 모달 */}
          <div className="searchAddress">
            <DaumPostcode onComplete={handleAddressSelect} autoClose={false} />
          </div>
          <br />
          <br />

          <br />
          <br />
          <h3>방 구조</h3>
          <label>
            <select
              name="structure"
              value={inputs.structure}
              onChange={handleChange}
            >
              <option value="원룸">원룸</option>
              <option value="1.5룸">1.5룸</option>
              <option value="2룸 이상">2룸 이상</option>
            </select>
          </label>

          <br />
          <br />
          <div className="기자재 추가 옵션">
            <h3>해당 옵션</h3>
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
          </div>
          <br />
          <br />
          <h3>사진 등록</h3>
          <input type="file" multiple onChange={handleFileChange} />
          <br />
          <div>
            {selectedFiles.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Image ${index + 1}`}
                style={{
                  width: "250px",
                  height: "200px",
                  marginRight: "20px",
                }}
              />
            ))}
          </div>
          <br />
          <h3>추가 정보</h3>
          <div>상세 설명을 적어주세요 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <textarea
            style={{ width: "400px", height: "60px" }}
            name="additionalInfo"
            value={inputs.additionalInfo}
            onChange={handleChange}
          ></textarea>
          <br />
          <br />
          <div className="uploadButton">
            <button onClick={handleSubmit}>매물 등록</button>
          </div>
        </form>

        <Footer />
      </div>
    </>
  );
};

export default UploadPage;
