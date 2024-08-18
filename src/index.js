const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// cho phép domain từ client
app.use(cors());

// xử lý dữ liệu từ client gửi đến, tối đa kích thước là 50mb
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

// xử lý json từ client
app.use(bodyParser.json());
app.use(cookieParser());

routes(app);
console.log();

// kết nối đến mongodb
mongoose
  .connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log("Connect Db success!");
  })
  .catch((err) => {
    // console.log(err)
  });
app.listen(port, () => {
  console.log("Server is running in port: ", +port);
});
