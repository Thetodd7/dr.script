const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect( process.env.MONGODB_URI ||process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("YSSS"))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("YESS");
});

module.exports = mongoose.connection;
