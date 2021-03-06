const pgtools = require('pgtools');

// This can also be a connection string
// (in which case the database part is ignored and replaced with postgres)

const config = {
  user: 'postgres',
  password: 'password',
  port: 5432,
  host: 'localhost'
}

pgtools.createdb(config, 'school', function (err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);

});
// a promise API is also available if cb is omitted