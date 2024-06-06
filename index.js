const express = require("express");
const mongoose = require("mongoose");
const userDB = require("./keys");
const freeDB = require("./freeusers");
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
    res.send(key);
    
  } else {
    res.send("invalid key");
  }
  console.log(req.query.key);
});

app.post("/lock/:key", async (req, res) => {
 const key = await userDB.findOne({ scriptkey: req.params.key });
  if (key) {
    if (key.ip) {
    console.log('found ip')
      if (key.ip === req.body.ip) {
        res.send('access');
      } else {
          if (key.ip !== 'not set') {
           console.log('ip not set');
          res.send("Ask for a hwid reset.");
          return key.ip
        } else {
         await userDB.findOneAndUpdate({ scriptkey: req.params.key }, {ip: req.body.ip});
          res.send("New ip set.");
        }
      }
      
  } else
  {
    console.log('no ip yet');
     
     await userDB.findOneAndUpdate({ scriptkey: req.params.key }, {ip: 'not set'});
    res.send('Restart your game!');
  }

  } else {

    res.send("key not found");
  }

 
  // Just a response.
});

app.get("/kon/1/:key", async (req, res) => {
  
  const key = await freeDB.findOne({ discordId: req.params.key });

  if (key) {
    res.send(key.checkpoint1);
    
  } else {
    res.send("API failed to respond. Please try again.");
  }
  console.log(req.query.key);
});


app.listen(port, () => {
  console.log(`Sandbox listening on port ${port}`);
});
