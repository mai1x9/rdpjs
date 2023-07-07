// var rdp = require('node-rdpjs-2');
var rdp = require('./rdp');

var client = rdp.createClient({ 
	// domain : 'windows-himansh', 
    domain: "168.62.61.20",
	userName : 'windows',
	password : 'pyHR1#pyHR1#',
	enablePerf : true,
	autoLogin : true,
	decompress : false,
	screen : { width : 800, height : 600 },
	locale : 'en',
	logLevel : 'INFO'
}).on('connect', function () {
    console.log("connected ,,,")
}).on('close', function() {
}).on('bitmap', function(bitmap) {
    console.log("bitmap: ", bitmap)
}).on('error', function(err) {
    console.log("error: ", err)
}).connect('168.62.61.20', 3389);
