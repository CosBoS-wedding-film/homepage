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



function openTab(event, tabName) {
    var i, tabcontent, tablinks;

    // Hide all tab content
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("show");
    }

    // Remove active class from all tabs
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Show the selected tab and add the active class
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("show");
    event.currentTarget.classList.add("active");
}


