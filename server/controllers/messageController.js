const { Message } = require('../models/models');

class MessageController {
  async getMessagesReceived(req, res) {
    try {
      const messages = await Message.findAll({ where: { receiverName: req.body.user } });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getMessagesSended(req, res) {
    try {
      const messages = await Message.findAll({ where: { nameSender: req.body.user } });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async createMessage(req, res) {
    const { nameSender, receiverName, messageBody, title } = req.body;
    try {
      const message = await Message.create({
        receiverName,
        nameSender,
        title,
        messageBody,
      });
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new MessageController();
