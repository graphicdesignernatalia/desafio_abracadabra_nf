const express = require('express');
const path = require('path'); //importa el módulo 'path' de Node.js

const app = express();
const PORT = 3000;

//middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// arreglo de nombres de usuarios
const usuarios = ["Juan", "Jocelyn", "Astrid", "Maria", "Ignacia", "Javier", "Brian"];

//ruta para devolver el arreglo de nombres en formato JSON
app.get('/abracadabra/usuarios', (req, res) => {
    res.json({ usuarios });
});

//middleware para validar el usuario
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const usuario = req.params.usuario;
    if (usuarios.includes(usuario)) {
        next(); //si el usuario existe, pasar al siguiente middleware o ruta
    } else {
        res.sendFile(path.join(__dirname, 'public', 'assets', 'who.jpeg')); //si el usuario no existe, enviar la imagen 'who.jpeg'
    }
});

//ruta para mostrar la imagen del conejo o de Voldemort
app.get('/abracadabra/conejo/:n', (req, res) => {
    const n = parseInt(req.params.n);
    const randomNumber = Math.floor(Math.random() * 4) + 1; //generar número aleatorio entre 1 y 4
    if (n === randomNumber) {
        res.sendFile(path.join(__dirname, 'public', 'assets', 'conejito.jpg')); //si el número coincide, enviar la imagen del conejo
    } else {
        res.sendFile(path.join(__dirname, 'public', 'assets', 'voldemort.jpg')); //si el número no coincide, enviar la imagen de Voldemort
    }
});

//ruta genérica para manejar cualquier otra solicitud
app.use('*', (req, res) => {
    res.send('Esta página no existe...');
});

//iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
