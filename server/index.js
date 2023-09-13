require("dotenv").config();
const { config } = require("dotenv");
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const router = require("./routes/index");
const errorHandler = require("./middleware/errorHandlingMiddleware");
const fileUpload = require("express-fileupload");
const path = require("path");
const morgan = require("morgan");

const PORT = process.env.PORT || 3003;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
// Используем Morgan для логирования ошибок в терминале
app.use(morgan("dev"));

app.use(fileUpload({}));
app.use("/api", router);

// Middleware с обработкой ошибок всегда должна быть последней
app.use(errorHandler);

// app.get("/", (req, res) => {
//   res.status(200).json({ massage: "online_store" });
// });

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
