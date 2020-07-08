
function tunnel()
{
require('dotenv').config();
const express = require('express');
const application = express();
const ngrok = require('ngrok');
var url;



const handler = require('serve-handler');
const http = require('http');
 
const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/zeit/serve-handler#options
  return handler(request, response);
})


server.listen(process.env.PORT, () => {
  console.log('Running at http://localhost:3000');
  if( url == null)
  {
  (async function() {
		url = await ngrok.connect(process.env.PORT);
    var stat = await zipsrs();
    console.log(stat)
		console.log(`url ${url}`);
    // zipss();
    console.log(process.cwd());
		callback(url);
	})()
}

});

}


	
