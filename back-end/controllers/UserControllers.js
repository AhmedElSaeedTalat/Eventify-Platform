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
      if (result.length > 0) {
        return res.status(200).json({ events: result[0].events });
      }
      return res.status(404).json({ error: 'no events found' });
    });
  }
}
module.exports = UserControllers;
