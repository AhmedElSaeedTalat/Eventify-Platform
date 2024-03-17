import MainControllers from '../controllers/MainControllers';
/* adding routes */
const routes = (app) => {
  app.get('/home', MainControllers.home);
};
module.exports = routes;
