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

  /**
   * @swagger
   * /logout:
   *   get:
   *     summary: login user using Email and password
   *     description: post data to login yser
   *     responses:
   *       200:
   *         description: successful logout
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/regResponseBody'
   *       500:
   *         description: logout error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/resError'
   *
   */
  app.get('/logout', AuthControllers.logout);

  /**
   * @swagger
   * /create-event:
   *   post:
   *     summary: create new event
   *     description: post data to login yser
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/createEventRequestBody'
   *     responses:
   *       201:
   *         description: successfully added event
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/eventSuccessResponse'
   *       500:
   *         description: error couldnt insert event check missing fields - valid date
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/resError'
   *       404:
   *         description: date field missing
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/resError'
   *
   */
  app.post('/create-event', EventsControllers.createEvent);

  /**
   * @swagger
   * /event/{id}:
   *   get:
   *     summary: display event by passed id
   *     description: retrieve event by id
   *     parameters:
   *       - in: path
   *         name: id
   *         description: event id
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: successful retrieval
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/displayEventResponse'
   *       404:
   *         description: error event not found to display
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/resError'
   *
   */
  app.get('/event/:id', EventsControllers.displayEvent);

  /**
   * @swagger
   * /events:
   *   get:
   *     summary: show all events
   *     description: display all avaliable events
   *     parameters:
   *       - in: query
   *         name: page
   *         description: page number
   *         required: false
   *         schema:
   *           type: integer
   *       - in: query
   *         name: category
   *         description: category name
   *         required: false
   *         schema:
   *           type: string
   *       - in: query
   *         name: sortField
   *         description: used to sort events by date
   *         required: false
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: successful retrieval
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/findEventByDateResponse'
   *
   */
  app.get('/events', EventsControllers.displayEvents);

  /**
   * @swagger
   * /event-update/{id}:
   *   put:
   *     summary: update events
   *     description: update event
   *     parameters:
   *       - in: path
   *         name: id
   *         description: event id
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/updateEventRequest'
   *     responses:
   *       200:
   *         description: successful update
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/regResponseBody'
   *       404:
   *         description: error cant find event
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/resError'
   *       401:
   *         description: error you must be authenticated and the creater of the event to update
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/resError'
   *
   */
  app.put('/event-update/:id', EventsControllers.updateEvent);

  /**
   * @swagger
   * /attend-event:
   *   post:
   *     summary: attend event post request
   *     description: add relationship between user and event to attend
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/attendEventRequest'
   *     responses:
   *       200:
   *         description: successfully registered for event
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/regResponseBody'
   *       500:
   *         description: user already registered for event or relation ship cant be made
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/resError'
   *
   */
  app.post('/attend-event', EventsControllers.attendEvent);

  /**
   * @swagger
   * /user-events:
   *   get:
   *     summary: show events that user is attending if exist
   *     description: show events user is attending
   *     responses:
   *       200:
   *         description: successful retrieval
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/displayEventResponse'
   *       401:
   *         description: error must be authenticated to check events
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/resError'
   *       404:
   *         description: no events found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/resError'
   *
   */
  app.get('/user-events', UserControllers.showEvent);

  /**
   * @swagger
   * /unattend-event/{eventId}:
   *   get:
   *     summary: unattend event
   *     description: remove relationship between user and event
   *     parameters:
   *       - in: path
   *         name: eventId
   *         description: event id
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: successfully unattended the event
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/regResponseBody'
   *       401:
   *         description: error unautheticated to access
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/resError'
   *       500:
   *         description: failed to make update and remove relationship
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/resError'
   *
   */
  app.get('/unattend-event/:eventId', UserControllers.unattendEvent);

  /**
   * @swagger
   * /event-search:
   *   post:
   *     summary: search event using name and location field
   *     description: fields are indexed for text in db to find results
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/searchEventrequest'
   *     responses:
   *       200:
   *         description: successful retrieval of found event
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/findEventByDateResponse'
   *       404:
   *         description: no results
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/resError'
   *
   */
  app.post('/event-search', EventsControllers.searchEvent);

  /**
   * @swagger
   * /find-by-date:
   *   post:
   *     summary: find event by date
   *     description: post date to find relevant date
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/findEventByDate'
   *     responses:
   *       200:
   *         description: successful login
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/findEventByDateResponse'
   *       404:
   *         description: no results found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/resError'
   *
   */
  app.post('/find-by-date', EventsControllers.searchEventByDate);
};
module.exports = routes;
