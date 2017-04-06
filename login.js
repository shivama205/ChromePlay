
document.addEventListener("DOMContentLoaded", function(event) {
  console.log("I am in San Francisco.");
  
  var client_id = "6fae9b4f16b845169465e91a48a5148a";
  var client_secret = "e4dac73b4e434adc9c767aec1daa24ba";

  // var authOptions = {
  //   url: 'https://accounts.spotify.com/api/token',
  //   headers: {
  //     'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  //   },
  //   form: {
  //     grant_type: 'client_credentials'
  //   },
  //   json: true
  // };

  // request.post(authOptions, function(error, response, body) {
  //   if (!error && response.statusCode === 200) {

  //     // use the access token to access the Spotify Web API
  //     var token = body.access_token;
  //     var options = {
  //       url: 'https://api.spotify.com/v1/users/jmperezperez',
  //       headers: {
  //         'Authorization': 'Bearer ' + token
  //       },
  //       json: true
  //     };
  //     request.get(options, function(error, response, body) {
  //       console.log(body);
  //     });
  //   }
  // });

});
