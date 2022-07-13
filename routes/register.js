const express = require("express");
const router = express.Router();
const {registerScreen, registerHandle} = require("../controllers/register");

//register page
router.get("/register", registerScreen);

// register handle
router.post('/register', registerHandle);

module.exports = router;