// Function to show and hide sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.style.display = 'block';
            setTimeout(() => {
                section.classList.add('show');
            }, 0); // slight delay to trigger transition
        } else {
            section.classList.remove('show');
            setTimeout(() => {
                section.style.display = 'none';
            }, 100); // match the CSS transition duration
        }
    });

    // If navigating to the gallery (home section), trigger the animation
    if (sectionId === 'gallery') {
        animateGalleryItems();
    }
}

// Function to animate gallery items with staggered animation
function animateGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        // Reset the opacity and animation state
        item.style.opacity = 0;
        item.classList.remove('show');
        
        // Apply staggered animation
        setTimeout(() => {
            item.style.opacity = 1;
            item.classList.add('show');
        }, index * 100);  // Stagger the animation timing (100ms delay between each item)
    });
}

// Event listener for when the document is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Run the animation on initial load
    animateGalleryItems();
});

// Function to navigate back to the home page (gallery)
function navigateToHomePage() {
    showSection('gallery');
}

// Event listeners for gallery modal functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        modal.style.display = "block";
        modalImg.src = this.querySelector('img').src;
        captionText.textContent = this.dataset.venue;
    });
});

// Close modal
closeBtn.addEventListener('click', function() {
    modal.style.display = "none";
});







document.addEventListener("DOMContentLoaded", function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const videoUrl = this.getAttribute('data-video');
            window.open(videoUrl, '_blank');
        });
    });
});




