const express = require('express');
const app = express();

app.use(express.static(__dirname + '/../public'));

app.use(express.json());
app.use(require('cookie-parser')());

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/books', require('./routes/books'));
app.use('/api/v1/publishers', require('./routes/publishers'));
app.use('/api/v1/authors', require('./routes/authors'));
app.use('/api/v1/shelfs', require('./routes/shelfs'));
app.use('/api/v1/users', require('./routes/users'));

app.use(require('./middleware/ensure-auth'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
