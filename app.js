const express = require("express");

// Router groups
const indexRouter = require("./routes/indexRouter");

// Setup express server instance
const app = express();

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
