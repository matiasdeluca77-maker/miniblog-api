const express = require('express');
const cors = require('cors');

const authorsRoutes = require('./routes/authors');
const postsRoutes = require('./routes/posts');
const { errorHandler, notFoundHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'MiniBlog API está corriendo.' });
});

app.use('/authors', authorsRoutes);
app.use('/posts', postsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;