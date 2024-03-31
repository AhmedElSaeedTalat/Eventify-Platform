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
   * return - id for the inserted category
   */
  static async insertCategory(req, res) {
    const data = req.body;
    const collection = await dbInstance.db.collection('category');
    const category = await collection.insertOne(data);
    res.json({ id: category.insertedId });
  }
}
module.exports = CategoryControllers;
