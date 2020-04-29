const request = require('postman-request');

const key = 'pk.eyJ1IjoiamFzcGVsaW5nIiwiYSI6ImNrOWsybXlxMDAzbnIzZ2w0Y2x0MnhhaTUifQ.lpzKE0Mum7TRIxaqYui2ww';
let version = 'v5';
let endpoint = 'mapbox.places';
let query = '';
let limit = 1;
const LONGITUDE_INDEX = 0;
const LATITUDE_INDEX = 1;


const buildUrl = () => {
    return `https://api.mapbox.com/geocoding/${version}/${endpoint}/${query}.json?access_token=${key}&limit=${limit}`;
}

const getUrl = (_query, _limit = 1) => {
    query = encodeURIComponent(_query);
    limit = _limit;
    url = buildUrl();

    return url;
}

const getGeolocation = (address, callback) => {
    const _url = getUrl(address);
    request({ url: _url, json: true }, (error, response) => {
        if (error) {
            return callback(error);
        }

        if (response.body.error) {
            return callback(response.body.error);
        }

        if (!response.body.features || response.body.features.length === 0) {
            return callback('Unable to find location, retry with another search term');
        }

        const data = response.body.features[0];
        const geolocation = { longitude: data.center[LONGITUDE_INDEX], latitude: data.center[LATITUDE_INDEX] };

        console.log(`Using location '${data.place_name}'`);
        console.log(`Geolocation: ${geolocation.longitude}, ${geolocation.latitude}`);

        return callback(null, geolocation);
    });
}

module.exports = {
    getUrl: getUrl,
    getGeolocation: getGeolocation,
    LONGITUDE_INDEX: LONGITUDE_INDEX,
    LATITUDE_INDEX: LATITUDE_INDEX,
}