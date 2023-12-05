const socket = io();

socket.on('productos', (productos) => {
    console.log('Productos actualizados:', productos);
});