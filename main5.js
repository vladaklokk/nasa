document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'Vh4HEiXcG4aTzsyNLw5Br5HtV9bvP8zQTCzedakv';
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=15`;
    fetchNasaApodImages(apiUrl, 'imageGallery');
});

function fetchNasaApodImages(apiUrl, containerId) {
    const galleryContainer = document.getElementById(containerId);
    const modalContainer = document.getElementById('modalContainer');
    const modalImage = document.getElementById('modalImage');

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(apod => {
                const imageUrl = apod.url;
                const imageElement = document.createElement('img');
                imageElement.src = imageUrl;
                imageElement.alt = 'NASA APOD Image';
                imageElement.onclick = () => openModal(imageUrl);
                galleryContainer.appendChild(imageElement);
            });
        })
        .catch(error => {
            console.error('Error fetching NASA APOD images:', error);

            galleryContainer.innerHTML = '<p>Error: Failed to fetch images. Please try again later.</p>';
        });

    function openModal(imageUrl) {
        modalImage.src = imageUrl;
        modalContainer.style.display = 'block';
    }

    window.closeModal = function () {
        modalContainer.style.display = 'none';
    };
    window.onclick = function (event) {
        if (event.target === modalContainer) {
            closeModal();
        }
    };
}
