const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session")
const passport = require("passport");

require("./controllers/passport")(passport);

dotenv.config();

// Bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//connect MongoDB
mongoose.connect(process.env.DB_SECRET, 
    () => console.log('connect to db'));

app.use(express.json());

//Express session
app.use(
    session({
      secret: 'secret-key',
      resave: true,
      saveUninitialized: true
    })
);

app.use(flash());

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

//EJS
app.use(expressLayouts);
app.set('view engine', "ejs");

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Home page:
app.use("/", require("./routes/home"));

// Login page:
app.use("/", require("./routes/login"));

// register page:
app.use("/", require("./routes/register"));

// upload files:
app.use("/", require("./routes/upload"));

// Logout page:
app.use("/", require("./routes/logout"));

app.listen(3000, () => console.log("Server up and running"));