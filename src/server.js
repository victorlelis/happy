const express = require('express');
const path = require('path');
const pages = require('./pages.js');

const server = express();
server
  .use(express.urlencoded({ extended: true }))
  .use(express.static('public'))

  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'hbs')

  .get('/', pages.index)
  .get('/friend', pages.friend)
  .get('/friends', pages.friends)
  .get('/create-friend', pages.createFriend)
  .post('/save-friend', pages.saveFriend);

server.listen(5500);
