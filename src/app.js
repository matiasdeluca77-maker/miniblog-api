const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const authorsRoutes = require('./routes/authors');
const postsRoutes = require('./routes/posts');
const { errorHandler, notFoundHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'MiniBlog API está corriendo. Ver /docs para la documentación.' });
});

// Documentación interactiva, generada desde openapi.yaml
const openapiDocument = YAML.load(path.join(__dirname, '..', 'openapi.yaml'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

app.use('/authors', authorsRoutes);
app.use('/posts', postsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;