const express = require("express");
const router = express.Router();
const musicController = require("../controller/musicController");
const upload = require("../../config/multer");

router.get("/",  musicController.getAllMusics);
router.post("/", upload.upload.single("music"), musicController.addNewMusic);
router.get("/getByMusician",  musicController.getByMusician);
router.get("/getMusicians",  musicController.getMusicians);
router.put("/", musicController.updateOrInsertMusician);

module.exports = router;
