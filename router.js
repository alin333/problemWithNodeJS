var Profile = require(`./profile.js`);
var renderer = require(`./renderer.js`);
var commonHeaders = {'Content-Type' : `text/html`};
var queryString = require(`querystring`);
//Handle HTTP route GET / and POST/ i.e Home
function home(req, res){
  //if url == '/' && GET
  if(req.url === `/`){
    //show search
    if(req.method.toLowerCase() === `get`){
      res.writeHead(200, commonHeaders);
  	  renderer.view(`header`, {}, res);
  	  renderer.view(`search`, {}, res);
  	  renderer.view(`footer`, {}, res);
      res.end();
    }else {
  //get the post data from body
  req.on(`data`, function(postBody){
    var query = queryString.parse(postBody.toString());
    res.writeHead(303,  {'location' : '/' + query.username});
    res.end();
  });
    //extract the username
      //redirect to /:username


    }
   }
  }
  //Hande HTTP route GET /:username i.e /chalkers
  function user(req, res){
  	  //if url == '/...'
  	var username = req.url.replace(`/`, ``);
  	if (username.length > 0) {
      res.writeHead(200, commonHeaders);
  	  renderer.view(`header`, {}, res);
      //get JSON from treehouse
      var studentProfile = new Profile(username);
      //on end
      studentProfile.on(`end`, function(profileJSON){
        //show profile

        //Store the values which we need
        var values = {
            avatarURL: profileJSON.gravatar_url,
            username: profileJSON.profile_name,
            badges: profileJSON.badges.length,
            javaScriptPoints: profileJSON.points.JavaScript
        }
        //simple response
      renderer.view(`profile`, values, res);
      renderer.view(`footer`, {}, res);
      res.end();
      });
      // on 'error'
      studentProfile.on(`error`, function(error){
        //show error
      renderer.view(`error`, {errorMessage: error.message}, res);
      renderer.view(`search`, {}, res);
      console.log(error);
      renderer.view(`footer`, {}, res);
      res.end();
      });
  	}

  }
module.exports.home = home;
module.exports.user = user;