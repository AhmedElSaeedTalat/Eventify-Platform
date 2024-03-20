import { MongoClient } from 'mongodb';
import createEventCollection from '../schemas/eventSchema';
import createCategoryCollection from '../schemas/categorySchema';
/* module to set up db */

class DbClient {
  /*
   * @connect: to connect to db
   *
   */
  async connect() {
    const host = process.env.DB || 'localhost';
    const port = process.env.PORT || 27017;
    const url = `mongodb://${host}:${port}`;
    this.client = new MongoClient(url);
    this.client.connect((err) => {
      if (err) {
        console.log(err);
      }
      console.log('database connected successfully');
      this.db = this.client.db('events');
      try {
        createEventCollection(this.db);
        createCategoryCollection(this.db);
      } catch (err) {
        console.log(err);
      }
    });
  }
}
const dbInstance = new DbClient();
dbInstance.connect();
module.exports = dbInstance;
