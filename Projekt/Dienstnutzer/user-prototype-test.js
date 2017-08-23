var users = {
      "id": userid,
      "url": "https://wba2ss17-team38.herokuapp.com/users/" + userid,
      "user_name": req.body.user_name || "template username",
      "first_name": req.body.first_name || "template firstname",
      "last_name": req.body.last_name || "template lastname",
      "age": req.body.age || "template age",
      "email": req.body.email || "template email",
      "password": passwordHash.generate(req.body.password),
      "experience_points": 0,
      "tagabos": [],
      "followers": []
    };

    ep_update: function() {
      for (i = 0; i > clue.length; i++){
        experience_points =+ 10;
      }
      return;
    }

    app.patch('/users/:userid/experience_points', function(req, res) {
      var data = req.body;
      var userid = req.params.userid;
      var url = dURL +  '/users/' + userid '/experience_points/';

      //TODO implement PATCH method
      var options = {
        uri: url,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        json: data
      };

      request(options, function(err, response, body) {
          console.log('PATCH /users/' + userid + '/experience_points/' '=> \n', body);
        res.json(body)
      });
    });
