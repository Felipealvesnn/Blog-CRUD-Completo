const Sequelize = require('sequelize');
const connection = require("../database/database");

// item para criar a tabela categorias no banco de dados
const Categorie = connection.define('categories', {
    title:{
        type:Sequelize.STRING,
        allowNull:false
    }, slug: {
        type: Sequelize.STRING,
        allowNull:false
    }

});

//Categorie.sync({force:true}) força criar a tabela

module.exports = Categorie;
