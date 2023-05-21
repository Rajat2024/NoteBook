const express = require("express");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const connectToMongo = require("./database ");
const { errorHandler, notFound } = require("./middleware/error.js");
const path = require("path");
const cors = require("cors");
const authRoute = require("./routes/auth");
const noteRoute = require("./routes/notes");



connectToMongo(); // connecting to database

const app = express();
app.use(cors()); //  Calling use(cors()) will enable the express server to respond to requests(put ,post ,delete,get).
app.options("*", cors());

app.use(express.json()); // to accept json data

// set security HTTP headers
app.use(helmet());

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

//Available Routes
app.use("/api/auth", authRoute);
app.use("/api/notes", noteRoute);

// ----------------production -----------------
if (process.env.NODE_ENV === "production") {
  //*Set static folder up in production
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}
// ------------------production---------------

// Error Handling middlewares
app.use(notFound); // if no route is found then this middleware will run
app.use(errorHandler); // if any error occurs in any route

module.exports = app;

