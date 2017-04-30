var fs = require('fs');
var chalk = require('chalk');
var _dirname = "./../Code";

fs.readFile(_dirname+"/staedte.json", "utf8", function(err, data){
  if (err) throw err;
  console.log(chalk.red(data));
});
