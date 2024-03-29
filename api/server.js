const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const request = require("request");
const AWS = require("aws-sdk");
const fs = require("fs");
const BUCKET = "mybucc99";
const multer = require("multer");
const multerS3 = require("multer-s3");
let User = require("./models/User.js");
let app = express();
let s3 = new AWS.S3();

let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/userData");
let db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (_callback) {
  console.log("connection succeeded");
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "viuhr89ji8923urfheirfij",
    resave: false,
    saveUnintialized: true,
  })
);
let ofilename;
let userID_global;

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "mybucc99",
    key: function (_req, file, cb) {
      ofilename = file.originalname;
      cb(null, file.originalname);
    },
  }),
});

// Register a new user to the MongoDB database
app.post("/register", function (req, res) {
  console.log(
    "Name = " +
      req.body.name +
      " UserID = " +
      req.body.userID +
      " Password = " +
      req.body.password
  );
  let newuser = new User();
  newuser.name = req.body.name;
  newuser.userID = req.body.userID;
  newuser.password = req.body.password;
  newuser.save(function (err, _savedUser) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    res.status(200).send();
  });
});

// Allow registered users to login
app.post("/login", function (req, res) {
  let userID = req.body.userID;
  let password = req.body.password;
  userID_global = userID;
  User.findOne({ userID: userID, password: password }, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    } else if (!user) {
      console.log("USER NOT FOUND!!!");
      return res.status(404).send();
    } else {
      userID_global = userID;
      req.session.user = user;
      console.log("WELCOME TO IMAGEUPLOAD!!");
      return res.send(user);
    }
  });
});

// Logout users from their session
app.get("/logout", function (req, res) {
  req.session.destroy();
  return res.status(200).send();
});

app.get("/sessioncheck", function (req, res) {
  if (!req.session.user) {
    return res.status(401).send("ERROR 401 - Unauthorized!");
  } else {
    return res.status(200).send();
  }
});

// Uploads the picture to the AWS bucket and updates the MongoDB database

app.post("/fileUp", upload.array("myFile", 1), function (_req, res) {
  ofilename = "https://mybucc99.s3.amazonaws.com/" + ofilename;
  console.log(ofilename + " uploaded here");
  db.collection("myusers").update(
    { userID: userID_global },
    { $set: { URL1: ofilename } }
  );
  res.status(200).send();
});

app.post("/getFiles", function (req, res) {
  let userID = req.body.UserID;
  User.findOne({ userID: userID }, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    } else if (!user) {
      console.log("USER NOT FOUND!!!");
      return res.status(404).send();
    } else {
      return res.send(user.URL1);
    }
  });
});

app.use(function (_req, _res, next) {
  // catch 404 and forward to error handler
  next(createError(404));
});
app.use(function (err, req, res, _next) {
  // error handler
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// if (process.env.NODE_ENV === 'production') {
//   // Serve any static files
//   // app.use(express.static(path.join(__dirname, 'client/build')));
//   // Handle React routing, return all requests to React app
//   app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
//   });
// }

let port = process.env.PORT || 9000;

app
  .get("/", function (_req, res) {
    res.set({
      "Access-control-Allow-Origin": "http://localhost:3000",
    });
  })
  .listen(port);

module.exports = app;
