import { ObjectId } from 'mongodb';
/* event schema */

/*
 * @checkExists: function to check if a collection exists
 *
 * @db: takes connected db
 *
 * @return - true if collection exists or false otherwise
 *
 */
const checkExists = async (db) => {
  const collections = await db.listCollections({ name: 'events' }).toArray();
  if (collections.length > 0) {
    return true;
  }
  return false;
};

/*
 * @createIndex: function to create index and
 * add the unique attribute on name
 *
 */
const createIndex = async (db) => {
  const exists = await db.collection('events').indexExists('name_1');
  if (!exists) {
    await db.collection('events').createIndex({ name: 1 }, { unique: true });
    await db.collection('events').createIndex({ name: 'text', location: 'text' });
  }
};

const createEventCollection = async (db) => {
  const exists = await checkExists(db);
  if (exists) {
    createIndex(db);
    return;
  }
  await db.createCollection('events', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['name', 'description', 'createrId', 'date', 'location', 'organizer', 'category', 'state', 'price'],
        properties: {
          name: {
            bsonType: 'string',
            description: 'Name is a required field',
          },
          description: {
            bsonType: 'string',
            description: 'Description is a required field',
          },
          createrId: {
            bsonType: ObjectId,
            description: 'createrId is a required field',
          },
          date: {
            bsonType: 'date',
            description: 'Date is a required field',
          },
          location: {
            bsonType: 'string',
            description: 'Location is a required field',
          },
          organizer: {
            bsonType: 'string',
            description: 'Organizer is a required field',
          },
          category: {
            bsonType: ObjectId,
            description: 'categoryId is a required field',
          },
          state: {
            bsonType: 'string',
            description: 'state is a required field, show the state of event active or cancelled',
          },
          price: {
            bsonType: 'int',
            description: 'price is a required field, event price ticket',
          },
          attendees: {
            bsonType: 'array',
            items: {
              type: ObjectId,
            },
          },
        },
      },
    },
  });
};
module.exports = createEventCollection;
