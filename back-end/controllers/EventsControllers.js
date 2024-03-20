import { ObjectId } from 'mongodb';
import dbInstance from '../utils/db';
/* events controllers module */
class EventControllers {
  /*
   * @createEvent: function to create Events
   *
   * @req: request object to use
   * @res: response object to use
   *
   */
  static async createEvent(req, res) {
    if (!req.session.authenticated) {
      return res.status(401).json({ error: 'you must be authenticated to create event' });
    }
    const { name, description } = req.body;
    const { location, organizer } = req.body;
    const createrId = req.session.userId;
    const date = new Date();
    const data = {
      name,
      description,
      createrId,
      date,
      location,
      organizer,
    };
    const eventId = await EventControllers.insertEvent(data);
    if (eventId === -1) {
      return res.status(500).json({ error: 'couldn\'t insert event' });
    }
    return res.status(201).json({ messege: 'successfully added event', eventID: eventId });
  }

  /*
   * @displayEvent: display event function
   *
   * @req: request object
   * @res: response object
   *
   */
  static async displayEvent(req, res) {
    const { id } = req.params;
    const data = { _id: ObjectId(id) };
    const evnt = await EventControllers.findEvent(data);
    if (!evnt) {
      return res.status(404).josn({ error: 'no event was found' });
    }
    return res.status(200).json(evnt);
  }

  /*
   * @insertEvent: method to insert events
   *
   * @data: receive data to insert as argument
   *
   */
  static async insertEvent(data) {
    try {
      const evnt = await dbInstance.db.collection('events').insertOne(data);
      return evnt.insertedId;
    } catch (err) {
      console.log(err);
      return -1;
    }
  }

  /*
   * @findEvent: method to find event
   *
   * @data: receive data to insert as argument
   *
   */
  static async findEvent(data) {
    const evnt = await dbInstance.db.collection('events').findOne(data);
    return evnt;
  }
}
module.exports = EventControllers;
