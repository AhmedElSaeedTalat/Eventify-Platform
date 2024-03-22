import MainControllers from '../controllers/MainControllers';
import AuthControllers from '../controllers/AuthControllers';
import EventsControllers from '../controllers/EventsControllers';
/* adding routes */
const routes = (app) => {
  app.get('/home', MainControllers.home);
  app.post('/register', AuthControllers.postUser);
  app.post('/login', AuthControllers.login);
  app.get('/logout', AuthControllers.logout);
  app.post('/event', EventsControllers.createEvent);
  app.get('/event/:id', EventsControllers.displayEvent);
  app.get('/events', EventsControllers.displayEvents);
  app.put('/event-update/:id', EventsControllers.updateEvent);
  app.post('/attend-event', EventsControllers.attendEvent);
};
module.exports = routes;
