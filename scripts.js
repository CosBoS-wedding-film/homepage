function navigateToHomePage() {
    showSection('videos');
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.style.display = 'block';
            // Add a delay to trigger the transition
            requestAnimationFrame(() => {
                section.classList.add('show');
            });
        } else {
            section.classList.remove('show');
            // Hide the section after the transition ends
            section.addEventListener('transitionend', function hideSection() {
                if (!section.classList.contains('show')) {
                    section.style.display = 'none';
                }
                section.removeEventListener('transitionend', hideSection);
            });
        }
    });
}
