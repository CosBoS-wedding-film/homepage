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







// Tab functionality for the portfolio section
function openTab(event, tabName) {
    // Get all tab content and hide them
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
        tabContents[i].classList.remove("show");
    }

    // Remove active class from all tabs
    const tabLinks = document.getElementsByClassName("tab-link");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }

    // Show the selected tab content and add the active class to the clicked tab
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("show");
    event.currentTarget.classList.add("active");
}

// Ensure the default tab is displayed on page load
document.addEventListener("DOMContentLoaded", function() {
    const defaultTab = document.querySelector('.tab-link.active');
    if (defaultTab) {
        defaultTab.click();
    }
});
