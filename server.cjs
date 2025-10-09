const express = require('express');
const hbs = require('hbs'); //access to handlebars view engine
const fs = require('fs');

const PORT = process.env.PORT || 3000;

// App created
let app = express();

// Middleware:
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method}: ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', `${log}\n`, (err) => {
        if (err){
            console.log(`Error: ${err}\nUnable to append server log file`);
        }
    });
    next();
});
app.use((req, res, next) => {
    res.render('maintenance.hbs');
});
app.use(express.static(__dirname + '/public')); //needed to serve static pages

// App settings:
app.set('view engine', 'hbs');  //to set handlebars as express view engine

// Handlebars view engine:
hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerHelper('getCurrentYear', () => `${new Date().getFullYear()}`);
hbs.registerHelper('screamIt', (p) => p.toUpperCase());

// Routes:
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page of Dawood Vora',
        welcomeMessage: 'Welcome All to my new website'
/*     res.send('<h1>Hello Express!</h1>');
    res.send(JSON.stringify(req, null, 2));
    res.send({
        name: 'Andrew',
        likes:[
            'Biking',
            'Hiking',
            'Swimming'
        ]
    }); */
    });
});

app.get('/about',(req, res) => {
    // res.send('This is the about page.  It is under construction');
    res.render('about.hbs', {
        pageTitle: 'This Page is about Dawood Vora'
    });
});

app.get('/bad', (req,res) => {
    // res.send({
    //     errorMessage: 'Unable to handle request'
    // });
    res.render('bad.hbs');
});

// Server listening started
app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));

