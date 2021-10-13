const Sequelize = require('sequelize');
const connection = require("../database/database");
const Category = require ('../categories/categories');


const Article = connection.define('article', {
    title:{
        type:Sequelize.STRING,
        allowNull:false
    }, slug: {
        type: Sequelize.STRING,
        allowNull:false
    },
    body:{
        type:Sequelize.TEXT,
        allowNull:false
    }

});
Category.hasMany(Article); //categoria tem varios artigos
Article.belongsTo(Category); //um artigo pertece a uma catogoria
//Article.sync({force:true}) força criar a tabela

module.exports = Article;