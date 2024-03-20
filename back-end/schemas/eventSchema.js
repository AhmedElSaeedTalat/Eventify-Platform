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
  }
};

const createCollection = async (db) => {
  createIndex(db);
  if (checkExists(db)) {
    return;
  }
  await db.createCollection('events', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['name', 'description', 'createrId', 'date', 'location', 'organizer'],
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
module.exports = createCollection;
