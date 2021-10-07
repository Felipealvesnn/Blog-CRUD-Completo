const express = require('express');
const app= express();
const connection = require('./database/database')


app.set('view engine', 'ejs'); //to dizendo qual vai ser a minha engine 
app.use(express.static('public')); //arquivos estaticos
//bodyparser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

connection
.authenticate().then(()=>{
    console.log("Conexão com banco de dados sucesso");
}).catch((error)=>{
    console.log(error);
})

app.get("/",(req, res)=>{
    res.render('index');
})
app.listen(8080,()=>{
    console.log('O SERVIDOR ESTÁ RODANDO')
})