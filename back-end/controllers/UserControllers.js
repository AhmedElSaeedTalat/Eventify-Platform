import dbInstance from '../utils/db';
/* user controller */
class UserControllers {
  /*
   * @findUser: function to find user in database
   *
   * @return - found user or null
   *
   */
  static async findUser(data) {
    const collection = await dbInstance.db.collection('users');
    const user = await collection.findOne(data);
    return user;
  }

  /*
   * @insertUser: function to insert new user
   *
   * @email: user's email passed
   * @password: user's password passed
   *
   * return - id for the inserted user
   */
  static async insertUser(email, password) {
    const collection = await dbInstance.db.collection('users');
    const user = await collection.insertOne({ email, password });
    return user.insertedId;
  }
}
module.exports = UserControllers;
