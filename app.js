const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const authorRoutes = require("./routes/author");
const blogRoutes = require("./routes/blog");
const commentRoutes = require("./routes/comment");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(bodyParser.json());
app.use("/author", authorRoutes);
app.use("/blog", blogRoutes);
app.use("/comment", commentRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.setHeader("Content-Type", "application/json");
  res.status(status).json({ message, data });
});

app.listen(8080, () => {
  console.log(`Server runnin on port 8080`);
  mongoose
    .connect(process.env.MONGOURL, { useNewUrlParser: true })
    .then((result) => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.log(err);
    });
});
