function navigateToHomePage() {
    showSection('videos');
}

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
}
