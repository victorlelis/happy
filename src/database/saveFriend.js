const Database = require('./db');

function savefriend(db, friend) {
  return db.run(`
  INSERT INTO friends (
    lat,
    lng,
    name,
    store,
    whatsapp,
    images,
    temperaments,
    sociable,
    food,
    health
  ) VALUES (
    '${friend.lat}',
    '${friend.lng}',
    '${friend.name}',
    '${friend.store}',
    '${friend.whatsapp}',
    '${friend.images}',
    '${friend.temperaments}',
    '${friend.sociable}',
    '${friend.food}',
    '${friend.health}'
  );
`);
}
module.exports = savefriend;
