const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n');
    next();
});

// app.use((req,res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
});
app.get('/',(req, res) => {
    // res.send('<h1>Hello express</h1> ');
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        age: 28,
        motobike: 'Airblade',
        welcomeMessage: 'Welcome to my website'
    });
});

app.get('/about',(req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
})

// Bad - send back json with error Message
app.get('/bad',(req, res) => {
    req.send({
        errorMessage: 'Unable to handle request',
    });
});

app.listen(port, () => {
    console.log('Server is up and running at port ',port);
});