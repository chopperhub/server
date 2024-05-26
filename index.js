const express = require("express");
const mongoose = require("mongoose");
const userDB = require("./keys");
const tester = require("./tester")
const app = express();
const port = 3000;

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://metauser08:bigfatass123@meta.brg1ghs.mongodb.net/?retryWrites=true&w=majority&appName=Meta",
  )
  .then(console.log("Connected to MongoDB!"));

app.get("/", async (req, res) => {
  const key = await userDB.findOne({ scriptkey: req.query.key });
  const test = await tester.findOne({ scriptkey: req.query.key });
  if (key || test) {
    res.send("--" + key);
    res.send("--" + test);
  } else {
    res.send("invalid key");
  }
  console.log(req.query.key);
});

app.listen(port, () => {
  console.log(`Sandbox listening on port ${port}`);
});
