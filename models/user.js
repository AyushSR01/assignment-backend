const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  ticketId: String,
  userid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"UserDetails",
  },
  name: {
    type:String,
    required:true
},
  department:{
    type:String,
    required:true,
},
  date:Date,
  subject:{
    type:String,
    required:true
},
  description:{
    type:String,
    required:true
},
  category:{
    type:String,
    required:true
},
  status:{
    type:String,
    enum:["On Hold" , "In Progress" , "Pending", "Closed"],
    default:"In Progress",
  },
  priority:{
    type:String,
    enum:["High " , "Medium", "Low"],
    default:"Low",
  },
  supportBy:String,
  assignedto:String,
  rating:Number,
});

userSchema.pre('save', function (next) {
  if (!this.ticketId) {
    this.ticketId = this._id.toString(); 
  }
  next();
});

module.exports = mongoose.model('User', userSchema);