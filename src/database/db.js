const Database = require('sqlite-async');
const path = require('path');

function execute(db) {
  return db.exec(`
    CREATE TABLE IF NOT EXISTS friends (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lat TEXT,
      lng TEXT,
      name TEXT,
      store TEXT,
      whatsapp TEXT,
      images TEXT,
      temperaments TEXT,
      sociable TEXT,
      food TEXT,
      health TEXT
    );
  `);
}

module.exports = Database.open(path.join(__dirname, 'database.sqlite')).then(
  execute,
);
