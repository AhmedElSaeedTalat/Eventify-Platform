import MainControllers from '../controllers/MainControllers';
import AuthControllers from '../controllers/AuthControllers';
/* adding routes */
const routes = (app) => {
  app.get('/home', MainControllers.home);
  app.post('/register', AuthControllers.postUser);
  app.post('/login', AuthControllers.login);
  app.get('/logout', AuthControllers.logout);
};
module.exports = routes;
