import { ObjectId } from 'mongodb';
import CategoryControllers from './CategoryControllers';
import UserControllers from './UserControllers';
import dbInstance from '../utils/db';
import sort from '../qsort';
import search from '../search';
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
    const acceptedFields = ['name', 'description', 'date', 'location', 'organizer', 'state', 'price'];
    const keys = Object.keys(req.body);
    for (const field of acceptedFields) {
      if (!keys.includes(field)) {
        return res.status(404).json({ error: `couldnt insert event check missing field ${field}` });
      }
    }
    const {
      name,
      description,
      date,
      state,
      location,
      organizer,
      category,
      price,
    } = req.body;
    const image = req.file.filename;
    const createrId = req.session.userId;
    // check if date of event is valid
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
    let convertPrice;
    if (!Number.isNaN(price) && Number.isInteger(Number(price))) {
      convertPrice = Number(price);
    } else {
      return res.status(500).json({ error: 'could\'t insert price' });
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
      price: convertPrice,
      category: categoryId,
      image,
    };
    const eventId = await EventControllers.insertEvent(data);
    if (eventId === -1) {
      return res.status(500).json({ error: 'couldn\'t insert event check missing fields' });
    }
    return res.status(201).json({ message: 'successfully added event', eventID: eventId });
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
    const acceptedFields = ['name', 'description', 'date', 'location', 'organizer', 'state', 'price'];
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
    const currentDate = new Date();
    for (const [key, value] of Object.entries(passedData)) {
      if (!acceptedFields.includes(key)) {
        return res.status(500).json({ error: `${key} field cant be updated` });
      }
      // convert date string to date object and make sure its valid
      if (key === 'date') {
        passedData[key] = new Date(passedData[key]);
        if (currentDate > passedData[key]) {
          return res.status(500).json({ error: 'please provide a valid date' });
        }
      }
      // convert prince string to integer before its inserted
      if (key === 'price') {
        if (!Number.isNaN(passedData[key]) && Number.isInteger(Number(passedData[key]))) {
          passedData[key] = Number(passedData[key]);
        } else {
          return res.status(500).json({ error: 'could\'t update price' });
        }
      }
    }
    const response = await dbInstance.db.collection('events').updateOne({ _id: ObjectId(id) }, { $set: passedData });
    if (response.modifiedCount === 1) {
      return res.status(200).json({ message: 'document succesfully was updated' });
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
      return res.status(404).json({ error: 'no event was found' });
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

    // query in case displaying all events sorted by price
    const pipeStandardPrice = [
      {
        $lookup: {
          from: 'category',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $match: { date: { $gte: new Date() } } },
      { $sort: { price: 1 } },
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

    // query in case displaying events based on category and sorted by price
    const pipeCategoryPrice = [
      {
        $lookup: {
          from: 'category',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $match: { date: { $gte: new Date() }, 'category.name': category } },
      { $sort: { price: 1 } },
      { $skip: (page - 1) * pageSize },
      { $limit: pageSize },
    ];

    if (category) {
      if (sortField === 'date') {
        dbInstance.db.collection('events').aggregate(pipeCategoryDate).toArray().then((result) => {
          res.status(200).json({ result });
        });
      } else if (sortField === 'price') {
        dbInstance.db.collection('events').aggregate(pipeCategoryPrice).toArray().then((result) => {
          res.status(200).json({ result });
        });
      } else {
        dbInstance.db.collection('events').aggregate(pipeCategory).toArray().then((result) => {
          res.status(200).json({ result });
        });
      }
    } else {
      if (sortField === 'date') {
        dbInstance.db.collection('events').aggregate(pipeStandardDate).toArray().then((result) => {
          res.status(200).json({ result });
        });
      } else if (sortField === 'price') {
        dbInstance.db.collection('events').aggregate(pipeStandardPrice).toArray().then((result) => {
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
      return res.status(500).json({ error: 'coudn\'t be modifed 1' });
    }
    // add reference to user reference to event
    const updatedEvent = await dbInstance.db.collection('events').updateOne({ _id: ObjectId(eventId) }, { $push: { attendees: ObjectId(userId) } });
    if (updatedEvent.modifiedCount !== 1) {
      return res.status(500).json({ error: 'coudn\'t be modifed' });
    }
    return res.status(200).json({ message: 'sucessfully attending event' });
  }

  /*
   * @searchEvent: using db search for event
   * used createria name and location
   *
   * @req: request object
   * @res: response object
   *
   */
  static async searchEvent(req, res) {
    const { text, date } = req.body;
    const result = await dbInstance.db.collection('events').find({ $text: { $search: text } }).toArray();
    if (result.length === 0) {
      return res.status(404).json({ error: 'no result found' });
    }
    if (date) {
      const dateObj = new Date(date);
      sort(result);
      const foundEvents = search(result, dateObj);
      if (foundEvents.length > 0) {
        return res.status(200).json(foundEvents);
      }
      return res.status(404).json({ error: 'no results were found' });
    }
    return res.status(200).json(result);
  }

  /*
   * @searchEventByDate: searches events by date
   *
   *
   * @req: request object
   * @res: response object
   *
   * @return - response with all events with the searched date
   *
   */
  static async searchEventByDate(req, res) {
    const { date } = req.body;
    const dateObj = new Date(date);
    const allEvents = await dbInstance.db.collection('events').find().toArray();
    if (allEvents.length === 0) return res.status(500).json({ error: 'something went wrong' });
    sort(allEvents);
    const foundEvents = search(allEvents, dateObj);
    if (foundEvents.length > 0) {
      return res.status(200).json(foundEvents);
    }
    return res.status(404).json({ error: 'no results were found' });
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
