const mongoose = require('mongoose')


const connectMongo = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then( mongoose.connection.on('connected', () => {
      console.log('Mongoose is connected');
    }))
    .then(mongoose.connection.on('error', (err) => {
      console.log(`Error message : ${err.message}`);
    }))
    .then(mongoose.connection.on('disconnected', () => {
      console.log(`Mongoose is disconeted`);
    }))

    console.log(`Connect to MongoDb : ${conn.connection.host}`);

  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}






module.exports = connectMongo


