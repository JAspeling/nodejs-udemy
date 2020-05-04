const mapbox = require('./../utils/mapbox');
const weather = require('./../utils/weather');
let address;

const route = (app) => {
    app.get('/weather', (req, res) => {
        address = req.query.address;

        if (!address) {
            return res.send({
                error: 'Address not provided!'
            });
        }

        mapbox.getGeolocation(address, (error, { longitude, latitude, placeName } = {}) => {
            if (error) {
                return res.send({ error });
            }

            weather.getTemperature(longitude, latitude, (error, { temperature, feelslike, descriptions } = {}) => {
                if (error) {
                    return res.send({ error });
                }
                res.send({
                    address,
                    location: placeName,
                    longitude,
                    latitude,
                    temperature,
                    feelslike,
                    descriptions
                });
            })
        });

    });
};

module.exports = { route, address };