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
    //Render the Home Page
    res.render('index', { projects });

});

//render the about route
app.get('/about', (req, res, next) => {
    console.log( projects );
    err.status = 500;
    //Render the about Page
    res.render('about');
});

//render dynamic project routes to match to project or projects
app.get('/projects/:id', (req, res, next) => {
    //identify the project information based off the project id 
    let projectId = req.params.id;
    let project = projects.find( ({ id }) => id === projectId );
    //Render the Project Page
    res.render('project', { project });
});

//404 Error handling
app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = `Page not found.`;
    res.render('page-not-found', { error: err });
    next(err);
});

//Global error handling
app.use((err, req, res, next) => {
    err.message = `An unexpected error has occured.`;
    res.status(500);
    res.render('error', { error: err });
  });

//start the server and log an error message the app is
//listening to port 3000
app.listen(3000, () => {
    console.log('The app is running on localhost: 3000');
});