document.addEventListener("DOMContentLoaded", function () {

    // 1. DARK MODE FUNCTIONALITY

    const themeToggle = document.getElementById("themeToggle");

    // Restore the saved theme, if one exists
    const savedTheme = localStorage.getItem("blogTheme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    // Display the correct button text
    function updateThemeButton() {
        if (document.body.classList.contains("dark-mode")) {
            themeToggle.textContent = "☀️ Light Mode";
        } else {
            themeToggle.textContent = "🌙 Dark Mode";
        }
    }

    updateThemeButton();

    // Switch between light mode and dark mode
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("blogTheme", "dark");
        } else {
            localStorage.setItem("blogTheme", "light");
        }

        updateThemeButton();
    });


    // 2. READ MORE FUNCTIONALITY

    const readMoreButtons = document.querySelectorAll(".read-more");

    readMoreButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            // Find the additional content for this button
            const card = button.closest(".blog-card");
            const extraContent = card.querySelector(".extra-content");

            // Check whether the extra content is hidden
            const isHidden = extraContent.hidden;

            if (isHidden) {
                extraContent.hidden = false;
                button.textContent = "Read Less";
                button.setAttribute("aria-expanded", "true");
            } else {
                extraContent.hidden = true;
                button.textContent = "Read More";
                button.setAttribute("aria-expanded", "false");
            }

        });

    });


    // 3. AUTOMATICALLY UPDATE THE FOOTER YEAR

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

});