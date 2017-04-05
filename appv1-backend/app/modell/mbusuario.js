'use strict'
var Sequelize = require('sequelize');
var conn = require("../config/conn.js");
var User = conn.sequelize("seguridad").define('usuario', {
    id_usuario: {
		primaryKey:true,
		type:Sequelize.INTEGER,
		autoIncrement:true
	},
    nombre_usuario: Sequelize.STRING,
    clave: Sequelize.STRING,
    estado: Sequelize.STRING,
    id_perfil: Sequelize.INTEGER,
    id_persona: Sequelize.INTEGER,
    id_sucursal: Sequelize.INTEGER,
    token: Sequelize.STRING
});
module.exports.User = User;