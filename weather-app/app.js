const mapbox = require('./mapbox');
const weather = require('./weather');
const yargs = require('yargs');

require('./proxy');
const { argv } = process;

const getTemperature = (address) =>
    mapbox.getGeolocation(address, (error, { longitude, latitude } = {}) => {
        if (error) {
            return console.error('Could not get the geoLocation for the query.', error);
        }
        weather.getTemperature(longitude, latitude, (error, { descriptions, temperature, feelslike } = {}) => {
            if (error) {
                return console.error('Could not get the temperature for the geolocation.', error);
            }
            console.log(`${descriptions.join(', ')} - It is currently ${temperature}°C, it feels like ${feelslike}°C.`);
        })
    });


if (argv.length > 3) {
    return console.warn('Too many commands. Please wrap the location in quotes if it contains spaces.');
}

location = argv[2];
if (location) {
    getTemperature(location);
} else {
    console.log('No location specified as a command argument.');
}
