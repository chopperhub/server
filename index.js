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

app.post("/lock/:key", async (req, res) => {
  console.log(req.params)
 console.log(req.params.key);
 const key = await userDB.findOne({ scriptkey: req.params.key });
  if (key) {
    console.log("found key.");
    console.log(key.ip)
    if (key.ip) {
       console.log('need ip reset')
      return key.ip
    } else{
      key.ip = req.body.ip
      await key.save()
      console.log(key)
    }

      
  }

  res.send("Updated Database.");
  // Just a response.
});


app.listen(port, () => {
  console.log(`Sandbox listening on port ${port}`);
});
