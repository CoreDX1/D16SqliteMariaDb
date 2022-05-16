const express = require('express');

const knex = require('./db');

const app = express();
app.use(express.json());

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

app.listen(8080, () => {
  console.log('Server on');
});
