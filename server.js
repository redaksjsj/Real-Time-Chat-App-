const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir un fichier HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Gestion des connexions WebSocket
io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté');

  // Réception d'un message
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Diffuser le message à tous
  });

  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté');
  });
});

server.listen(3000, () => {
  console.log('Serveur en écoute sur http://localhost:3000');
});
