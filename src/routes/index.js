const animalsRouter = require('./animals');
const associationsRouter = require('./associations');
const racesRouter = require('./races');
const authRouteur = require('./auth');

const setupRoutes = (app) => {
  app.use('/api/animals', animalsRouter);
  app.use('/api/associations', associationsRouter);
  app.use('/api/races', racesRouter);
  app.use('/api/auth', authRouteur);
};

module.exports = setupRoutes;
