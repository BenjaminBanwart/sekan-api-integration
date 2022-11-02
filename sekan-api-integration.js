require('dotenv').config();
var axios = require('axios');
var data = JSON.stringify({
    "id_token": `${process.env.ID}`,
    "refresh_token": `${process.env.REF}`
});
console.log(process.env.ID)
var config = {
    method: 'post',
    url: 'https://api.orderhive.com/setup/refreshtokenviaidtoken',
    headers: { 
    'Content-Type': 'application/json'
    },
    data : data
};

axios(config)
.then(function (response) {
    console.log(JSON.stringify(response.data));
})
.catch(function (error) {
    console.log(error);
});
