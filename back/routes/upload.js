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
  console.log("업로드 폴더 없음. 폴더를 만듭니다.");
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

router.get("/", (req, res) => {
  // res.render("index", { title: "Upload" });
  res.render("index", { title: "Upload" });
});

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
      // const params = {
      //   additionalInfo: req.body.additionalInfo, //상세정보
      //   address: req.body.address, //매물주소
      //   deposit: req.body.deposit, //전세가
      //   monthlyRent: req.body.monthlyRent, //월세가
      //   price: req.body.price, //매매
      //   propertyType: req.body.propertyType, //계약방식
      //   structure: req.body.structure, //방구조

      //   filename1: req.files[0].filename,
      //   filename2: req.files[1].filename,
      //   filename3: req.files[2].filename,
      //   originalName1: req.files[0].originalName,
      //   originalName2: req.files[1].originalName,
      //   originalName3: req.files[2].originalName,

      //   path1: req.files[0].path,
      //   path2: req.files[1].path,
      //   path3: req.files[2].path,

      //   userId: Number(1), //유저DB 고유넘버
      //   userid: req.body.userid, //유저아이디
      // };
      const params = {
        additionalInfo: req.body.additionalInfo, //상세정보
        address: req.body.address, //매물주소
        deposit: req.body.deposit, //전세가
        monthlyRent: req.body.monthlyRent, //월세가
        price: req.body.price, //매매
        propertyType: req.body.propertyType, //계약방식
        structure: req.body.structure, //방구조

        filename1: req.body.filename1,
        filename2: req.body.filename2,
        filename3: req.body.filename3,
        originalName1: req.body.originalName1,
        originalName2: req.body.originalName2,
        originalName3: req.body.originalName3,

        path1: req.body.path1,
        path2: req.body.path2,
        path3: req.body.path3,

        userId: Number(1), //유저DB 고유넘버
        userid: req.body.userid, //유저아이디
      };
      logger.info(`(upload.reg.params) ${JSON.stringify(params)}`);
      //이미지 파일 업로드되었는지 확인한다.
      if (!req.files) {
        const err = new Error("파일 업로드 실패");
        logger.error(err.toString());
        res.status(500).json(err.toString());
      }

      // 비즈니스 로직 호출
      const result = await postService.reg(params);
      logger.info(`(upload.reg.result) ${JSON.stringify(result)}`);

      // 최종 응답
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err.toString());
    }
  }
);

module.exports = router;

// try {
//   if (!req.files) {
//     const err = new Error("파일 업로드 실패");
//     logger.error(err.toString());
//     res.status(500).json(err.toString());
//   }
//   console.log(req.files);
//   console.log(req.body);

//   const result = req.files;
//   // 비즈니스 로직 호출
//   logger.info(`(upload.reg.result) ${JSON.stringify(result)}`);

//   // 최종 응답
//   res.status(200).json(result);
// } catch (err) {
//   res.status(500).json(err.toString());
// }
