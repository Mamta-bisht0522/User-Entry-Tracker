require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const fileUpload = require("express-fileupload");
var morgan = require("morgan");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
  ];
  if (allowedOrigins.includes(req.headers.origin)) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Set-Cookie"
  );
  next();
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
// app.use(
//   fileUpload({
//     useTempFiles: true,
//   })
// );

app.use(morgan("combined"));

mongoose.set("strictPopulate", false);
mongoose.set("strictQuery", true);

// Connect to MongoDB
const connectDB = require("./src/config/mongodb.config");
connectDB();

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome To UET Test Server" });
});

// app.use((err, req, res, next) => {
//   if (err instanceof Error && err.status === 413) {
//     res.status(413).json({
//       error: "Request Entity Too Large. Maximum file size allowed is 50 MB.",
//     });
//   } else {
//     next(err);
//   }
// });

// const routes = require("./src/routes/index.route");
// app.use(routes);

const PORT = process.env.PORT;
app.listen(3000 || PORT, () => {
  console.log(`Server is running on Port Number: ${PORT}`);
});
