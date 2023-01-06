const router = require('express').Router();
require('dotenv').config();
var axios = require('axios');


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

//Hit this route to get id_token and refresh_token
router.get('/', async (req, res) => {
    // Call to get auth keys which will go in headers for future api calls
    let callPromise = new Promise(function () {
        axios(authConfig)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            access_key_id = response.data.access_key_id;
            secret_key = response.data.secret_key;
            session_token = response.data.session_token;
            region = response.data.region;
            res.send(JSON.stringify(response.data))
            res.send(JSON.stringify(response.status))
        })
        .catch(function (error) {
            var stat;
            if (error.response) {
                stat = error.response.status
            }
            if (stat === 429) {
                res.send(false)
                //console.log(error.response.status)
            }
        });
    })
})


module.exports = router;