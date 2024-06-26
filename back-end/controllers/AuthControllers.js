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
    const { username, email, password } = req.body;
    if (!username) {
      return res.status(400).json({ error: 'Missing username' });
    }
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
    const userId = await UserControllers.insertUser(username, email, hashedPassword);
    req.session.authenticated = true;
    req.session.userId = userId;
    return res.status(201).json({
      message: 'user got registered',
      sessionId: req.sessionID,
      userId,
      username,
    });
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
    if (req.session.authenticated === true) {
      return res.status(400).json({ message: 'user is already logged in', sessionId: req.sessionID });
    }
    req.session.authenticated = true;
    req.session.userId = user._id.toString();
    return res.status(200).json({
      message: 'user got logged in',
      sessionId: req.sessionID,
      userId: user._id.toString(),
      username: user.username,
    });
  }

  /*
   * @logout: function to logout
   * destroys session
   *
   */
  static async logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err });
      }
      return res.status(200).json({ message: 'logged out successfully' });
    });
  }

  /*
   * @checkSession: check if session is active
   *
   * @req: request object
   * @res: response object
   *
   * @return - if session is active
   */
  static async checkSession(req, res) {
    let status = false;
    if (req.session.authenticated) status = true; else status = false;
    return res.status(200).json({ status });
  }
}
module.exports = AuthController;
