import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const [inputs, setInputs] = useState({
    propertyType: "매매", //계약방식
    address: "", //주소
    price: 0, //매매가
    deposit: 0, //전세가
    monthlyRent: 0, //월세가
    structure: "원룸", //방구조
    additionalInfo: "",
    userid: localStorage.getItem("userid"),
    options: [],
  });

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

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 나머지 입력 내용 서버로 전송
      const res = await axios.post("/post", inputs);
      alert("성공적으로 게시물이 등록되었습니다.");
      navigate("/myLists");
    } catch (error) {
      alert("Error uploading data:", error);
    }
  };

  //////파일 업로드

  return (
    <div>
      <Header />
      <div className="upload">
        <form>
          <div className="uploadTitle">
            <h2>내 방 올리기</h2>
          </div>
          <div className="uploadContentTotal">
            <div className="uploadContent1">
              {" "}
              <h3>위치 등록</h3>
              <p>
                주소 검색: <div style={{ color: "red" }}>{inputs.address}</div>
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
                  value={inputs.propertyType}
                  onChange={handleChange}
                >
                  <option value="매매">매매</option>
                  <option value="전세">전세</option>
                  <option value="월세">월세</option>
                </select>
              </div>
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
              <div>
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
              <h3>사진 등록</h3>
              <input type="file" multiple onChange={handleFileChange} />
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
              <h3>추가 정보</h3>
              <div>상세 설명을 적어주세요 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <textarea
                style={{ width: "400px", height: "60px" }}
                name="additionalInfo"
                value={inputs.additionalInfo}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div className="uploadButton">
            <button onClick={handleSubmit}>매물 등록</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UploadPage;

// const handleUpload1 = async (e) => {
//   e.preventDefault();
//   const formData = new FormData();
//   formData.append("file", selectedFiles[0]);

//   try {
//     await axios.post("/upload", formData).then((res) => {
//       console.log(res.data);
//       let { originalName, filename, path } = res.data;
//       setInputs((prevInputs) => ({
//         ...prevInputs,
//         originalName1: originalName,
//         filename1: filename,
//         path1: path,
//       }));
//     });
//     alert("파일1 업로드 완료");
//     console.log(inputs);
//   } catch (error) {
//     const err = error.message;
//     console.log(`Error uploading file: ${err}`);
//   }
// };
// const handleUpload2 = async (e) => {
//   e.preventDefault();
//   const formData = new FormData();
//   formData.append("file", selectedFiles[1]);

//   try {
//     await axios.post("/upload", formData).then((res) => {
//       console.log(res.data);
//       let { originalName, filename, path } = res.data;
//       setInputs((prevInputs) => ({
//         ...prevInputs,
//         originalName2: originalName,
//         filename2: filename,
//         path2: path,
//       }));
//     });
//     alert("파일2 업로드 완료");
//     console.log(inputs);
//   } catch (error) {
//     const err = error.message;
//     console.log(`Error uploading file: ${err}`);
//   }
// };
// const handleUpload3 = async (e) => {
//   e.preventDefault();
//   const formData = new FormData();
//   formData.append("file", selectedFiles[2]);

//   try {
//     await axios.post("/upload", formData).then((res) => {
//       console.log(res.data);
//       let { originalName, filename, path } = res.data;
//       setInputs((prevInputs) => ({
//         ...prevInputs,
//         originalName3: originalName,
//         filename3: filename,
//         path3: path,
//       }));
//     });
//     alert("파일3 업로드 완료");
//     console.log(inputs);
//   } catch (error) {
//     const err = error.message;
//     console.log(`Error uploading file: ${err}`);
//   }
// };
