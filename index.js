const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("./db");
const Users = require("./models/user_schema");

const jwt = require("./jwt");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  return res.send("Hello POS app");
});
app.post("/register", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    await Users.create(req.body);
    res.send({ result: "success", message: "Register successfully" });
  } catch (err) {
    res.send({
      result: "error",
      message: err.errmsg,
    });
  }
});

app.post("/login", async (req, res) => {
  let doc = await Users.findOne({ email: req.body.email });
  if (doc) {
    if (bcrypt.compareSync(req.body.password, doc.password)) {
      const payload = {
        id: doc._id,
        level: doc.level,
        email: doc.email,
      };

      let token = jwt.sign(payload);
      console.log("Token : ", token);
      res.send({ result: "success", token, message: "Login successfully" });
    } else {
      //Invalid password
      res.send({ result: "error", message: "Invalid password" });
    }
  } else {
    //Invalid username
    res.send({ result: "error", message: "Invalid username" });
  }
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
