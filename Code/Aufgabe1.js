var fs = require('fs');
var _dirname = "./../Code";

fs.readFile(_dirname+"/staedte.json", "utf8", function(err, data){
  if (err) throw err;
  JSON.stringify(data);
  console.log(data);
});
