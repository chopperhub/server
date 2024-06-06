const { Schema, model} = require('mongoose');

const keySchema = new Schema({

    username: {
    type: String,
    required: true,
  
  },
  scriptkey: {
    type: String,
    required: true,
  
  },
  discordId: {
    type: String,
    required: true,
  },
  checkpoint1: {
    type: String,
    required: true
  },
  checkpoint2: {
    type: String,
    required: true
  },
  expireAt: {
    type: Date,
  }

})
keySchema.index({expireAt:1},{expireAfterSeconds:0})
module.exports = model('free_users',keySchema);
