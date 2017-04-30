var fs = require('fs');
var _dirname = "./../../../../Code";

fs.readFile(_dirname+"/staedte.json", function(err, data){
  if (err) throw err;
  console.log(data);
})
