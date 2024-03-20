import { v4 } from 'uuid';
import { promisify } from 'util';
import { createClient } from 'redis';
/* redis module */
class RedisModule {
  /*
   * @constructor: instantiate class
   *
   */
  constructor() {
    this.client = createClient();
    this.client.on('connect', (err) => {
      if (err) {
        console.log(err);
      }
      console.log('redis is connected');
      this.set = promisify(this.client.set).bind(this.client);
      this.get = promisify(this.client.get).bind(this.client);
    });
  }
}

const redisInstance = new RedisModule();
module.exports = redisInstance;
