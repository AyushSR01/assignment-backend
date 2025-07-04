const express= require('express');
const mongoose= require('mongoose');
const dotenv= require('dotenv');
const cors= require('cors');
const morgan=require('morgan');

dotenv.config();
const app=express();

app.use(express.json());


const allowedOrigins = [
  process.env.FRONT_END_URL,
  'http://localhost:5173' 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.options("*", cors()); 
app.use(morgan("dev"));

const userRoutes=require('./routes/userRoutes');
app.use('/user',userRoutes);
const adminRoutes=require('./routes/adminRoutes');
app.use('/admin',adminRoutes);

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.log("mongodb connecti0on error",err));

const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`server is started on ${port}`);
});