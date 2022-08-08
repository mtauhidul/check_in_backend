const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const testsRouter = require('./controllers/tests');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

logger.info(`connecting to ${config.TEST_URI}`);

mongoose
  .connect(config.TEST_URI)
  .then(() => {
    logger.info('connected to test database');
  })
  .catch((error) => {
    logger.error('error connecting to test database', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/tests', testsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
