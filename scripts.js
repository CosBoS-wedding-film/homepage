function showSection(sectionId) {
    // Get all sections
    const sections = document.querySelectorAll('.content-section');

    // Hide all sections
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
    }
}

// Tab functionality for the portfolio section
function openTab(event, tabName) {
    var i, tabcontent, tablinks;

    // Hide all tab content
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove active class from all tabs
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the selected tab and add the active class
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}

// Ensure the "Videos" section is shown by default on page load
document.addEventListener("DOMContentLoaded", function() {
    showSection('videos');
});
