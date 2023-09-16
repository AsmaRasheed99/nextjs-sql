// db.js
const pgp = require('pg-promise')();

const connectionOptions = {
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'Admin',
};

let dbInstance;

function getDatabase() {
  if (!dbInstance) {
    dbInstance = pgp(connectionOptions);
  }
  return dbInstance;
}


function closeDatabase() {
  if (dbInstance) {
    dbInstance.$pool.end(); 
    dbInstance = null;
  }
}

module.exports = {
  getDatabase,
  closeDatabase,
};

