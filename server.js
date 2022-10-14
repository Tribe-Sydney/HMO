const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
dotenv.config({ path: "./config.env" });
const app = require("./index");

const { PORT, DB_URL } = process.env;

mongoose
  .connect(DB_URL)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log("server is running"));
