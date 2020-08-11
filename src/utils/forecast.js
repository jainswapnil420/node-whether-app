const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=0d42762de17404b987e9879f68062a56&query=${latitude},${longitude}`;

    request({ url: url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather stack', undefined);
        } else if (body.error) {
            callback('Invalid co-ordinates..Please provide correct co-ordinates', undefined);
        } else {
            callback(undefined, `The current Temperature is ${body.current.temperature} and chances of rain are ${body.current.precip}% and wind speed is ${body.current.wind_speed}`);
        }
    });
};

module.exports = forecast;