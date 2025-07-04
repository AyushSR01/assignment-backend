const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config();

const app = express(); // ✅ Declare app at the top

// ✅ Middleware setup
app.use(express.json());
app.use(morgan('dev'));

// ✅ CORS setup
const allowedOrigins = [
  process.env.FRONT_END_URL, // should be set in .env
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
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



console.log("Mounting routes...");

const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);
console.log("User routes mounted.");

const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);
console.log("Admin routes mounted.");

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error', err));

// ✅ Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});
