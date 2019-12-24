const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');


app.use(function(req, res, next){
    var now = new Date().toString();
    var log = `${now}: ${req.method}  ${req.url}`;
    console.log(log);
    fs.appendFile('F:/node-web-server/server.log', log + '\n', function(error){
        if(error){
            console.log('Unable to append');
        }
    });
    next();
});

// app.use(function(req, res, next){
//     res.render('maintainence.hbs');
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper('getCurrentYear', function(){
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', function(text){
  return text.toUpperCase();
});

app.get('/', function(req, res){
   // res.send('<h1>Hello Express!</h1>');
   res.send({
       name: 'gagneet',
       projects: ['nodejs', 'angularjs'],
       company: 'Compro'
   })
  // res.contentType('application/json');
});

app.get('/about', function(req, res){
   // res.send('About Page');
   res.render('about.hbs', {
       pageTitle: 'About Page'
   });
});

app.get('/home', function(req, res){
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeText: 'Hello all to the home Page'
    });
 });

app.get('/bad', function(req, res){
    res.send({
   'errorMessage': 'This is a bad request'
    })
});

app.listen(3000, function(){
    console.log("Server is up on Port 3000");
});