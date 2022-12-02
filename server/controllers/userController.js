const { User } = require('../models/models');

class UserController {
  async createUser(req, res) {
    const { name } = req.body;
    try {
      const user = await User.create({ name });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
module.exports = new UserController();
