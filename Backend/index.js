const express = require("express");

const app = express();
const connection = require("./config/db");
require('dotenv').config()


const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("send data");
});


app.listen(process.env.PORT || 3000, async () => {
  try {
    await connection;
    console.log("db is running");
  } catch (error) {
    console.log(error);
  }
//   console.log(`port is running ${process.env.PORT}`);
});