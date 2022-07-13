const express = require("express");
const router = express.Router();
const {ensureAuthenticated} = require("../controllers/auth");
const {uploadScreen, uploadHandle} = require("../controllers/upload");

router.get("/upload", ensureAuthenticated, uploadScreen);

router.post("/upload", uploadHandle);

module.exports = router;