var crypto = require('crypto');
var mongoose = require('mongoose');
var user = mongoose.model('user');
var company = mongoose.model('company');
var project = mongoose.model('project');
var hours = mongoose.model('hours');

function hashPW(pwd) {
    return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}

exports.login = function (req, res) {

    user.findOne({ email: req.body.email })
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

exports.addProject = function (req, res) {
    var newProject = new project();
    newProject.set('name', req.body.name);
    newProject.set('company', req.body.company);
    newProject.save(function (err, docs) {
        if (err) {
            res.status(500).json(err);
        }
        else {
            res.status(200).json(docs);
        }
    })
}

exports.getAllProjects = function (req, res) {
    project.find({ company: req.body.company }).exec(function (err, docs) {
        if (err) {
            res.status(500).json(err);
        }
        else {
            res.status(200).json(docs);
        }
    })
}

exports.addOrRemoveEmployeesFromProject = function (req, res) {

    if (req.body.isChecked) {
        project.update(
            { _id: req.body.project },
            {
                $push:
                {
                    developers: req.body.user
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
    } else {
        project.update(
            { _id: req.body.project },
            {
                $pop:
                {
                    developers: req.body.user
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


}

exports.getUsersForProject = function (req, res) {
    var allDevs = [];
    var allProjectDevs = []
    company.findOne({ _id: req.body.companyId }).deepPopulate(['developers'])
        .exec(function (err, allUsers) {
            if (err) {
                res.status(500).json(err);
            }
            else {
                allDevs = allUsers.developers;
                project.findOne({ _id: req.body.projectId })
                    .exec(function (err, allUsersFromProject) {
                        if (err) {
                            res.status(500).json(err);
                        } else {
                            res.status(200).json({ allDevs: allDevs, allProjectDevs: allUsersFromProject.developers });
                        }

                    })
            }
        })
}

exports.getProjectsForEmployee = function (req, res) {
    project.find({ developers: req.body.user }).deepPopulate(['company'])
        .exec(function (err, docs) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(docs);
            }
        })
}

exports.addHoursToProject = function (req, res) {
    var newHours = new hours();
    newHours.set('hours', req.body.hours);
    newHours.set('date', req.body.date);
    newHours.set('developer', req.body.user);
    newHours.set('project', req.body.project);
    newHours.set('company', req.body.company);
    newHours.set('details', req.body.details);

    newHours.save(function (err, doc) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(doc);
        }
    })
}


exports.getAllHoursForEmployee = function (req, res) {
    hours.find({ developer: req.body.user }).deepPopulate(['project', 'developer'])
    exec(function (err, docs) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(docs);
        }
    })
}