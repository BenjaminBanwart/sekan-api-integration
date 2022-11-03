require('dotenv').config();
var axios = require('axios');

// Configure our authentication axios call
var data = JSON.stringify({
    "id_token": `${process.env.ID}`,
    "refresh_token": `${process.env.REF}`
});
var config = {
    method: 'post',
    url: 'https://api.orderhive.com/setup/refreshtokenviaidtoken',
    headers: { 
    'Content-Type': 'application/json'
    },
    data : data
};

// Amazon signatures for authentication
var access_key_id;
var secret_key;
var session_token;
// Date at the time function is called
var dateNow = Date.now();
// Date either 12 hour before or 8:00 in the morning of current day
var beginningDate

// Call to get auth keys which will go in headers for future api calls
axios(config)
.then(function (response) {
    console.log(JSON.stringify(response.data));
    access_key_id = response.data.access_key_id;
    secret_key = response.data.secret_key;
    session_token = response.data.session_token;
})
.catch(function (error) {
    console.log(error);
});
