import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    propertyType: '매매',
    address: "", //주소
    price: 0, //매매가
    deposit: 0, //전세가
    monthlyRent: 0, //월세가
    structure: '원룸',
    additionalInfo: "",
    options: [],
    files: {
      file1: null,
      file2: null,
      file3: null
    },
    userid: localStorage.getItem("userid") || "test",
  });

  const handleChange = (event) => {
    const { name, value, type,  files } = event.target;

 if (type === 'file') {
      setFormData({
        ...formData,
        files: {
          ...formData.files,
          [name]: files[0]
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [err, setError] = useState(null);


//체크박스 옵션 처리.
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

      setFormData((prevInputs) => ({
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
    setFormData((prevInputs) => ({
      ...prevInputs,
      address: fullAddress,
    }));
  };



  //  입력 내용 서버로 전송
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const data = new FormData();
    data.append('propertyType', formData.propertyType);
    data.append('address', formData.address);
    data.append('price', formData.price);
    data.append('deposit', formData.deposit);
    data.append('monthlyRent', formData.monthlyRent);
    data.append('structure', formData.structure);
    data.append('additionalInfo', formData.additionalInfo);
    data.append('options', formData.options);
    data.append('userid', formData.userid);
    

    // 파일 업로드 전송
    Object.entries(formData.files).forEach(([key, file]) => {
      if (file) {
        data.append(key, file);
      }
    });

      await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      alert("성공적으로 게시물이 등록되었습니다.");
      navigate("/myLists");
    } catch (error) {
      alert("Error uploading data:", error);
    }
  };



  return (
    <div>
      <Header />
      <div className="uploadTitle">
        <h2>내 방 올리기</h2>
      </div>
      <div className="upload">
        <form onSubmit={handleSubmit}>
          <div className="uploadContentTotal">
            <div className="uploadContent1">
              {" "}
              <h3>위치 등록</h3>
              <p>
                주소 검색: <div style={{ color: "red" }}>{formData.address}</div>
              </p>
              <div className="searchAddress">
                <DaumPostcode
                  onComplete={handleAddressSelect}
                  autoClose={false}
                />
              </div>
            </div>
            <div className="uploadContent2">
              <h3>계약 방식</h3>
              <div>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                >
                  <option value="매매">매매</option>
                  <option value="전세">전세</option>
                  <option value="월세">월세</option>
                </select>
              </div>
              <div className="매매방식에 따른 입력">
                {formData.propertyType === "매매" && (
                  <div>
                    <label>
                      매매가격:
                      <input
                        type="text"
                        placeholder="만원 단위로 입력해주세요"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                )}
                {formData.propertyType === "전세" && (
                  <div>
                    <label>
                      전세가:
                      <input
                        type="text"
                        placeholder="만원 단위로 입력해주세요"
                        name="deposit"
                        value={formData.deposit}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                )}
                {formData.propertyType === "월세" && (
                  <div>
                    <label>
                      보증금:
                      <input
                        type="text"
                        placeholder="만원 단위로 입력해주세요"
                        name="deposit"
                        value={formData.deposit}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      월세:
                      <input
                        type="text"
                        placeholder="만원 단위로 입력해주세요"
                        name="monthlyRent"
                        value={formData.monthlyRent}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                )}
              </div>

              <h3>방 구조</h3>
              <label>
                <select
                  name="structure"
                  value={formData.structure}
                  onChange={handleChange}
                >
                  <option value="원룸">원룸</option>
                  <option value="1.5룸">1.5룸</option>
                  <option value="2룸 이상">2룸 이상</option>
                </select>
              </label>
              <div>
                <h3>해당 옵션</h3>
<div>
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
</div>
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
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3>사진 등록</h3>
                <label htmlFor="files1">upload 1</label>
        <input type="file" name="file1" onChange={handleChange} />
                <label htmlFor="files2">upload 2</label>
        <input type="file" name="file2" onChange={handleChange} />
                <label htmlFor="files3">upload 3</label>
        <input type="file" name="file3" onChange={handleChange} />
              </div>
              <div>
                {/* {selectedFiles.map((file, index) => (
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
                ))} */}
              </div>
              <h3>추가 정보</h3>
              <h5>상세 설명을 적어주세요</h5>
        <textarea style={{ width: "400px", height: "60px" }}  name="additionalInfo" value={formData.textarea} onChange={handleChange} />
              <div className="uploadButton">
              <button type="submit">매물 등록</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UploadPage;
