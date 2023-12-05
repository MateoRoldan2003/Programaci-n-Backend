const express = require('express');
const exphbs  = require('express-handlebars');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const port = 3000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req, res) => {
    const productos = obtenerProductos();
    res.render('home', { productos });
});

app.get('/realtimeproducts', (req, res) => {
    const productos = obtenerProductos();
    res.render('realTimeProducts', { productos });
});

io.on('connection', (socket) => {
    console.log('Cliente conectado');

    const productos = obtenerProductos();
    socket.emit('productos', productos);
});

function obtenerProductos() {
    return [
        { id: 1, nombre: 'Producto 1' },
        { id: 2, nombre: 'Producto 2' },
        // ...
    ];
}

server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
