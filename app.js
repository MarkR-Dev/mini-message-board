const express = require("express");
const path = require("path");

const indexRouter = require("./routes/indexRouter");

// Setup express server instance
const app = express();

// Configure ejs to work with react
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);

// Matches paths that don't exists to produce a 404
app.use("/{*splat}", (req, res) => {
  res.status(404).send("404");
});

// Error handler middleware to catch errors throughout the app or previous middleware function if using next(err)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

// Listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  // This is important to display errors rather than silently failing
  if (err) {
    throw err;
  }

  console.log(`Server listening on port: ${PORT}`);
});
