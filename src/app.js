const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const authRouter = require("./routers/auth.router");
const userRouter = require("./routers/user.router");
const path = require("path");

const port = process.env.PORT;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(cors());
// đừng nhét cái ni xuống dưới pleaseeeeeee !!!!!!!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

authRouter(app);
userRouter(app);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
