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
      this.set = promisify(this.client.set).bind(this.client);
      this.get = promisify(this.client.get).bind(this.client);
    });
  }

  /*
   * @startSession: function that starts session for registered user
   *
   * @id: id for user to sart session for
   *
   * @return - session id
   *
   */
  async startSession(userId) {
    const sessionId = v4();
    await this.set(sessionId, userId, 'EX', 86400);
    return sessionId;
  }

  /*
   * @get: retrieve user id using session id
   *
   * @sessionId: session id passed
   *
   * @return - user id
   *
   */
  async getSession(sessionId) {
    const userId = await this.get(sessionId);
    return userId;
  }

  /*
   * @destroySession: function to destroy session
   *
   * @sessionId: session id passed to destroy session for
   *
   */
  destroySession(sessionId) {
    this.client.del(sessionId, (err) => {
      if (err) {
        console.log(err);
      }
	});
  }
}

const redisInstance = new RedisModule();
module.exports = redisInstance;
