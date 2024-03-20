import dbInstance from '../utils/db';
/* categoryControllers */

class CategoryControllers {
  /*
   * @findCategory: function to find category in database
   *
   * @data: data passed
   *
   * @return - found user or null
   *
   */
  static async findCategory(data) {
    const collection = await dbInstance.db.collection('category');
    const category = await collection.findOne(data);
    return category;
  }

  /*
   * @insertCategory: function to insert new category
   *
   * @data: data passed
   *
   * return - id for the inserted user
   */
  static async insertUser(data) {
    const collection = await dbInstance.db.collection('category');
    const category = await collection.insertOne(data);
    return category.insertedId;
  }
}
module.exports = CategoryControllers;
