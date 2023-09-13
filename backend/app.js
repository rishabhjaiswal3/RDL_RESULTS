const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const UserRoutes = require("./routes/UserRoutes2.js");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const app = express();

dotenv.config({ path: "./config.env" });
require("./db/Connection.js");

app.use(express.json());
app.use(cors());
app.use("", UserRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
