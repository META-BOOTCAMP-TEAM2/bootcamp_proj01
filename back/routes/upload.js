/*eslint-disable*/
const express = require("express");
const router = express.Router();
const logger = require("../lib/logger");
// const { isLoggedIn } = require("../lib/middleware");
const fs = require("fs");
const multer = require("multer");
const postService = require("../service/postService");

const uploadDir = "uploads";
// 파일 저장을 위한 Multer 설정
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 파일이 저장될 경로를 지정합니다.
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // 파일명을 설정합니다. 원하는 방식으로 파일명을 변경할 수 있습니다.
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
// Multer 미들웨어를 생성합니다.
const upload = multer({ storage: storage });

// 등록
router.post(
  "/",
  upload.fields([
    { name: "file1", maxCount: 1 },
    { name: "file2", maxCount: 1 },
    { name: "file3", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
console.log(req.files);
console.log(req.body);

      const params = {
        additionalInfo: req.body.additionalInfo, //상세정보
        address: req.body.address, //매물주소
        deposit: req.body.deposit, //전세가
        monthlyRent: req.body.monthlyRent, //월세가
        price: req.body.price, //매매
        propertyType: req.body.propertyType, //계약방식
        structure: req.body.structure, //방구조
        options: req.body.options, //
        path1: req.files.file1[0].path,
        path2: req.files.file2[0].path,
        path3: req.files.file3[0].path,

        userId: Number(1), //유저DB 고유넘버
        userid: req.body.userid, //유저아이디
      };

      const findAddressID = (address) => {
        const str = address;

        if (str.includes("서울")) {
          params.addressId = 1;
        } else if (str.includes("부산")) {
          params.addressId = 2;
        } else if (str.includes("대구")) {
          params.addressId = 3;
        } else if (str.includes("인천")) {
          params.addressId = 4;
        } else if (str.includes("광주")) {
          params.addressId = 5;
        } else if (str.includes("대전")) {
          params.addressId = 6;
        } else if (str.includes("울산")) {
          params.addressId = 7;
        } else if (str.includes("세종")) {
          params.addressId = 8;
        } else if (str.includes("경기")) {
          params.addressId = 9;
        } else if (str.includes("강원")) {
          params.addressId = 10;
        } else if (str.includes("충청북도")) {
          params.addressId = 11;
        } else if (str.includes("충청남도")) {
          params.addressId = 12;
        } else if (str.includes("전라북도")) {
          params.addressId = 13;
        } else if (str.includes("전라남도")) {
          params.addressId = 14;
        } else if (str.includes("경상북도")) {
          params.addressId = 15;
        } else if (str.includes("경상남도")) {
          params.addressId = 16;
        } else if (str.includes("제주")) {
          params.addressId = 17;
        } else {
          params.addressId = 18; // 찾을 수 없는 경우
        }

        return params.addressId;
      };
      findAddressID(params.address);

      strParamsOption = params.options.join();
      params.options = strParamsOption;

      logger.info(`(upload.reg.params) ${JSON.stringify(params)}`);
      //이미지 파일 업로드확인.
      if (!req.files) {
        const err = new Error("파일 업로드 실패");
        logger.error(err);
        res.status(500).json(err);
      }

      // 비즈니스 로직 호출
      const result = await postService.reg(params);
      logger.info(`(upload.reg.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
