var crypto = require('crypto');
var express=require('express');

module.exports=function(app){
    var user=require('./controllers/userNodeController.js');
	app.post('/user/login', user.login);
    app.post('/user/register', user.register);
    app.post('/user/addEmployee',user.addEmployeeToCompany);
    app.post('/user/getAllEmployees',user.getAllEmployees);
    app.post('/project/addProject',user.addProject);
    app.post('/project/getAllProjects',user.getAllProjects);
    app.post('/project/addOrRemoveEmployeesFromProject',user.addOrRemoveEmployeesFromProject);
    app.post('/project/getUsersForProject',user.getUsersForProject);
}