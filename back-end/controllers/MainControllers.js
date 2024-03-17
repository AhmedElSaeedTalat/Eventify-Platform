/* main controller */
class MainControllers {
  static home(req, res) {
    return res.send('hello world!');
  }
}
module.exports = MainControllers;
