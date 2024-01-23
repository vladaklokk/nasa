document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'Vh4HEiXcG4aTzsyNLw5Br5HtV9bvP8zQTCzedakv';

    const cmeApiUrl = 'https://api.nasa.gov/DONKI/CME?startDate=2017-01-03&endDate=2017-01-03&api_key=' + apiKey;
    const cmeAnalysisApiUrl = 'https://api.nasa.gov/DONKI/CMEAnalysis?startDate=2016-09-01&endDate=2016-09-30&mostAccurateOnly=true&speed=500&halfAngle=30&catalog=ALL&api_key=' + apiKey;
    const gstApiUrl = 'https://api.nasa.gov/DONKI/GST?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=' + apiKey; 
    const flrApiUrl = 'https://api.nasa.gov/DONKI/FLR?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=' + apiKey; 

    fetchSpaceWeatherData(cmeApiUrl, 'cmeContent');

    fetchSpaceWeatherData(cmeAnalysisApiUrl, 'cmeAnalysisContent');

    fetchSpaceWeatherData(gstApiUrl, 'gstContent');

    fetchSpaceWeatherData(flrApiUrl, 'flrContent');
});

function fetchSpaceWeatherData(apiUrl, containerId) {
    const weatherContainer = document.getElementById(containerId);

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const formattedData = formatSpaceWeatherData(data);
            weatherContainer.innerHTML += formattedData;
        })
        .catch(error => {
            console.error(`Error fetching space weather data for ${containerId}:`, error);

            weatherContainer.innerHTML += `<p>Error: ${error.message}</p>`;
        });
}

function formatSpaceWeatherData(data) {
    let formattedHtml = '';

    if (Array.isArray(data) && data.length > 0) {
        formattedHtml += '<ul>';

        data.forEach(item => {
            formattedHtml += '<li>';

            if (typeof item === 'object') {
                formattedHtml += '<ul>';
                Object.keys(item).forEach(key => {
                    formattedHtml += `<li><strong>${key}:</strong> ${item[key]}</li>`;
                });
                formattedHtml += '</ul>';
            } else {
                formattedHtml += item;
            }

            formattedHtml += '</li>';
        });

        formattedHtml += '</ul>';
    } else {
        formattedHtml += '<p>No data currently available</p>';
    }

    return formattedHtml;
}
