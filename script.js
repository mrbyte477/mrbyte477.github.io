async function fetchRandomVerse() {
    try {
        // First fetch the verses from json file
        const versesResponse = await fetch('./verses.json');
        const versesData = await versesResponse.json();
        const verses = versesData.verses;
        
        // Get random verse from the array
        const randomVerse = verses[Math.floor(Math.random() * verses.length)];
        const response = await fetch(`https://bible-api.com/${randomVerse}`);
        const data = await response.json();
        const verse = data.text;
        const reference = data.reference;
        document.querySelector('.bible-verse').innerHTML = `"${verse}" - ${reference}`;
    } catch (error) {
        console.error('Error fetching verse:', error);
        // Fallback to default verse if API fails
        document.querySelector('.bible-verse').innerHTML = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Call fetchRandomVerse
    fetchRandomVerse();

    const logoSlide = document.getElementById('logos-slide');
    const numberOfImages = 9; // Total number of unique images
    const totalSlots = 18;    // How many images to show in the slider (including duplicates)
    
    // Create an array of numbers from 1 to numberOfImages
    const availableImages = Array.from({length: numberOfImages}, (_, i) => i + 1);
    
    // Function to shuffle array
    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    
    // Fill the slider with random images
    for (let i = 0; i < totalSlots; i++) {
        const img = document.createElement('img');
        // If we've used all images, reshuffle the array
        if (i % numberOfImages === 0) {
            shuffleArray(availableImages);
        }
        const imageNumber = availableImages[i % numberOfImages];
        img.src = `./images/${imageNumber}.jpg`;
        logoSlide.appendChild(img);
    }
}); 