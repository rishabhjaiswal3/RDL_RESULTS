const mongoose = require("mongoose");
const db = process.env.DATABASE;

mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connection sucessfully");
  })
  .catch((err) => {
    console.log("no connection", err);
  });
