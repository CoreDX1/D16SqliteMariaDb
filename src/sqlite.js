const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './DB/ecommerce.sqlite',
    useNullAsDefault: true,
  },
});

knex.schema.createTableIfNotExists('message', (table) => {
  table.increments('id').primary();
  table.string('name');
  table.string('message');
})
  .then(() => console.log('conexion y table creada'))
  .catch((err) => console.log(err));

module.exports = knex;
