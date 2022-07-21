// import Mongoose as ODM
// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cottages',
//   {
//     useNewURLParser: true,
//     useUnifiedTopology: true,
//   });

// const connection = mongoose.connection;
  
// connection.on('error', () => {
//   console.log(`Mongo DB connection failed`);
// });

// connection.on('connected', () => {
//   console.log(`Mongo DB connection successful`)
// });

// module.exports = connection;


const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cottages', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;