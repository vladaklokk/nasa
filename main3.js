document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'Vh4HEiXcG4aTzsyNLw5Br5HtV9bvP8zQTCzedakv'; 
    const imagesApiUrl = 'https://api.nasa.gov/EPIC/api/natural/images?api_key=' + apiKey;

    fetchEpicImages(imagesApiUrl);
});

function fetchEpicImages(apiUrl) {
    const imagesContainer = document.getElementById('imagesContainer');

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

            data.forEach(image => {
                const imageUrl = `https://api.nasa.gov/EPIC/archive/natural/${image.date.slice(0, 10)}/png/${image.image}.png?api_key=DEMO_KEY`;
                const imageElement = document.createElement('img');
                imageElement.src = imageUrl;
                imageElement.alt = `EPIC Image - ${image.caption}`;
                imageElement.className = 'epicImage';
                imagesContainer.appendChild(imageElement);
            });
        })
        .catch(error => {
            console.error('Error fetching EPIC images:', error);

            imagesContainer.innerHTML = 'Error: Failed to fetch EPIC images';
        });
}
