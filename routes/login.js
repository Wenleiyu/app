const express = require("express");
const router = express.Router();
const loginControl = require("../controllers/login");

// login page
router.get("/login", loginControl.loginScreen);

// login handle
router.post('/login', loginControl.loginHandle)

module.exports = router;