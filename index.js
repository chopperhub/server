const express = require("express");
const mongoose = require("mongoose");
const userDB = require("./keys");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://metauser08:bigfatass123@meta.brg1ghs.mongodb.net/?retryWrites=true&w=majority&appName=Meta",
  )
  .then(console.log("Connected to MongoDB!"));

app.get("/", async (req, res) => {
  const key = await userDB.findOne({ scriptkey: req.query.key });

  if (key) {
    res.send("--" + key);
      const ip = await userDB.findOne({ ip: key.ip });
      if (ip) {
        return ip
      } else
      {
         await userDB.findOneAndUpdate(
          { scriptkey: `${req.query.key}` },
          { $set: { ip: req.body.ip } }
        );
      }
  } else {
    res.send("invalid key");
  }
  console.log(req.query.key);
});

app.post("/lock", async (req, res) => {
  // We use a mongoose method to find A record and update!
 const key = await userDB.findOne({ scriptkey: req.query.key });
  if (key) {
    const ip = await userDB.findOne({ ip: key.ip });
    console.log("found key.");
    if (ip !== null || 'null') {
       console.log('need ip reset')
      return ip
    } else{
      user.ip = req.body.ip
      await user.save()
      console.log(user)
    }

      
  }

  res.send("Updated Database.");
  // Just a response.
});


app.listen(port, () => {
  console.log(`Sandbox listening on port ${port}`);
});
