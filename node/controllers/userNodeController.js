var crypto = require('crypto');
var mongoose = require('mongoose');
var user = mongoose.model('user');
var company = mongoose.model('company');


function hashPW(pwd) {
    return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}

exports.login = function (req, res) {

    user.findOne({ email: req.body.username }).
        exec(function (err, user) {

            console.log(err);
            if (!user) {
                res.status(500).json({ msg: 'user not found' });
            } else
                if (user.hashed_password === hashPW(req.body.pass.toString())) {
                    res.json(user);
                } else {
                    res.status(500).json({ msg: 'user or pass' });
                }

        });
}

exports.register = function (req, res) {

    var newUser = new user();
    newUser.set('email', req.body.email);
    newUser.set('password', hashPW(req.body.password));
    newUser.set('firstName', req.body.firstName);
    newUser.set('lastName', req.body.lastName);
    newUser.set('role', 'ADMIN');

    var newCompany = new company();
    newCompany.set('name', req.body.companyName);

    newCompany.save(function (err, company) {
        if (err) {
            res.status(500).json({ err });
        }
        else {
            newUser.set('company', company._id);
            newUser.save(function (err, userInfo) {
                if (err) {
                    res.status(500).json({ err });
                }
                else{
                    res.status(200).json(userInfo);
                }
            })
        }
    });
}