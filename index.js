const express = require('express');
const app= express();


app.get("/",(res, req)=>{
    res.send("bem vindo ao meu site");
})

app.listen(8080,()=>{
    console.log('O SERVIDOR ESTÁ RODANDO')
})