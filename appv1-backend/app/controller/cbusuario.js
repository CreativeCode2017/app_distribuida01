'use strict'
var conn = require("../config/conn.js");
var mbusuario = require("../modell/mbusuario.js");

exports.createUser = function (req, res){
    //{nombre : req.body.nombre,apellido: req.body.apellido, edad: req.body.edad}   
    
        mbusuario.User.create({
        id_usuario: req.body.id_usuario,
        campo1: req.body.campo1,
        campo2: req.body.campo2,
        estado: "1"
      });
      return readUser(req, res);
}

exports.readLogin = function (us, pw){    
    return mbusuario.User.findOne({where:{nombre_usuario:us, clave: pw}})        
}

var readUser = function (req, res){ 
    return mbusuario.User.findAll().then(function(result){	
		res.send(result);
	}, function(err){
		console.log(err);
	});
  
}
exports.updateUser = function (req, res){
    mbusuario.User.update({
    campo1: req.body.campo1,
    campo2: req.body.campo2,
    estado: "1"
  },{
        where: {id_usuario : req.params._id}
    });
    return readUser(req, res);
}

exports.deleteUser = function (req, res){
    console.log("llegue delete");
    mbusuario.User.destroy({
        where: {
        id_usuario: req.params._id
        }
    });
     return readUser(req, res);
}

exports.readUser = readUser;