const { request } = require('express');
const user=require('../models/user');
const userdet=require('../models/userdetails');
const jwt=require("jsonwebtoken");

exports.getTickets = async (req, res) => {
  const id=req.params.id;
 const tickets = await user.find({ userid:id }); // or req.user._id
res.status(200).json({
  message: "Tickets fetched successfully",
  data: tickets, // ✅ NOT null
});
};



exports.auth = async (req, res) => {
  const { email , password } = req.body;
  try {
    const user = await userdet.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
   const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_SECRET || "defaultSecret",
      { expiresIn: "0.5h" }
    );
    res.status(200).json({ message: 'Login successful',user:{id:user._id,token}});
    
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.authup = async (req, res) => {
  const {userName,password,email} = req.body;
    try {
    const existingUser = await userdet.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new userdet({
      userName,
      password,
      email,
    });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};



exports.createTicket = async (req, res) => {
  try{
    const userData=req.user;
    const ticketData=req.body;
    ticketData.userid=userData._id;
    const saveTicket= await user.create(ticketData);
    if(!saveTicket){
      return res.status(401).json({message:"no tikcet saved"});
    }
    res.status(201).json({message:"ticket created successfully"});
  }
  catch(err){
    console.error("🔥 Ticket creation error:", err); // LOG the error
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getDetails = async (req, res) => {
  const id=req.params.id;
  const users = await userdet.findById(id);
  res.json(users);
};

