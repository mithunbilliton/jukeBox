let mongoose = require("mongoose");
let musicSchema = mongoose.Schema({
  albumName: {
    type: String,
    required: true,
    max: 5
  },
  genre:{
    type:String
  },
  music: {
    type: Object,
    required: true
  },
  artist: [{
    name:{
      type: String,
      min :3
    },
    musicianType:{
      type: String,
      enum:["Vocalist", "Instrumentalist", "Songwriter", "Composer", "Producer", "Hobbyist", "Indie"]
    }
    
  }],
  created: {
    type: Date,
    default: Date.now()
  },
  discription:{
    type: String
  },
  price:{
    type: Number,
    require: true,
    min: 100,
    max: 1000
  }
});
let Music = mongoose.model("Music", musicSchema);
module.exports = Music;
