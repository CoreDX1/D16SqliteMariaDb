const express = require('express');

// Server
const app = express();
const http = require('http');
const server = http.createServer(app);

// Files Static
app.use(express.static('./public'));
app.use(express.json());

// Socket
const { Server } = require('socket.io');
const io = new Server(server);

// BaseDate
const knex = require('./db');

// Connection
io.on('connection', (socket) => {
  // Enviando BaseDate
  knex
    .from('message')
    .select('*')
    .then((json) => {
      socket.emit('base_data', json);
    })
    .catch((err) => {
      console.log(err);
    });

  // Recibir el mensaje y luego enviar
  socket.on('dataMsn', (data) => {
    knex('message')
      .insert(data)
      .then(() => {
        console.log('Register ok!!');
        knex
          .from('message')
          .select('*')
          .then((json) => {
            io.sockets.emit('base_data', json);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

app.get('/chat', (req, res) => {
  res.sendFile('public/index.html', { root: '.' });
});

app.post('/', (req, res) => {
  console.log(req.body);
  const objNew = {
    nameUser: req.body.nameUser,
    messageUser: req.body.messageUser,
  };

  knex('message').insert(objNew)
    .then(() => {
      console.log('Registro ok');
      res.send({ message: 'Registro ok' });
    }).catch((err) => {
      console.log(err);
    });
});

server.listen(8080, () => {
  console.log('Server on');
});
