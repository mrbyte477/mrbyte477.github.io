
document.addEventListener('DOMContentLoaded', () => {
    // Disable right-click
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // Disable keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Prevent Ctrl+S, Ctrl+U, Ctrl+Shift+I, F12
        if (
            (e.ctrlKey && (e.key === 's' || e.key === 'u')) ||
            (e.ctrlKey && e.shiftKey && e.key === 'i') ||
            e.key === 'F12'
        ) {
            e.preventDefault();
            return false;
        }
    });

    const logoSlide = document.getElementById('logos-slide');
    const logoSlideReverse = document.getElementById('logos-slide-reverse');
    const numberOfImages = 9;
    
    // Create optimized image array with cloning
    const createImageSet = (container) => {
        const fragment = document.createDocumentFragment();
        const availableImages = Array.from({length: numberOfImages}, (_, i) => i + 1);
        
        // Shuffle using Fisher-Yates algorithm
        for (let i = availableImages.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableImages[i], availableImages[j]] = [availableImages[j], availableImages[i]];
        }

        availableImages.forEach(num => {
            const img = new Image();
            img.src = `./images/${num}.jpg`;
            img.loading = 'lazy';
            // Add security attributes to images
            img.setAttribute('draggable', 'false');
            img.setAttribute('oncontextmenu', 'return false');
            img.setAttribute('onselectstart', 'return false');
            img.setAttribute('onmousedown', 'return false');
            fragment.appendChild(img);
        });

        // Clone fragment for seamless loop
        const clone = fragment.cloneNode(true);
        container.appendChild(fragment);
        container.appendChild(clone);
    };

    // Create both image sets
    createImageSet(logoSlide);
    createImageSet(logoSlideReverse);
    
    // Start animation
    logoSlide.style.animation = 'slide 40s linear infinite';
    logoSlideReverse.style.animation = 'slide-reverse 40s linear infinite';
    
    // Reset animation position for seamless loop
    logoSlide.addEventListener('animationiteration', () => {
        logoSlide.style.animation = 'none';
        void logoSlide.offsetWidth; // Trigger reflow
        logoSlide.style.animation = 'slide 40s linear infinite';
    });

    logoSlideReverse.addEventListener('animationiteration', () => {
        logoSlideReverse.style.animation = 'none';
        void logoSlideReverse.offsetWidth; // Trigger reflow
        logoSlideReverse.style.animation = 'slide-reverse 40s linear infinite';
    });
});