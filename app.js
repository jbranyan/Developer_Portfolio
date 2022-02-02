//Import and setup the Express
const express = require('express');
const app = express();

//Require the data.json file
const { projects } = require('./data.json');

/*
* Setup Middleware
*/

//set view engine to pug
app.set('view engine', 'pug');

//serve items located in the public folder
app.use(express.static('public'));

/*
* Setup Routes
*/

//render the home route
app.get('/', (req, res, next) => {
    console.log( projects );
    //Render the Home Page
    res.render('index', { projects });

});

//start the server and log an error message the app is 
//listening to port 3000
app.listen(3000, () => {
    console.log('The app is running on localhost: 3000');
});