console.log('loaded!');

const errorElement = document.querySelector('#weather_error>p');
const messageContainer = document.querySelector('#weather');

const locationElement = document.querySelector('#location');
const geolocationElement = document.querySelector('#geolocation');
const temperatureElement = document.querySelector('#temperature');
const descriptionsElement = document.querySelector('#descriptions');
const loaderElement = document.querySelector('#loader');

// const request = require('postman-request');

// require('/src/utils/proxy');

const getWeatherData = (address) => {
    return new Promise((resolve, reject) => fetch(`http://localhost:3000/weather?address=${encodeURIComponent(address)}`)
        .then((res) => res.json()
            .then((data) => {
                if (data.error) {
                    return reject(data.error);
                }
                resolve(data);
            })
        )
    );
}

const form = document.getElementById('weatherForm');

const toggleElement = (element, shouldShow) => {
    if (shouldShow) {
        element.style.display = 'inherit';
    } else {
        element.style.display = 'none'
    }
}

const toggleAll = (shouldShow, elements) => {
elements.forEach(el => el.style.display = shouldShow ? 'inherit' : 'none');
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    toggleAll(false, [messageContainer, errorElement]);
    toggleAll(true, [loaderElement]);

    const address = document.getElementById('address').value;
    const data = await getWeatherData(address).catch(error => {
        toggleElement(messageContainer, false);
        toggleElement(errorElement, true);
        console.error(error);
        errorElement.textContent = error;
        return;
    });

    toggleElement(loaderElement, false);

    if (data) {
        toggleElement(messageContainer, true);
        toggleElement(errorElement, false);

        const { temperature, longitude, latitude, location, feelslike, descriptions } = data;

        locationElement.textContent = location;
        geolocationElement.textContent = `[ ${longitude} ; ${latitude} ]`;
        temperatureElement.textContent = `${temperature}°, feels like ${feelslike}°`;
        descriptionsElement.textContent = `${descriptions.join(', ')}` || 'N/A';

        messageElement = data
        console.log(data);
    }
})
