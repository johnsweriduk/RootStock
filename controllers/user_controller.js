const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt')

router.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (error, createdUser) => {
        if(error) {
            res.json({
                error: 'User already exists'
            });
        } else {
            req.session.user = createdUser;
            res.json(createdUser);
        }
    });
});

router.get('/', (req, res) => {
  User.find({}, (error, foundUser) => {
    console.log(foundUser);
    res.json(foundUser)
  })
})


module.exports = router;
