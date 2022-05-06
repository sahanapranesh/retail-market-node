const { MongoClient } = require('mongodb');
const connectionString = process.env.CONNECTIONSTRING || 'mongodb://mongodb:27017';
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        console.log('Unable to connect to DB')
        return callback(err);
      }

      dbConnection = db.db('categories_db');
      console.log('Successfully connected to MongoDB.');

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};