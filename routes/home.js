const express = require("express");
const router = express.Router();
const homeScreen = require("../controllers/home");

router.get("/", homeScreen);

module.exports = router;