import sha1 from 'sha1';
import UserControllers from './UserControllers';
/* Auth controller Module */
class AuthController {
  /*
   * @postUser: post users in db
   *
   * @req: request object passed as
   * an argument
   * @res: response object passed
   *
   */
  static async postUser(req, res) {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const user = await UserControllers.findUser({ email });
    if (user) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    // inserting new user and returning token
    const hashedPassword = sha1(password);
    const userId = await UserControllers.insertUser(email, hashedPassword);
    req.session.authenticated = true;
    req.session.userId = userId;
    //const sessionId = await redisInstance.startSession(id);
    //return res.status(201).json({ message: 'user got registered', sessionId });
    return res.status(201).json({ message: 'user got registered' });
  }

  /*
   * @login: function to login
   *
   */
  static async login(req, res) {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const user = await UserControllers.findUser({ email, password: sha1(password) });
    if (!user) {
      return res.status(404).json({ error: 'user is either not registered or incorrect password' });
    }
    req.session.authenticated = true;
    req.session.userId = user._id.toString();
    return res.status(200).json({ message: 'user got logged in' });
  }

  /*
   * @logout: function to logout
   * destroys session
   *
   */
  static async logout(req, res) {
    //const { sessionId } = req.body;
    //const id = redisInstance.getSession(sessionId);
    //if (id) {
    //  await redisInstance.destroySession(sessionId);
    //  return res.status(200).json({ message: 'user got logged out' });
    //}
    return res.static(400).json({ error: 'invalid session id' });
  }
}
module.exports = AuthController;
