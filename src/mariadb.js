const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'core',
    password: 'index',
    database: 'products',
  },
  pool: {
    min: 2,
    max: 8,
  },
});

knex.schema
  .createTableIfNotExists('products', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('price');
    table.string('image');
  })
  .then(() => {
    console.log('Tabla Creada');
  })
  .catch((err) => {
    throw err;
  });

module.exports = knex;
