require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");

const authRouter = require("./route/authRoute");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hey there",
  });
});
// all routes

app.use("/api/v1/auth", authRouter);

app.use(
  "*",
  catchAsync(async (req, res, next) => {
    throw new AppError("This is error ", 404);
  })
);

app.use((err, req, res, next) => {
  res.status(404).json(err);
});
app.listen(PORT, () => {
  console.log("server is listening on port:", PORT);
});
