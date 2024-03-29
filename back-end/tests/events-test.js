import {
  describe,
  it,
  before,
  after,
} from 'mocha';
import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import session from 'supertest-session';
import dbInstance from '../utils/db';
import app from '../server';
/* module to test authentication */

use(chaiHttp);
describe('test events methods', () => {
  let testSession;
  let eventId;
  before(async () => {
    testSession = session(app);
    // regist new user to start a session
    const dataUser = { email: 'ahmedelsaeed105@gmail.com', password: '123456' };
    await testSession.post('/register').send(dataUser);

    // post new event request during session to be able to retrieve
    const data = {
      name: 'hip hop Concert',
      description: 'music concert',
      location: 'lille, France',
      organizer: 'Macx',
      category: 'music',
      date: '2024-04-05',
      state: 'active',
      price: '80',
    };
    const event = await testSession.post('/create-event').send(data);
    eventId = event.body.eventID;
  });

  it('test post: /create-event', async () => {
    // post new event request during session
    const data = {
      name: 'lecture programming',
      description: 'learn js express',
      location: 'lille, France',
      organizer: 'Macx',
      category: 'career',
      date: '2024-04-06',
      state: 'active',
      price: '50',
    };
    const response = await testSession.post('/create-event').send(data);
    expect(response.statusCode).to.be.equal(201);
    expect(response.body.message).to.be.equal('successfully added event');
  });

  it('test post: /create-event { errors }', async () => {
    // post invalid price
    let data = {
      name: 'lecture in programming',
      description: 'learn js',
      location: 'lille, France',
      organizer: 'Macx',
      category: 'career',
      date: '2024-04-05',
      state: 'active',
      price: 'invalid price',
    };
    let response = await testSession.post('/create-event').send(data);
    expect(response.statusCode).to.be.equal(500);
    expect(response.body).to.deep.equal({ error: 'could\'t insert price' });

    // post invalid date since its a past date
    data = {
      name: 'lecture in programming',
      description: 'learn js',
      location: 'lille, France',
      organizer: 'Macx',
      category: 'career',
      date: '2024-02-05',
      state: 'active',
      price: '89',
    };
    response = await testSession.post('/create-event').send(data);
    expect(response.statusCode).to.be.equal(500);
    expect(response.body).to.deep.equal({ error: 'please provide a valid date' });

    // post event with missing field location
    data = {
      name: 'lecture programming',
      description: 'learn js express',
      organizer: 'Macx',
      category: 'career',
      date: '2024-04-05',
      state: 'active',
      price: '50',
    };
    response = await testSession.post('/create-event').send(data);
    expect(response.statusCode).to.be.equal(404);
    expect(response.body).to.deep.equal({ error: 'couldnt insert event check missing field location' });
  });

  it('test get: /event/{id}', async () => {
    // retrieve the inserted event by id
    let response = await testSession.get(`/event/${eventId}`).send();
    expect(response.statusCode).to.be.equal(200);
    expect(response.body.organizer).to.be.equal('Macx');

    // send invalid id
    response = await testSession.get('/event/65fe08e33118e5e05080e722').send();
    expect(response.statusCode).to.be.equal(404);
    expect(response.body).to.deep.equal({ error: 'no event was found' });
  });

  it('test get: /events', async () => {
    // display all events
    const response = await testSession.get('/events').send();
    expect(response.statusCode).to.be.equal(200);
    expect(response.body.result.length).to.be.equal(2);
  });

  it('test get: /events?category=music', async () => {
    // display all events filtered by category
    const response = await testSession.get('/events?category=music').send();
    expect(response.statusCode).to.be.equal(200);
    expect(response.body.result.length).to.be.equal(1);
  });

  it('test put: /event-update/{ id }', async () => {
    // display all events filtered by category
    let dataToUpdate = { price: 100 };
    let response = await testSession.put(`/event-update/${eventId}`).send(dataToUpdate);
    expect(response.statusCode).to.be.equal(200);
    expect(response.body).to.deep.equal({ message: 'document succesfully was updated' });

    // { errors }
    // random field to update
    dataToUpdate = { random: 100 };
    response = await testSession.put(`/event-update/${eventId}`).send(dataToUpdate);
    expect(response.statusCode).to.be.equal(500);
    expect(response.body).to.deep.equal({ error: 'random field cant be updated' });

    // invalid date field to update
    dataToUpdate = { date: '2024-01-02' };
    response = await testSession.put(`/event-update/${eventId}`).send(dataToUpdate);
    expect(response.statusCode).to.be.equal(500);
    expect(response.body).to.deep.equal({ error: 'please provide a valid date' });

    // invalid price field to update
    dataToUpdate = { price: 'invalid' };
    response = await testSession.put(`/event-update/${eventId}`).send(dataToUpdate);
    expect(response.statusCode).to.be.equal(500);
    expect(response.body).to.deep.equal({ error: 'could\'t update price' });
  });

  it('test post: /event-search', async () => {
    // search event by location or name
    let data = { text: 'lille' };
    let response = await testSession.post('/event-search').send(data);
    expect(response.statusCode).to.be.equal(200);
    expect(response.body.length).to.be.equal(2);

    // search event by location or name and date
    data = { text: 'lille', date: '2024-04-06' };
    response = await testSession.post('/event-search').send(data);
    expect(response.statusCode).to.be.equal(200);
    expect(response.body.length).to.be.equal(1);
  });

  it('test post: /find-by-date', async () => {
    // search event by date only
    let data = { date: '2024-04-06' };
    let response = await testSession.post('/find-by-date').send(data);
    expect(response.statusCode).to.be.equal(200);
    expect(response.body.length).to.be.equal(1);
    expect(response.body[0].name).to.be.equal('lecture programming');

    // case no events corresponding to that date
    data = { date: '2024-02-06' };
    response = await testSession.post('/find-by-date').send(data);
    expect(response.statusCode).to.be.equal(404);
    expect(response.body).to.deep.equal({ error: 'no results were found' });
  });

  it('test post: /attend-event', async () => {
    // register for event
    const data = { eventId };
    const response = await testSession.post('/attend-event').send(data);
    expect(response.statusCode).to.be.equal(200);
    expect(response.body).to.deep.equal({ message: 'sucessfully attending event' });
  });

  it('test get: /user-events', async () => {
    // test displaying events user is attending
    const response = await testSession.get('/user-events').send();
    expect(response.statusCode).to.be.equal(200);
    expect(response.body.events.length).to.be.equal(1);
  });

  it('test get: /unattend-event/{ eventId }', async () => {
    // remove relations ship between user and event
    let response = await testSession.get(`/unattend-event/${eventId}`).send();
    expect(response.statusCode).to.be.equal(200);
    expect(response.body).to.deep.equal({ message: 'successfully removed event from events user is attending' });

    // show events user attending after removing event from users data
    response = await testSession.get('/user-events').send();
    expect(response.statusCode).to.be.equal(404);
    expect(response.body).to.deep.equal({ error: 'no events found' });
  });

  /*
   * @after: after hook to delete created
   * user for the sake of the test
   *
   */
  after(async () => {
    await dbInstance.db.collection('events').deleteOne({ name: 'lecture programming' });
    await dbInstance.db.collection('events').deleteOne({ name: 'hip hop Concert' });
    await dbInstance.db.collection('events').deleteOne({ name: 'gallery show for arts' });
    await dbInstance.db.collection('users').deleteOne({ email: 'ahmedelsaeed105@gmail.com' });
  });
});
