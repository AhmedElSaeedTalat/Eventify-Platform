import { MongoClient } from 'mongodb';
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
    this.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await this.client.connect((err) => {
      if (err) {
        console.log(err);
      }
      console.log('database connected successfully');
      this.db = this.client.db('events');
    });
  }
}
const dbInstance = new DbClient();
dbInstance.connect();
module.exports = dbInstance;
