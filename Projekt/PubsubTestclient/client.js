const prompt = require('prompt');
const faye = require('faye');
const io = require('socket.io-client');

const promptSchema = require(__dirname+'/promptschema.js');

prompt.start();
process.stdin.setEncoding('utf8');

// Prompt to select service type
prompt.get(promptSchema.service, function(err, serviceresult) {

    if (err !== null) { console.log(err); }

    // SOCKETIO
    if (serviceresult.service == "socketio") {

        console.log("----- SOCKET.IO CLIENT -----");

        prompt.get(promptSchema.socketio, function(err, socketresult) {
            if (err != null) { console.log(err); }

            var s = io.connect(socketresult.host);

            s.on('connect', function(socket){
                console.log("Connected to "+socketresult.host);
                console.log("Type text and hit enter to send messages to '"+socketresult.writingsocket+"'");

                if (socketresult.writingsocket != null) {
                    process.stdin.on('readable', () => {
                        var chunk = process.stdin.read();

                        if (chunk !== null) {
                            s.emit(socketresult.writingsocket, chunk.toString().replace('\n', '\t'));
                        }
                    });
                }
            });

            s.on(socketresult.readingsocket, function(data){
                console.log("Data from "+socketresult.host+" on "+socketresult.readingsocket+": \n"+JSON.stringify(data));
            });

            s.on('disconnect', function(socket){
                console.log("Disconnected from "+socketresult.host);
            });
        });

    // FAYE
    } else if (serviceresult.service == "faye") {

      console.log("----- FAYE CLIENT -----");

      prompt.get(promptSchema.faye, function(err, fayeresult) {
        if (err != null) { console.log(err); }

        if (fayeresult.suborpub == "sub"){
          prompt.get(promptSchema.fayesub, function(err, subresult) {
            if (err != null) { console.log(err); }

            var client = new faye.Client(subresult.host+"/faye");
            console.log("Info: Incoming messages are assumed to be in JSON format.");

            client.subscribe(subresult.topic, function(message) {

                console.log("Received message: "+JSON.stringify(message));

            }).then(function() {

                console.log("Subscribed to "+subresult.topic+" on "+subresult.host+"!");

            }, function(error) {

                console.log("There was an error subscribing: "+error);

            });
          });

        } else if (fayeresult.suborpub == "pub") {

          prompt.get(promptSchema.fayepub, function(err, pubresult) {
            if (err != null) { console.log(err); }
            var client = new faye.Client(pubresult.host+"/faye");

            client.publish( pubresult.topic, { text: pubresult.message } )
            .then(function() {

              console.log('Message received by server!');

            }, function(error) {

              console.log('There was an error publishing: ' + error.message);

            });
          });

        }

      });

    }
});
