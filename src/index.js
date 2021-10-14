console.log("Hello");

//Los módulos
const express = require('express');

//Objeto
const app = express();
const path = require('path');

//Router
app.get('/registrar_usuario', (req, res)=> {
    res.sendFile(path.join(__dirname, './views/registrar_usuario.html'));
});

app.get('/modificar_usuario', (req, res)=> {
    res.sendFile(path.join(__dirname, './views/modificar_usuario.html'));
});

app.listen(5000, ()=> {
    console.log('Estoy en el puerto', 5000);
});