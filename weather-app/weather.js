const request = require('postman-request');

const key = '61540b65ecc54a23d5e11fff6f8a062c';
let longitude = '27.951695';
let latitude = '-26.064146';
let units = 'm';
let url = '';

const buildUrl = () => {
    return `http://api.weatherstack.com/current?access_key=${key}&query=${latitude},${longitude}&units=${units}`;
}

const getUrl = (_longitude, _latitude, _units = 'm') => {
    longitude = _longitude;
    latitude = _latitude;
    units = _units;
    url = buildUrl();

    return url;
}

const getTemperature = (longitude, latitude, callback) => {
    request({ url: getUrl(longitude, latitude), json: true }, (error, { body } = {}) => {
        if (error) {
            return callback('Cannot connect to the weather service');
        }

        if (body.error) {
            return callback('Failed to retrieve temperature from location');
        }

        const { temperature, feelslike, weather_descriptions: descriptions } = body.current;

        return callback(null, { temperature, feelslike, descriptions });
    })
}

module.exports = {
    getUrl: getUrl,
    getTemperature: getTemperature
};