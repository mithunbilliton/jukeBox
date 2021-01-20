To install node modules - npm i

to start the application - npm start

Api end points

create albumb- localhost:4000/music/
    method: post
    body-form-data:
        albumName: mickel
        gener:rock
        price: 300
        discription: rockit
        artist: mickel jacksion
        musicianType: Songwriter    //["Vocalist", "Instrumentalist", "Songwriter", "Composer","Producer"]
        music: audio.mp3                // type should ne file



get all albumbs-localhost:4000/music/
    method- get

get musicians based on album name - localhost:4000/music/getMusicians?album=mithun
    method - get
    query params - album: 

get album based on musician - localhost:4000/music/getByMusician/?name=king
    method- get
    query params- name


update artist and insert- localhost:4000/music/
    method put

    body:{
    "name": "",
    "musicianType":"",
    "albumName":""
}