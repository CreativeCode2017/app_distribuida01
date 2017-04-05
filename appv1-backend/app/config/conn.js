var Sequelize = require('sequelize');
var sequelize = function(nameSchema){
    return new Sequelize('bdjanice', 'postgres', '123456',{
    dialect:"postgres", 
    port: 5432,
	define:{
		timestamps:false,
		freezeTableName:true,
        schema: nameSchema
	},
    pool: {maxConnections:5, maxIdleTime:30},
    language: 'es'
    });
}
module.exports.sequelize = sequelize;