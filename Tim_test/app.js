var redis = require("redis"),
    client = redis.createClient();

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function (err) {
    console.log("Error " + err);
});

client.set("string key", "string val", redis.print);
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
client.hkeys("hash key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
    //disabled for testing
    //client.quit();
});


//storing JSON objects and return them
client.hmset('test', {
  'name': 'wba2',
  'task': 'development'
});

client.hgetall('test', function(err, object){
  console.log(object);
  console.log("Der Wert des Attributs name ist: "+object.name);
});

//end redis database
client.quit();
