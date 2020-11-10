const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("./db");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", function (req, res) {
  return res.send("Hello POS app");
});
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
