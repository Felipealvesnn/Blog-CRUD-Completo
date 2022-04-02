
//parametros para logar no mysql
const sequelize = require('sequelize');
const conection = new sequelize('blog-crud', 'root', '1994cao', {
    root: 'localhost',
    dialect: 'mysql',
    timezone:"-03:00",
    logging: false
});

module.exports = conection;