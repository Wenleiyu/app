const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");
const {v4: uuid} = require('uuid');


const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
        .min(6)
        .required(),
        email: Joi.string()
        .min(6)
        .max(255)
        .required(),
        password: Joi.string()
        .min(6)
        .required(),
        password2: Joi.string()
        .min(6)
        .required()
    });
    return schema.validate(data);
};

const registerScreen = (req, res) => {
    try{
        res.render("register");
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }  
}

const registerHandle = (req, res) => {
    try{
        const { name, email, password, password2 } = req.body;
        let errors = [];
        
        const {error} = registerValidation(req.body);
        if (error) errors.push ({msg: error.details[0].message});
    
        if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
        }
    
        if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
        } else {
            User.findOne({ email: email })
                .then(user => {
                    if (user) {
                        errors.push({ msg: 'Email already exists' });
                        res.render('register', {
                            errors,
                            name,
                            email,
                            password,
                            password2
                        });
                    } else {
                        const newUser = new User({
                            _id: uuid(),
                            name,
                            email,
                            password
                        });

                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {    
                                newUser.password = hash;
                                newUser.save()
                                    .then(user => {
                                        req.flash('success_msg', 'you are registered');
                                        res.redirect('/login');
                                    })
                                    .catch(err => console.log(err));
                            })
                        })
                    }
                })
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {registerScreen, registerHandle};