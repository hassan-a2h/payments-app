const express = require("express");
const router = require("./routes/index");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const https = require("https");
const fs = require("fs");

const app = express();
const PORT = 3000;
const options = {
  key: fs.readFileSync(`${__dirname}/certificates/localhost-key.pem`),
  cert: fs.readFileSync(`${__dirname}/certificates/localhost.pem`),
};

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(200).send("<h1>HTTPS Server is active</h1>");
});

https.createServer(options, app).listen(PORT, () => {
  console.log("HTTPS server running on port " + PORT);
});
