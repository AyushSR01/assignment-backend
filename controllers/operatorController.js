const operator=require('../models/operator');
const ticket=require('../models/user');

exports.getDetails = async (req, res) => {
  const users = await operator.find();
  res.json(users);
};

exports.updateDetails = async (req, res) => {
  const newUser = new ticket(req.body);
  const savedUser = await newUser.save();
  res.status(201).json(savedUser);
};
