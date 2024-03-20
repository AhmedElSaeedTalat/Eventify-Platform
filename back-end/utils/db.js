import { MongoClient } from 'mongodb';
import createCollection from '../schemas/eventSchema';
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
        createCollection(this.db);
      } catch (err) {
        console.log(err);
      }
    });
  }
}
const dbInstance = new DbClient();
dbInstance.connect();
module.exports = dbInstance;
