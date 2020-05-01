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
    request({ url: _url, json: true }, (error, { body }) => {
        if (error) {
            return callback(error);
        }

        if (body.error) {
            return callback(body.error);
        }

        if (!body.features || body.features.length === 0) {
            return callback('Unable to find location, retry with another search term');
        }

        const { center, place_name: placeName } = body.features[0];
        const geolocation = { longitude, latitude } = { longitude: center[LONGITUDE_INDEX], latitude: center[LATITUDE_INDEX] };

        console.log(`Using location '${placeName}'`);
        console.log(`Geolocation: ${longitude}, ${latitude}`);

        return callback(null, geolocation);
    });
}

module.exports = {
    getUrl: getUrl,
    getGeolocation: getGeolocation,
    LONGITUDE_INDEX: LONGITUDE_INDEX,
    LATITUDE_INDEX: LATITUDE_INDEX,
}