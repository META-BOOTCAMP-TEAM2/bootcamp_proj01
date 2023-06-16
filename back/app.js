/*eslint-disable*/
// 라이브러리 및 기타 모듈 호출
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsConfig = require("./config/corsConfig.json");
const models = require("./models/index");
const logger = require("./lib/logger");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const passport = require("passport");
const passportConfig = require("./passport/index");
const session = require("express-session");
dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

const indexRouter = require("./routes/index");

const app = express();
logger.info("app start");

//sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

//passport 설정
passportConfig();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// DB 연결 확인 및 table 생성
models.sequelize
  .authenticate()
  .then(() => {
    logger.info("DB connection success");

    // sequelize sync (table 생성)
    models.sequelize
      .sync()
      .then(() => {
        logger.info("Sequelize sync success");
      })
      .catch((err) => {
        logger.error("Sequelize sync error", err);
      });
  })
  .catch((err) => {
    logger.error("DB Connection fail", err);
  });

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(corsConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
