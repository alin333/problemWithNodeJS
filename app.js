var router = require(`./router.js`);
//Problem: we need a simple way to look at a user's badge count and JavaScript point from a web browser
//Solution: Use Node.js to perform the profile look ups and server our template via HTTP

//Create a web server
const http = require(`http`);
http.createServer( (req, res) => {
	router.home(req, res);
	router.user(req, res);
}).listen(8080);
console.log(`Server running at localhost:8080`);
