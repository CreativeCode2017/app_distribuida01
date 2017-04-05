'use strict'
var jwt        = require("jsonwebtoken");
var mbusuario = require("../modell/mbusuario.js");
var cbusuario = require ('../controller/cbusuario');
var mySecret = "jgj734jsd";
module.exports = function(app) {	
	app.get('/api/user', cbusuario.readUser);
    app.post('/api/user', cbusuario.createUser);
    app.put('/api/user/:_id', cbusuario.updateUser);
    app.delete('/api/user/:_id', cbusuario.deleteUser); 
    app.post('/authenticate', function(req, res) {
        var username = req.body.email;
        var password = req.body.password;
        console.log(username);
        cbusuario.readLogin(username,password).then(function(user){            
                if (user) {
                   res.json({
                        type: true,
                        data: user,
                        token: user.token
                    }); 
                } else {
                    res.json({
                        type: false,
                        data: "Incorrect user/password"
                    });    
                }
        }).error(function(err){
            res.json({
                    type: false,
                    data: "Error occured: " + err
                });
        });
    });


    app.post('/signin', function(req, res) {
        var username = req.body.email;
        var password = req.body.password;
        cbusuario.readLogin(username,password).then(function(user){                       
                
                if (user) {
                    res.json({
                        type: false,
                        data: "User already exists!"
                    });
                } else {
                    var userModel ={
                        nombre_usuario : username,
                        clave : password
                    }
                    var token = jwt.sign(userModel, mySecret);
                    mbusuario.User.create({
                        nombre_usuario: username,
                        clave: password,
                        estado: '1',
                        id_perfil: 1,
                        id_persona: 1,
                        id_sucursal: 1,
                        token: token
                    }).then(function(user){
                       res.json({
                        type: false,
                        data: "User create!"
                        }); 
                    }).error(function(err){
                        res.json({
                        type: false,
                        data: "Error occured: " + err
                        });
                    });
                }
        }).error(function(err){
            res.json({
                    type: false,
                    data: "Error occured: " + err
                });
        });
    });

    app.get('/me', ensureAuthorized, function(req, res) {
        mbusuario.User.findAll({where : {token: req.token}}).then(function(user){            
                res.json({
                    type: true,
                    data: user
                });
        }).error(function(err){
            res.json({
                    type: false,
                    data: "Error occured: " + err
                });
        });       
       
    });

    function ensureAuthorized(req, res, next) {
        var bearerToken;
        var bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        } else {
            res.send(403);
        }
    }
};