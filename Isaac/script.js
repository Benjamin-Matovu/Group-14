
// ==================================
// 1. THEME SWITCHER
// ==================================

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", function () {

    // Switch the dark theme on or off
    document.body.classList.toggle("dark-theme");

    // Check which theme is active
    const isDark = document.body.classList.contains("dark-theme");

    // Update the button text
    if (isDark) {
        themeButton.textContent = "☀️ Light Theme";
    } else {
        themeButton.textContent = "🌙 Dark Theme";
    }

});


// ==================================
// 2. VIEW DETAILS BUTTONS
// ==================================

const detailButtons = document.querySelectorAll(".details-button");

detailButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Find the card containing the clicked button
        const card = button.closest(".blog-card");

        // Find its additional information
        const details = card.querySelector(".details");

        // Show or hide the information
        if (details.hidden) {

            details.hidden = false;
            button.textContent = "Hide Details";

        } else {

            details.hidden = true;
            button.textContent = "View Details";

        }

    });

});

