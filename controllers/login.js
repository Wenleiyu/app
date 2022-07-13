const passport = require("passport")

const loginScreen = (req, res) => {
    try{
        res.render("login");
    } catch(error) {
        console.log(error);
        return res.status(400).send("Error");
    }
}

const loginHandle = (req, res, next) => {
    try{
        passport.authenticate('local', {
            successRedirect: '/upload',
            failureRedirect: '/login', 
            failureFlash: true })(req, res, next);
        //console.log(req.body.email);
    } catch(error) {
        console.log(error);
        return res.status(400).send("Error");
    }
    
};

/*function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}*/

module.exports = {loginScreen, loginHandle};