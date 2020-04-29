const mapbox = require('./mapbox');
const weather = require('./weather');
require('./proxy');

mapbox.getGeolocation('18 Maple Drive, Candice Glades, Northriding, Gauteng', (error, geoLocation) => {
    if (error) {
        return console.error('Could not get the geoLocation for the query.', error);
    }
    weather.getTemperature(geoLocation.longitude, geoLocation.latitude, (error, current) => {
        if (error) {
            return console.error('Could not get the temperature for the geolocation.', error);
        }
        console.log(`${current.descriptions.join(', ')} - It is currently ${current.temperature}°C, it feels like ${current.feelslike}°C.`);
    })
});
