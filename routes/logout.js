const express = require("express");
const router = express.Router();

//logout page
router.get("/logout", (req, res) => res.render("logout"));

//logout handle
router.post('/logout', (req, res) => {
    req.logout();
    req.flash("success_msg", "You logged out");
    req.redirect("/login");
})

module.exports = router;