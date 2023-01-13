const router = require('express').Router();
require('dotenv').config();
var axios = require('axios');
var aws4  = require('aws4')

var access_key_id
var secret_key
var session_token

// Date for orderhive query
var now = Date.now();
var then = Date.now() - 28800;

// router.get('/', async (req, res) => {

// })



router.post('/', async (req, res) => {
    access_key_id = req.body.access_key_id
    secret_key = req.body.secret_key
    session_token = req.body.session_token

    // get the various date formats needed to form our request
    var amzDate = getAmzDate(new Date().toISOString());

    // this function converts the generic JS ISO8601 date format to the specific format the AWS API wants
    function getAmzDate(dateStr) {
        var chars = [":","-"];
        for (var i=0;i<chars.length;i++) {
        while (dateStr.indexOf(chars[i]) != -1) {
            dateStr = dateStr.replace(chars[i],"");
        }
        }
        dateStr = dateStr.split(".")[0] + "Z";
        return dateStr;
    }

    var options = {
        service: 'execute-api',
        host: 'https://api.orderhive.com',
        method: 'POST',
        url: 'https://api.orderhive.com/product/listing/flat?page=1',
        path: "/product/listing/flat",
        headers: {
            'Content-Type': 'application/json',
        },
        //body: `{  \"types\": [    \"7\",    \"1\"  ],     \"date_ranges\": [    {      \"min\": \"${then}\",      \"max\": \"${now}\"    }  ]  }`
        // data: {
        //     "types": [
        //         "7",
        //         "1"
        //     ],
        //     "date_ranges": [
        //         {
        //             "min": then,
        //             "max": now
        //         }
        //     ]
        // }
    }
    
    var signedString = aws4.sign( options, {
        secretAccessKey: secret_key,
        accessKeyId: access_key_id,
        sessionToken: session_token,
    }).headers.Authorization

    

    const data = {'success': true};
    //Configure our call to get new products from Orderhive
    var getProductConfig = {
    // port: 443,
    host: 'https://api.orderhive.com',
    method: 'POST',
    url: 'https://api.orderhive.com/product/listing/flat?page=1',
    // body: JSON.stringify(data),
    // data,
    path: "/product/listing/flat",
    headers: {
        'id_token': `${access_key_id}`,
        'X-Amz-Security-Token': `${session_token}`,
        'secretAccessKey': `${secret_key}`,
        'X-Amz-Date': `${amzDate}`,
        'Authorization': `${signedString}`,
        'X-Amz-Date': amzDate,
        'Content-Type': 'application/json'
    },
    data: {
        "types": [
            "7",
            "1"
        ],
        "date_ranges": [
            {
                "min": then,
                "max": now
            }
        ]
    }
//         function (error, response, body) {
//             console.log('Status:', response.statusCode);
//             console.log('Headers:', JSON.stringify(response.headers));
//             console.log('Response:', body);
// }
}


    axios(getProductConfig)
    .then(function (response) {
        console.log(JSON.stringify(response.body));
    })
    .catch(function (error) {
        console.log(error);
    });

})

module.exports = router;
