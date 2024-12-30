import express from "express";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
const app = express();
const port = 3000;

app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("hello Authentication");
  res.send("Hello Authentication!");
});

const saltRounds = 10;
const myPlaintextPassword = "Rameez Raza";

// To hash a password:

// Hashing a password means converting it
// into a fixed-length string of characters using a cryptographic hashing algorithm.
app.get("/pass", (req, res) => {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
      console.log("the password is ===> ", hash);
      //data cookie ma send krna
      res.cookie("password", hash);
      res.send(hash);
    });
  });
});

// cookies
app.get("/check-pass", (req, res) => {
  bcrypt.compare(
    myPlaintextPassword,
    "$2b$10$3GSPrPShB/edyXPBRzUxT.qD0Pq5YuRcK9jupuF2naM4dGLgPP2E6",
    function (err, result) {
      console.log(result);
      const cookie = req.cookies;
      //cookies sa data mangwa kar screen per check karna
      console.log(cookie);

      res.send(result);

      // result == true
    }
  );
});

// create token with JWT
app.get("/create-token", (req, res) => {
  let token = jwt.sign(
    {
      email: "ramisraza95@gmail.com",
      password: "$2b$10$3GSPrPShB/edyXPBRzUxT.qD0Pq5YuRcK9jupuF2naM4dGLgPP2E6",
    },
    "data-key"
  );
  console.log("token ====> ", token);

  res.send(token);
});

// verify token with jwt
app.get("/check-token", (req, res) => {
  jwt.verify(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbWlzcmF6YTk1QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJDNHU1ByUFNoQi9lZHlYUEJSelV4VC5xRDBQcTVZdVJjSzlqdXB1RjJuYU00ZEdMZ1BQMkU2IiwiaWF0IjoxNzM1NTc5Njk5fQ.rZ2FUXE4LMTXwcaDUHAamOMuKZoKBWPd0Z34YG_BeBQ",
    "data-key",
    function (err, decoded) {
      console.log(decoded);
      res.send(decoded);
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
