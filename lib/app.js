const express = require('express');
const app = express();

app.use(express.static(`${__dirname}/../public`));

app.use(express.json());
app.use(require('cookie-parser')());

app.use('/api/v1/auth', require('./controllers/auth'))

app.use('/api/v1/post', require('./controllers/post'))
app.use('/api/v1/comment', require('./controllers/comment'))

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
