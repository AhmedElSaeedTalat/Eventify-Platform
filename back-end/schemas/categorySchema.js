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
  const collections = await db.listCollections({ name: 'category' }).toArray();
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
  const exists = await db.collection('category').indexExists('name_1');
  if (!exists) {
    await db.collection('category').createIndex({ name: 1 }, { unique: true });
  }
};

const createCategoryCollection = async (db) => {
  const exists = await checkExists(db);
  if (exists) {
    createIndex(db);
    return;
  }
  await db.createCollection('category', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['name'],
        properties: {
          name: {
            bsonType: 'string',
            description: 'Name is a required field',
          },
          description: {
            bsonType: 'string',
          },
        },
      },
    },
  });
};
module.exports = createCategoryCollection;
