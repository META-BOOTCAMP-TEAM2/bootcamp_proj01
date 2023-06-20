/*eslint-disable*/

const express = require("express");

const router = express.Router();
const logger = require("../lib/logger");
const { isLoggedIn } = require("../lib/middleware");
const fs = require("fs");
const multer = require("multer");

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
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      const err = new Error("파일 업로드 실패");
      logger.error(err.toString());
      res.status(500).json(err.toString());
    }
    const result = {
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
    };
    // 비즈니스 로직 호출
    logger.info(`(upload.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

// 리스트 조회
router.get("/", async (req, res) => {
  try {
    const params = {
      title: req.query.title,
      content: req.query.content,
      userIds: req.query.userIds ? req.query.userIds.split(",") : null,
    };
    logger.info(`(upload.list.params) ${JSON.stringify(params)}`);

    const result = await postService.list(params);
    logger.info(`(upload.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 상세정보 조회
router.get("/:id", async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(upload.info.params) ${JSON.stringify(params)}`);

    const result = await postService.info(params);
    logger.info(`(upload.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 수정
router.put("/:id", async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: req.body.imagePath,
      filePath: req.body.filePath,
    };
    logger.info(`(upload.update.params) ${JSON.stringify(params)}`);

    const result = await postService.edit(params);
    logger.info(`(upload.update.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 삭제
router.delete("/:id", async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(upload.delete.params) ${JSON.stringify(params)}`);

    const result = await postService.delete(params);
    logger.info(`(upload.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
