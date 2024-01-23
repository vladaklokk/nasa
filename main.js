function toggleContent() {
  const customExpandedContent = document.getElementById('customExpandedContent');
  const readMoreBtn = document.getElementById('readMoreBtn');
  const closeBtn = document.getElementById('closeBtn');

  if (customExpandedContent.style.display === 'none') {
      customExpandedContent.style.display = 'block';
      readMoreBtn.style.display = 'none';
      closeBtn.style.display = 'block';
  } else {
      customExpandedContent.style.display = 'none';
      readMoreBtn.style.display = 'block';
      closeBtn.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const apodContent = document.getElementById('apodContent');
  
  fetch(`https://api.nasa.gov/planetary/apod?api_key=Vh4HEiXcG4aTzsyNLw5Br5HtV9bvP8zQTCzedakv`)
      .then(response => response.json())
      .then(data => {
          apodContent.innerHTML = `
              <img src="${data.url}" alt="${data.title}" />
              <p>${data.explanation}</p>
          `;
      })
      .catch(error => console.error('Error fetching APOD:', error));
});

document.addEventListener('DOMContentLoaded', function () {
  const learnMoreBtn = document.getElementById('learnMoreBtn');
  const unleashCuriositySection = document.getElementById('customHeroSection');

  learnMoreBtn.addEventListener('click', function () {
      unleashCuriositySection.scrollIntoView({ behavior: 'smooth' });
  });
});

