//parametros para logar no mysql
const sequelize = require('sequelize');
const conection = new sequelize('blog-crud', 'root', '1994cao', {
    root: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = conection;