function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.style.display = 'block'; // Ensure the section is displayed
            requestAnimationFrame(() => {
                section.classList.add('show'); // Add 'show' to make the section visible
            });
        } else {
            section.classList.remove('show'); // Hide other sections
            // Use transitionend event to set display none after transition completes
            section.addEventListener('transitionend', function hideSection() {
                if (!section.classList.contains('show')) {
                    section.style.display = 'none';
                }
                section.removeEventListener('transitionend', hideSection);
            });
        }
    });
}

function navigateToHomePage() {
    showSection('videos'); // Directly navigates to the 'videos' section
}
