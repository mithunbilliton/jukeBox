let mongoose = require("mongoose");
const Music = require("../model/Music");

exports.getAllMusics = async (req, res) => {
  try {
    let music = await Music.find();
   // console.log("qqqqqqqqqqqqqqqqqqqq",music);
    music = await sortAscending(music)
    res.status(200).json(music);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getByMusician = async (req, res) => {
  console.log("musssssssssssss",req.query.name);
  let  musician = req.query.name
  let query = {artist: {$elemMatch: {name:musician}}}
  
  try {
    let result = await Music.find(query).sort({price:1});
    
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getMusicians = async (req, res) => {
  console.log("musssssssssssss",req.query.album);
  let  album = req.query.album;
  //let query = {albumName: album}
  let aggregate = [{
    $match: {albumName: album}
  },{
    $unwind: '$artist'
  },{
    $sort:{'artist.name':1}
  },{
    $group:{_id:'$name',artist:{$push:'$artist'}}
  }]
  console.log("query",aggregate);
  try {
    let result = await Music.aggregate(aggregate);
    
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addNewMusic = async (req, res) => {
  //console.log("qqqqqqqqqqqqqqq",req.body)
  try {
    const music = new Music({
      albumName:req.body.albumName,
      genre:req.body.genre,
      price:req.body.price,
      discription:req.body.discription,
      artist:[{name:req.body.artist,musicianType:req.body.musicianType}],
      music:req.file
    });
     console.log(music)
    let newMusic = await music.save();
    

   
    res.status(200).json({ data: newMusic });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};


exports.updateOrInsertMusician = async (req, res) => {
  console.log("musssssssssssss",req.body);
  let  name = req.body.id;
  let  musicianType = req.body.musicianType;
  //let query = {albumName: album}
  let query = {}
  console.log("query",query);
  try {
    let result = await Music.update({
      artist: {
          "$not": {
              "$elemMatch": {
                  "name": name
              }
          }
      }
  }, {
      $set: {
          visits: {
              "name": name,
              "musicianType": musicianType
          }
      }
  }, {upsert:true, multi: true });
    
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

// exports.deleteMusic = async (req, res) => {
//   try {
//     const id = req.params.musicId;
//     let result = await Music.remove({ _id: id });
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };
const sortAscending = (data) => {
  let swapped = false
  const resultArray = [...data]
  for (let i = 1; i < resultArray.length - 1; i++) {
    swapped = false

    for (let j = 0; j < resultArray.length - i; j++) {
      if (resultArray[j + 1].created < resultArray[j].created) {
        ;[resultArray[j].created, resultArray[j + 1].created] = [resultArray[j + 1].created, resultArray[j].created]
        swapped = true
      }
    }

    if (!swapped) {
      return resultArray
    }
  }

  return resultArray
}

