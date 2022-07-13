function homeScreen(req, res) {
    try {
        res.render("home");
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error");
    }
}

module.exports = homeScreen;