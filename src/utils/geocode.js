const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamFpbnN3YXBuaWw5MCIsImEiOiJja2Q3bGZtanYwbGJ4MndzY2d2dGVsN3BpIn0.ysNBL1XEt17zvfOScULwsA&limit=1`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to mapbox service', undefined);
        } else if (response.body.features.length === 0) {
            callback('Invalid location name..Please provide improve your filter criteria', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;