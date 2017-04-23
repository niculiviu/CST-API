var crypto = require('crypto');
var mongoose = require('mongoose');
var user = mongoose.model('user');
var company = mongoose.model('company');


function hashPW(pwd) {
    return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}

exports.login = function (req, res) {

    user.findOne({ email: req.body.email }).deepPopulate(['company'])
    .exec(function (err, user) {

        if (err) {
            res.status(500).json(err);
        } else {
            if (!user) {
                res.status(500).json({ msg: 'user not found' });
            } else
                if (user.password === hashPW(req.body.password.toString())) {
                    res.json(user);
                } else {
                    res.status(500).json({ msg: 'user or pass' });
                }
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
                else {
                    res.status(200).json(userInfo);
                }
            })
        }
    });
}

exports.addEmployeeToCompany = function (req, res) {
    let newUser = new user();
    newUser.set('email', req.body.email);
    newUser.set('password', hashPW(req.body.password));
    newUser.set('firstName', req.body.firstName);
    newUser.set('lastName', req.body.lastName);
    newUser.set('role', 'EMPLOYEE');
    newUser.set('company', req.body.companyId);

    newUser.save(function (err, user) {
        if (err) {
            res.status(500).json(err);
        } else {
            company.update(
                { _id: req.body.companyId },
                {
                    $push:
                    {
                        developers: user._id
                    }
                },
                { upsert: true },
                function (err, doc) {
                    if (err) {
                        res.status(500).json(err);
                    }
                    else {
                        res.status(200).json(doc);
                    }
                });
        }
    })
}

exports.getAllEmployees = function (req, res) {
    company.findOne({ _id: req.body.companyId }).deepPopulate(['developers'])
        .exec(function (err, doc) {
            if (err) {
                res.status(500).json(err);
            }
            else {
                res.status(200).json(doc);
            }
        })
}