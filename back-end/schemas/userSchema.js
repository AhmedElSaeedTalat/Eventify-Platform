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
  const collections = await db.listCollections({ name: 'users' }).toArray();
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
  const exists = await db.collection('users').indexExists('email_1');
  if (!exists) {
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
  }
};

const createUsersCollection = async (db) => {
  const exists = await checkExists(db);
  if (exists) {
    createIndex(db);
    return;
  }
  await db.createCollection('users', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['username', 'email', 'password'],
        properties: {
          username: {
            bsonType: 'string',
            description: 'Email is a required field',
          },
          email: {
            bsonType: 'string',
            description: 'Email is a required field',
          },
          password: {
            bsonType: 'string',
            description: 'Password is a required field',
          },
          eventIds: {
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
module.exports = createUsersCollection;
