require('dotenv').config();
var axios = require('axios');
var aws4  = require('aws4')

// Configure our authentication axios call
var data = JSON.stringify({
    "id_token": `${process.env.ID}`,
    "refresh_token": `${process.env.REF}`
});
var authConfig = {
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
var region;
// Date at the time function is called
var dateNow = Date.now();
// Date 8 hour before function is called
var beginningDate = Date.now() - 28800;

// Date formatted for Amazon in our Orderhive header
var dt = new Date();
var amzDate = dt.toISOString();

// Call to get auth keys which will go in headers for future api calls
let callPromise = new Promise(function () {
    axios(authConfig)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        access_key_id = response.data.access_key_id;
        secret_key = response.data.secret_key;
        session_token = response.data.session_token;
        region = response.data.region;

    })
    .catch(function (error) {
        console.log(error);
    });
})

// Configure our call to get new products from Orderhive
//var getProductConfig = {
//    method: 'post',
//    url: 'https://api.orderhive.com/product/listing/flat?page=1&size=10',
//    headers: {
//        'id_token': `${access_key_id}`,
//        'X-Amz-Security-Token': `${session_token}`,
//        'X-Amz-Date': `${amzDate}`,
        //'Authorization': 
//    }
//};


console.log(aws4.sign({
    secretAccessKey: secret_key,
    accessKeyId: access_key_id,
    sessionToken: session_token
}))