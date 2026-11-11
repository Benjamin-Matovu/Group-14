const sessions = [
  {
    title: "Lessons Along the Way",
    description: "Personal growth is built from small choices and honest reflection. This session gathers stories about learning from mistakes, practising consistency, and noticing progress even when it feels slow.",
    focus: "Personal development",
    topics: "Habits, lessons, goals"
  },
  {
    title: "Ideas in Progress",
    description: "Every project starts with a question. Explore notes about creative problem-solving, useful tools, experimenting with new skills, and giving promising ideas room to grow.",
    focus: "Creativity and learning",
    topics: "Projects, discoveries, skills"
  },
  {
    title: "Things That Inspire Me",
    description: "Inspiration can come from a conversation, a book, a place, or a simple everyday moment. This session celebrates the things that bring fresh perspective and motivation.",
    focus: "Life and inspiration",
    topics: "People, books, experiences"
  }
];

const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");
const dialog = document.getElementById("sessionDialog");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function setTheme(isDark) {
  body.classList.toggle("dark-theme", isDark);
  themeIcon.textContent = isDark ? "☀" : "☾";
  themeText.textContent = isDark ? "Light mode" : "Dark mode";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  try { localStorage.setItem("personalBlogTheme", isDark ? "dark" : "light"); } catch (error) {}
}

let savedTheme = "light";
try { savedTheme = localStorage.getItem("personalBlogTheme") || "light"; } catch (error) {}
setTheme(savedTheme === "dark");

themeToggle.addEventListener("click", () => {
  setTheme(!body.classList.contains("dark-theme"));
});

document.querySelectorAll(".details-button").forEach((button) => {
  button.addEventListener("click", () => {
    const session = sessions[Number(button.dataset.session)];
    document.getElementById("dialogTitle").textContent = session.title;
    document.getElementById("dialogDescription").textContent = session.description;
    document.getElementById("dialogFocus").textContent = session.focus;
    document.getElementById("dialogTopics").textContent = session.topics;
    dialog.showModal();
  });
});

document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
document.getElementById("dialogDone").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
