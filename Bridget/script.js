
const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeButton.textContent = "Switch to Light Mode";
    } else {
        themeButton.textContent = "Switch to Dark Mode";
    }
});

// Information about the three sessions
const sessions = {
    about: {
        title: "Session 1: About Me",
        description: "This session introduces the author of the blog.",
        number: 1
    },

    interests: {
        title: "Session 2: My Interests",
        description: "This session describes the author's interests and hobbies.",
        number: 2
    },

    goals: {
        title: "Session 3: My Goals",
        description: "This session explains the author's future plans and goals.",
        number: 3
    }
};

// Find all session information buttons
const infoButtons = document.querySelectorAll(".infoButton");
const sessionInfo = document.getElementById("sessionInfo");

infoButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const sessionKey = button.dataset.session;
        const session = sessions[sessionKey];

        sessionInfo.innerHTML = `
            <h2>${session.title}</h2>
            <p>${session.description}</p>
            <p>Session number: ${session.number}</p>
        `;
    });
});

function updateDateTime() {
    const now = new Date();

    const dateTimeElement = document.getElementById("dateTime");

    dateTimeElement.textContent = now.toLocaleString("en-UG", {
        dateStyle: "full",
        timeStyle: "medium"
    });
}

updateDateTime();

setInterval(updateDateTime, 1000);

const commentForm = document.getElementById("commentForm");
const visitorName = document.getElementById("visitorName");
const visitorComment = document.getElementById("visitorComment");
const commentList = document.getElementById("commentList");

commentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = visitorName.value.trim();
    const message = visitorComment.value.trim();

    if (name === "" || message === "") {
        return;
    }

    const comment = document.createElement("div");
    comment.className = "comment";

    const heading = document.createElement("h4");
    heading.textContent = name;

    const paragraph = document.createElement("p");
    paragraph.textContent = message;

    comment.appendChild(heading);
    comment.appendChild(paragraph);

    if (commentList.textContent.includes("No comments yet")) {
        commentList.replaceChildren();
    }

    commentList.appendChild(comment);

    commentForm.reset();
});

const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
});

backToTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

let visits = 0;

const countButton = document.getElementById("countButton");
const visitCount = document.getElementById("visitCount");

countButton.addEventListener("click", function () {
    visits = visits + 1;
    visitCount.textContent = visits;
});
