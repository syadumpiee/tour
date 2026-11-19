
// SARRAVELLE - WEBSITE INTERACTIONS

document.addEventListener("DOMContentLoaded", function () {

    // Mobile navigation menu
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");

            const isOpen = navLinks.classList.contains("active");

            menuToggle.textContent = isOpen ? "✕" : "☰";
            menuToggle.setAttribute("aria-expanded", isOpen);
        });

        // Close menu after clicking a navigation link
        const links = navLinks.querySelectorAll("a");

        links.forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // Set minimum date to today
    const dateInput = document.getElementById("date");

    if (dateInput) {
        const today = new Date();
        const localDate = new Date(
            today.getTime() - today.getTimezoneOffset() * 60000
        ).toISOString().split("T")[0];

        dateInput.min = localDate;
    }

    // Reveal sections when scrolling
    const sections = document.querySelectorAll(
        ".section-heading, .intro-grid, .experience-card, .destination-card, .culture-content, .food-card"
    );

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    sections.forEach(function (section) {
        section.classList.add("reveal");
        observer.observe(section);
    });

});