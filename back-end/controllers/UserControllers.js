import { ObjectId } from 'mongodb';
import dbInstance from '../utils/db';
/* user controller */
class UserControllers {
  /*
   * @findUser: function to find user in database
   *
   * @return - found user or null
   *
   */
  static async findUser(data) {
    const collection = await dbInstance.db.collection('users');
    const user = await collection.findOne(data);
    return user;
  }

  /*
   * @insertUser: function to insert new user
   *
   * @email: user's email passed
   * @password: user's password passed
   *
   * @return - id for the inserted user
   */
  static async insertUser(email, password) {
    const collection = await dbInstance.db.collection('users');
    const user = await collection.insertOne({ email, password });
    return user.insertedId;
  }

  /*
   * @showEvent: display events the user is attending
   *
   * @req: request object
   * @res: response object
   *
   * @return - events that user is attending or 404
   */
  static async showEvent(req, res) {
    if (!req.session.authenticated) {
      return res.status(401).json({ error: 'you must be authenticated to check your events' });
    }
    dbInstance.db.collection('users').aggregate([
      { $match: { _id: ObjectId(req.session.userId) } },
      {
        $lookup:
          {
            from: 'events',
            localField: 'eventIds',
            foreignField: '_id',
            as: 'events',
          },
      },
    ]).toArray().then((result) => {
      if (result[0].events.length > 0) {
        return res.status(200).json({ events: result[0].events });
      }
      return res.status(404).json({ error: 'no events found' });
    });
  }

  /*
   * @showEventsByCreation: show events that the user created
   *
   * @req: request object
   * @res: response object
   *
   * @return - events that user is attending or 404
   */
  static async showEventsByCreation(req, res) {
    if (!req.session.authenticated) {
      return res.status(401).json({ error: 'you must be authenticated to check your events' });
    }
    dbInstance.db.collection('events').aggregate([
      { $match: { createrId: req.session.userId } },
      {
        $lookup:
          {
            from: 'category',
            localField: 'category',
            foreignField: '_id',
            as: 'category',
          },
      },
    ]).toArray().then((result) => {
      if (result.length > 0) {
        return res.status(200).json({ events: result });
      }
      return res.status(404).json({ error: 'no events found' });
    });
  }
  /*
   * @unattendEvent: remove event's reference from user
   *
   * @req: request object
   * @res: response object
   *
   */
  static async unattendEvent(req, res) {
    if (!req.session.authenticated) {
      return res.status(401).json({ error: 'you must be authenticated to unattend the event' });
    }
    const { userId } = req.session;
    const { eventId } = req.params;
    const user = await dbInstance.db.collection('users').updateOne({ _id: ObjectId(userId) }, { $pull: { eventIds: ObjectId(eventId) } });
    if (user.modifiedCount !== 1) {
      return res.status(500).json({ error: 'error occureed removing event' });
    }
    const evnt = await dbInstance.db.collection('events').updateOne({ _id: ObjectId(eventId) }, { $pull: { attendees: ObjectId(userId) } });
    if (evnt.modifiedCount !== 1) {
      return res.status(500).json({ error: 'error occureed removing event' });
    }
    return res.status(200).json({ message: 'successfully removed event from events user is attending' });
  }
}
module.exports = UserControllers;
