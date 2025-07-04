const operator=require('../models/operator');
const user=require('../models/userdetails');
const operators=require('../models/operator');

exports.deleteDetailsO=async(req , res )=>{
    try{const id=req.params.id;
    const resu= await operator.findByIdAndDelete(id);
    if (!resu) return res.status(404).json({ message: 'operator not found' });

    res.status(200).json({
      message: 'operator deleted successfully',
      resu,
    });
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.deleteDetailsU = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await user.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({
      message: 'User deleted successfully',
      deleted,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDetailsU = async (req, res) => {
  const users = await user.find();
  res.json(users);
};

exports.addOperator = async (req, res) => {
  try {
    const { operatorName, department, email, number } = req.body;


    const newOperator = new operators({
      operatorName,
      department,
      email,
      number,
    });

    const saved = await newOperator.save();

    res.status(201).json({ message: 'Operator added', data: saved });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


