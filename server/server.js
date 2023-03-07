const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require('dotenv').config();
const userRouter = require("./user/user.router");
const mapRouter = require("./map/map.router");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connectDataBase = require("./config/config");
connectDataBase();

app.use('/user', userRouter);
app.use('/map', mapRouter);
app.use('/', (req, res) => {
  res.status(200).json({
    message: 'NOT CATCH ANY PATH',
  });
});

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is live on ${PORT}`)
});