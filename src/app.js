const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const port = process.env.PORT || 3000;

const app = express();

//Defice Path for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
hbs.registerPartials(partialsPath);

//Static files provider for express
app.use(express.static(publicDirectoryPath));


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Whether App',
        name: 'Swapnil Jain'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Swapnil Jain'
    });
});

app.get('/whether', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'No Address Provided'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            });
        }

        forecast(latitude, longitude, (error, foreCastData) => {
            if (error) {
                return res.send({
                    error: error
                });
            }

            res.send({
                'location': location,
                'forecast': foreCastData,
                address: req.query.address
            });
        });
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Whether App for forecast',
        title: 'Help',
        name: 'Swapnil Jain'
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        ErrorMessage: 'Help Details Page not found',
        name: "Swapnil Jain"
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        ErrorMessage: 'Page Not Found',
        name: "Swapnil Jain"
    });
});


app.listen(port, () => {
    console.log('server is up on ' + port);
})