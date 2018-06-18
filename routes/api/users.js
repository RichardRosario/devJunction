const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//Load user model
const User = require('../../models/User');

//@route    GET request to api/users/test
//@desc     Tests users route
//@access   Public
router.get('/test', (req, res) => res.json({msg: "Users works!"}));

//@route    GET request to api/users/register
//@desc     Register users
//@access   Public

router.post('/register', (req, res) => {
    const {  errors, isValid } = validateRegisterInput(req.body);
    
    //check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
    .then(user => {
        if (user) {
            errors.email = 'This Email is already registered';
            return res.status(400).json(errors);
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm' //default
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user)).catch(err => console.log(err));
                });
            })
        }
    })
});

//@route    GET request to api/users/login
//@desc     login  users / returning JWT token
//@access   Public
router.post('/login', (req, res) => {
    const {  errors, isValid } = validateLoginInput(req.body);
    
    //check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //find user by email
    User.findOne({email})
        .then(user => {
            //check user
            if(!user){
                errors.email = 'User email not found';
                return res.status(404).json(errors);
            }

            //check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        //user matched

                        const payload = { 
                            id: user.id, 
                            name: user.name, 
                            avatar: user.avatar };

                        //sign token
                        jwt.sign(payload, 
                            keys.secretOrKey, 
                            { expiresIn: 14400 }, 
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                        });
                    } else {
                        errors.password = 'Password is incorrect';
                        return res.status(400).json(errors);
                    }
                });
        });
})

//@route    GET request to api/users/current
//@desc     return current user
//@access   Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
});

module.exports = router;