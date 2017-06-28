var fs = require("fs")	//filesystem
var startServer = require("./server.js")

//https://www.tutorialspoint.com/nodejs/nodejs_process.htm
process.stdin.resume()
process.on('exit', onExit)
process.on('SIGINT', onExit)						//wenn Prozess abgebrochen wird
process.on('uncaughtException', onExit)	//uncaughtException=Error

//parse=aus Json-Objekt ein JavaScript-Objekt
//https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options
//fs.readFileSync(path[, options])
function loadDatabase() {
	return JSON.parse(fs.readFileSync('database.json'))			//parse -> wandelt JSON in JavaScript
}
/*
function saveDatabase (data) {
	fs.writeFileSync('database.json', JSON.stringify(data))	//stringify -> wandelt JavaScript in JSON
}
*/
//Daten aus Datei laden, wenn der Server startet
global.database = loadDatabase()

//Daten in Datei speichern, wenn der Server stoppt
function onExit () {
	saveDatabase(database)
	console.log("Server gestoppt und Datei gespeichert")
	process.exit()
}


startServer()
