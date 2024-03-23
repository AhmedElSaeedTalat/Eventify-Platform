import MainControllers from '../controllers/MainControllers';
import AuthControllers from '../controllers/AuthControllers';
import EventsControllers from '../controllers/EventsControllers';
import UserControllers from '../controllers/UserControllers';
/* adding routes */
const routes = (app) => {
/**
 * @swagger
 * /home:
 *   get:
 *     summary: Get home page
 *     description: get home page
 *     responses:
 *       200:
 *         description: home page is accessable
 */
  app.get('/home', MainControllers.home);

  /**
   * @swagger
   * /register:
   *   post:
   *     summary: Register user using Email and password
   *     description: post data
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/registrationRequestBody'
   *     responses:
   *       201:
   *         description: successful registration
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/regResponseBody'
   *       400:
   *         description: error message missing email - Missing password - Email already exists
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/resError'
   *
   */
  app.post('/register', AuthControllers.postUser);

  /**
   * @swagger
   * /login:
   *   post:
   *     summary: login user using Email and password
   *     description: post data to login yser
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/loginRequestBody'
   *     responses:
   *       200:
   *         description: successful login
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/loginResponseBody'
   *       400:
   *         description: error message missing email - Missing password
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/resError'
   *
   */
  app.post('/login', AuthControllers.login);
  app.get('/logout', AuthControllers.logout);
  app.post('/event', EventsControllers.createEvent);
  app.get('/event/:id', EventsControllers.displayEvent);
  app.get('/events', EventsControllers.displayEvents);
  app.put('/event-update/:id', EventsControllers.updateEvent);
  app.post('/attend-event', EventsControllers.attendEvent);
  app.get('/user-events', UserControllers.showEvent);
  app.get('/unattend-event/:eventId', UserControllers.unattendEvent);
};
module.exports = routes;
