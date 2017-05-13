// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://jomehr:C7ge5Ukexemongodb!@cluster0-shard-00-00-7mfrx.mongodb.net:27017,cluster0-shard-00-01-7mfrx.mongodb.net:27017,cluster0-shard-00-02-7mfrx.mongodb.net:27017/admin?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});
