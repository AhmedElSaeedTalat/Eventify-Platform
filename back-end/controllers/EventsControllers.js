import { ObjectId } from 'mongodb';
import CategoryControllers from './CategoryControllers';
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
    const { name, description, date } = req.body;
    const { location, organizer, category } = req.body;
    const createrId = req.session.userId;
	const dateObj = new Date(date);
    let categoryId;
    const categoryDocument = await CategoryControllers.findCategory({ name: category });
    if (categoryDocument) {
      categoryId = categoryDocument._id;
    } else {
      return res.status(404).json({ error: 'please send a valid category name' });
    }
    const data = {
      name,
      description,
      createrId,
      date: dateObj,
      location,
      organizer,
      category: categoryId,
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
