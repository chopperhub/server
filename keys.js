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
  ip: {
  type: String,
    
  },
  
})

module.exports = model('users',keySchema);
