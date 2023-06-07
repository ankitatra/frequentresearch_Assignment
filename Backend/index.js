const express = require("express");
const app = express();
const connection = require("./config/db");
const router= require('./route/register.route');
const countryRoutes = require('./route/country.routes');
const stateRoutes = require('./route/state.route');
const cityRoutes = require('./route/city.route');

require("dotenv").config();

const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("send data");
});

app.use('/api/register', router);
app.use('/api', countryRoutes);
app.use('/api', stateRoutes);
app.use('/api', cityRoutes);


app.listen(process.env.PORT || 3000, async () => {
  try {
    await connection;
    console.log("db is running");
  } catch (error) {
    console.log(error);
  }
  //   console.log(`port is running ${process.env.PORT}`);
});
