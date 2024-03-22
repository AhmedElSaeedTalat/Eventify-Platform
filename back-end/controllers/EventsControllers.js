import { ObjectId } from 'mongodb';
import CategoryControllers from './CategoryControllers';
import UserControllers from './UserControllers';
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
    const {
      name,
      description,
      date,
      state,
      location,
      organizer,
      category,
    } = req.body;
    const createrId = req.session.userId;
    // check if date of event passed and is valid
    if (!date) {
      return res.status(404).json({ error: 'date of event wasnt passed' });
    }
    const dateObj = new Date(date);
    const currentDate = new Date();
    if (currentDate > dateObj) {
      return res.status(500).json({ error: 'please provide a valid date' });
    }
    let categoryId;
    // check if category passed is valid, by finding it
    // passing its id to db
    const categoryDocument = await CategoryControllers.findCategory({ name: category });
    if (categoryDocument) {
      categoryId = categoryDocument._id;
    } else {
      return res.status(404).json({ error: 'please send a valid category name' });
    }
    // send data to db
    const data = {
      name,
      description,
      createrId,
      date: dateObj,
      location,
      organizer,
      state,
      category: categoryId,
    };
    const eventId = await EventControllers.insertEvent(data);
    if (eventId === -1) {
      return res.status(500).json({ error: 'couldn\'t insert event check missing fields' });
    }
    return res.status(201).json({ messege: 'successfully added event', eventID: eventId });
  }

  /*
   * @updateEvent: update events
   *
   * @req: request object
   * @res: response object
   *
   */
  static async updateEvent(req, res) {
    if (!req.session.authenticated) {
      return res.status(401).json({ error: 'you must be authenticated to update the event' });
    }
    /* determine accepted fields to be updated */
    const acceptedFields = ['name', 'description', 'date', 'location', 'organizer', 'state'];
    const id = req.params;
    /* check if event exists */
    const evnt = await EventControllers.findEvent({ _id: ObjectId(id) });
    if (!evnt) {
      return res.status(404).json({ error: 'can\'t find event' });
    }

    /* check if the user attempting to update the
     * event is the one who created it
     */
    if (evnt.createrId !== req.session.userId) {
      return res.status(401).json({ error: 'you must be the event creater to update the event' });
    }
    const passedData = req.body;
    for (const [key, value] of Object.entries(passedData)) {
      if (!acceptedFields.includes(key)) {
        return res.status(500).json({ error: 'field can\'t be updated' });
      }
      if (key === 'date') {
        passedData[key] = new Date(passedData[key]);
      }
    }
    const response = await dbInstance.db.collection('events').updateOne({ _id: ObjectId(id) }, { $set: passedData });
    if (response.modifiedCount === 1) {
      return res.status(200).json({ msg: 'document succesfully was updated' });
    }
    return res.status(500).json({ error: 'there was an error updating the document' });
  }

  /*
   * @displayEvent: display and event function
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
   * @displayEvents: display all events
   *
   * @req: request object
   * @res: response object
   *
   *
   */
  static async displayEvents(req, res) {
    const pageSize = 3;
    const { category, sortField } = req.query;
    let { page } = req.query;
    if (!page) page = 1;
    // query in case displaying all events
    const pipeStandard = [
      {
        $lookup: {
          from: 'category',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $match: { date: { $gte: new Date() } } },
      { $skip: (page - 1) * pageSize },
      { $limit: pageSize },
    ];

    // query in case displaying events based on category
    const pipeCategory = [
      {
        $lookup: {
          from: 'category',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $match: { date: { $gte: new Date() }, 'category.name': category } },
      { $skip: (page - 1) * pageSize },
      { $limit: pageSize },
    ];

    // query in case displaying all events sorted by date
    const pipeStandardDate = [
      {
        $lookup: {
          from: 'category',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $match: { date: { $gte: new Date() } } },
      { $sort: { date: 1 } },
      { $skip: (page - 1) * pageSize },
      { $limit: pageSize },
    ];

    // query in case displaying events based on category and sorted by date
    const pipeCategoryDate = [
      {
        $lookup: {
          from: 'category',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $match: { date: { $gte: new Date() }, 'category.name': category } },
      { $sort: { date: 1 } },
      { $skip: (page - 1) * pageSize },
      { $limit: pageSize },
    ];

    if (category) {
      if (sortField) {
        dbInstance.db.collection('events').aggregate(pipeCategoryDate).toArray().then((result) => {
          res.status(200).json({ result });
        });
      } else {
        dbInstance.db.collection('events').aggregate(pipeCategory).toArray().then((result) => {
          res.status(200).json({ result });
        });
      }
    } else {
      if (sortField) {
        dbInstance.db.collection('events').aggregate(pipeStandardDate).toArray().then((result) => {
          res.status(200).json({ result });
        });
      } else {
        dbInstance.db.collection('events').aggregate(pipeStandard).toArray().then((result) => {
          res.status(200).json({ result });
        });
      }
    }
  }

  /*
   * @attendEvent: function so user Attend Event
   *
   *
   * @req: request object
   * @res: response object
   *
   */
  static async attendEvent(req, res) {
    if (!req.session.authenticated) {
      return res.status(401).json({ error: 'you must be authenticated to attend the event' });
    }
    const { userId } = req.session;
    const { eventId } = req.body;
    // add event reference to user after checking if id
    // is not there
    const user = await UserControllers.findUser({ _id: ObjectId(userId) });
    if (user.hasOwnProperty('eventIds')) {
      for (const item of user.eventIds) {
        if (item.equals(ObjectId(eventId))) {
          return res.status(500).json({ error: 'user has already registered for this event' });
        }
      }
    }
    const updatedUser = await dbInstance.db.collection('users').updateOne({ _id: ObjectId(userId) }, { $push: { eventIds: ObjectId(eventId) } });
    if (updatedUser.modifiedCount !== 1) {
      return res.status(500).json({ error: 'coudn\'t be modifed' });
    }
    // add reference to user reference to event
    const updatedEvent = await dbInstance.db.collection('events').updateOne({ _id: ObjectId(eventId) }, { $push: { attendees: ObjectId(userId) } });
    if (updatedEvent.modifiedCount !== 1) {
      return res.status(500).json({ error: 'coudn\'t be modifed' });
    }
    return res.status(200).json({ msg: 'sucessfully attending event' });
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
