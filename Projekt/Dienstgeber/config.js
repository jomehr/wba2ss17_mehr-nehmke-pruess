var config = {
  //secret which is used to hash json-web-token
  'secret': 'supersecret-json-web',

  //mongoDB Connection
  'database': 'mongodb://tnehmke:fn7Xf8bXfnmongodb@cluster0-shard-00-00-4ioss.mongodb.net:27017,cluster0-shard-00-01-4ioss.mongodb.net:27017,cluster0-shard-00-02-4ioss.mongodb.net:27017/Cluster0?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',

  'mailConfig': {

    //SMTP Host
    host: 'gmail.com',

    //SSL Port
    port: 587 ,

    //use SSL (recommended)
    secure: true,

    //mail credentials
    auth: {
      user: 'tim.nehmke@gmail.com',
      pass: 'admin'
    }
  }
};
module.exports = config;
