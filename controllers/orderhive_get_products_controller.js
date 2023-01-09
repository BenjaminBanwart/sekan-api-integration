const router = require('express').Router();
require('dotenv').config();
var axios = require('axios');
var aws4  = require('aws4')


router.get('/', async (req, res) => {

    //Configure our call to get new products from Orderhive
    // var getProductConfig = {
    // method: 'post',
    // url: 'https://api.orderhive.com/product/listing/flat?page=1&size=10',
    // headers: {
    //     'id_token': `${access_key_id}`,
    //     'X-Amz-Security-Token': `${session_token}`,
    //     'X-Amz-Date': `${amzDate}`,
    //     'Authorization': 
    // }
    // };
})



router.post('/', async (req, res) => {
    console.log(req.body)
})

module.exports = router;