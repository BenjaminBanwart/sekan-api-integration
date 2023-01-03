const express = require('express');
const methodOverride = require('method-override');
const cors = require('cors');
const app = express();


//Configurations
require('dotenv').config();
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


//Main page of API
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the main page of the Sekan API'
    });
});

//Controller to hit order hive's refresh token api for authentication
const orderhive_refresh_controller = require('./controllers/orderhive_refresh_controller');
app.use('/orderhive_refresh', orderhive_refresh_controller);

//Controller to use aws signer for authentication
const orderhive_aws_controller = require('./controllers/orderhive_aws_controller');
app.use('/orderhive_aws', orderhive_aws_controller);

//Define server port
app.listen(process.env.PORT, () => {
    console.log(`Live on port: ${process.env.PORT}`);
});