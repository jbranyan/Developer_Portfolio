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
app.use('/static',express.static('public'));

/*
* Setup Routes
*/

//render the home route
app.get('/', (req, res, next) => {
    console.log( projects );
    //Render the Home Page
    res.render('index', { projects });

});

//render the about route
app.get('/about', (req, res, next) => {
    console.log( projects );

    //Render the about Page
    res.render('about');
});

//render dynamic project routes to match to project or projects
app.get('/projects/:id', (req, res, next) => {
    const projectId = req.params.id;
    console.log( projectId );
    const project = projects.find( ({ id }) => id === +projectId );
    //Render the Project Page
    res.render('project', { project });
});

//404 Error handling
app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = `Recevied Error ${err.status}: Page not found. Contact Site Administrator at help@fakeemail.com`;
    next(err);
});

//Global error handling
function errorHandler (err, req, res, next) {
    res.status(500)
    res.render('error', { error: err })
  }

//start the server and log an error message the app is 
//listening to port 3000
app.listen(3000, () => {
    //console.log(projectId);
    console.log('The app is running on localhost: 3000');
});