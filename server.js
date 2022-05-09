const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

// Parse requests of content-type = application/json
app.use(express.json());

// Parse requests of content-type = application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Single route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Sidehustle Node REST API with express." });
});

require("./src/routes/user.routes.js")(app);

// Set port, listen for routes
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
