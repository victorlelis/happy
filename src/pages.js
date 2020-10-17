const db = require('./database/db');
const Database = require('./database/db');
const saveFriend = require('./database/saveFriend');

module.exports = {
  index(req, res) {
    return res.render('index');
  },
  async friend(req, res) {
    const id = req.query.id;
    try {
      const db = await Database;
      const results = await db.all(`SELECT * FROM friends WHERE id = '${id}'`);
      const friend = results[0];
      friend.images = friend.images.split(',');
      friend.firstImage = friend.images[0];

      if (friend.health == 'undefined') {
        friend.health = false;
      } else {
        friend.health = friend.health;
      }

      return res.render('friend', { friend });
    } catch (error) {
      console.log(error);
      return res.send('Erro no banco de dados!');
    }
  },
  async friends(req, res) {
    try {
      const db = await Database;
      const friends = await db.all('SELECT * FROM friends');
      return res.render('friends', { friends });
    } catch (error) {
      console.log(error);
      return res.send('Erro no banco de dados!');
    }
  },
  createFriend(req, res) {
    return res.render('create-friend');
  },
  async saveFriend(req, res) {
    const fields = req.body;

    if (Object.values(fields).includes('')) {
      return res.send('Todos os campos deve ser preenchidos!');
    }

    try {
      const db = await Database;
      await saveFriend(db, {
        lat: fields.lat,
        lng: fields.lng,
        name: fields.name,
        store: fields.store,
        whatsapp: fields.whatsapp,
        images: fields.images.toString(),
        temperaments: fields.temperaments,
        sociable: fields.sociable,
        food: fields.food,
        health: fields.health,
      });

      return res.redirect('/friends');
    } catch (error) {
      console.log(error);
      return res.send('Erro no banco de dados!');
    }
  },
};
