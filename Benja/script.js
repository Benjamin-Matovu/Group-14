/**
 * Benjamin Matovu - Personal Portfolio & Blog Script
 * DevSecOps & AI Infrastructure
 * Strictly Zero Emojis - Vector Web Icons Only
 */

document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------------------------------------
  // 1. Theme Management (Dark & Light Mode)
  // -------------------------------------------------------------
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  const sunSvg = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  `;

  const moonSvg = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  `;

  function applyTheme(isDark) {
    if (isDark) {
      body.classList.add("dark-mode");
      if (themeToggle) {
        themeToggle.innerHTML = sunSvg;
        themeToggle.setAttribute("aria-label", "Switch to light mode");
        themeToggle.title = "Switch to Light Mode";
      }
    } else {
      body.classList.remove("dark-mode");
      if (themeToggle) {
        themeToggle.innerHTML = moonSvg;
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
        themeToggle.title = "Switch to Dark Mode";
      }
    }
    try {
      localStorage.setItem("benjamin_theme_mode", isDark ? "dark" : "light");
    } catch (e) {
      console.warn("Storage unavailable:", e);
    }
  }

  // Initial Theme Check
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("benjamin_theme_mode");
  } catch (e) {}

  if (savedTheme) {
    applyTheme(savedTheme === "dark");
  } else {
    // Default to the warm editorial light theme, matching the user's shared image
    applyTheme(false);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = body.classList.contains("dark-mode");
      applyTheme(!isDark);
    });
  }

  // -------------------------------------------------------------
  // 2. Mobile Navigation Toggle
  // -------------------------------------------------------------
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // -------------------------------------------------------------
  // 3. Comments System (No Emojis, Pure SVG Vector Icons)
  // -------------------------------------------------------------
  const commentForm = document.getElementById("commentForm");
  const commentsList = document.getElementById("commentsList");
  const commentCountBadge = document.getElementById("commentCountBadge");
  const toastNotice = document.getElementById("toastNotice");

  const DEFAULT_COMMENTS = [
    {
      id: "c1",
      author: "Isaac Talemwa",
      role: "Systems Collaborator",
      message: "The shift-left security architecture notes are brilliantly articulated. Embedding SAST and automated leak prevention into CI/CD saves countless production hours.",
      date: "Oct 27, 2026",
      likes: 5
    },
    {
      id: "c2",
      author: "Bridget Kembabazi",
      role: "Software Engineering Peer",
      message: "Really impressed by the AI inference benchmark breakdown. The vLLM throughput calculations provide practical clarity for production workloads.",
      date: "Oct 28, 2026",
      likes: 4
    },
    {
      id: "c3",
      author: "Dr. Innocent",
      role: "Faculty Advisor",
      message: "Commendable balance between academic theory in distributed systems and real-world DevSecOps execution. Excellent personal portfolio, Benjamin.",
      date: "Oct 28, 2026",
      likes: 8
    }
  ];

  function getStoredComments() {
    try {
      const stored = localStorage.getItem("benjamin_editorial_comments");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Storage read error:", e);
    }
    return DEFAULT_COMMENTS;
  }

  function saveComments(comments) {
    try {
      localStorage.setItem("benjamin_editorial_comments", JSON.stringify(comments));
    } catch (e) {
      console.warn("Storage write error:", e);
    }
  }

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function getInitials(name) {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase() || "BM";
  }

  const heartSvg = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  `;

  function renderComments() {
    if (!commentsList) return;
    const comments = getStoredComments();

    if (commentCountBadge) {
      commentCountBadge.textContent = `${comments.length} Comment${comments.length === 1 ? "" : "s"}`;
    }

    if (comments.length === 0) {
      commentsList.innerHTML = `<div class="empty-comments">No comments yet. Start the conversation below.</div>`;
      return;
    }

    commentsList.innerHTML = comments
      .map((c) => {
        const initials = getInitials(c.author);
        return `
        <article class="comment-item" id="comment-${c.id}">
          <div class="comment-item-top">
            <div class="comment-user-info">
              <div class="comment-avatar" aria-hidden="true">${initials}</div>
              <div>
                <div class="comment-author-name">${escapeHTML(c.author)}</div>
                <div class="comment-author-role">${escapeHTML(c.role || "Visitor")}</div>
              </div>
            </div>
            <time class="comment-time">${escapeHTML(c.date)}</time>
          </div>
          <p class="comment-body">${escapeHTML(c.message)}</p>
          <div class="comment-footer">
            <button class="like-comment-btn" data-id="${c.id}" aria-label="Endorse comment">
              ${heartSvg}
              <span class="like-count">${c.likes || 0}</span>
            </button>
          </div>
        </article>
      `;
      })
      .join("");

    commentsList.querySelectorAll(".like-comment-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        toggleLikeComment(id, btn);
      });
    });
  }

  function toggleLikeComment(id, btn) {
    const comments = getStoredComments();
    const target = comments.find((c) => c.id === id);
    if (!target) return;

    target.likes = (target.likes || 0) + 1;
    saveComments(comments);
    btn.classList.add("liked");
    const countSpan = btn.querySelector(".like-count");
    if (countSpan) {
      countSpan.textContent = target.likes;
    }
  }

  function showToast(message) {
    if (!toastNotice) return;
    toastNotice.textContent = message;
    toastNotice.classList.add("show");
    setTimeout(() => {
      toastNotice.classList.remove("show");
    }, 3600);
  }

  if (commentForm) {
    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("visitorName");
      const roleInput = document.getElementById("visitorRole");
      const messageInput = document.getElementById("visitorMessage");

      const author = nameInput ? nameInput.value.trim() : "";
      const role = roleInput && roleInput.value.trim() ? roleInput.value.trim() : "Reader";
      const message = messageInput ? messageInput.value.trim() : "";

      if (!author || !message) {
        alert("Please provide both your name and feedback.");
        return;
      }

      const now = new Date();
      const dateString = now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });

      const newComment = {
        id: "c_" + Date.now(),
        author,
        role,
        message,
        date: dateString,
        likes: 0
      };

      const comments = getStoredComments();
      comments.unshift(newComment);
      saveComments(comments);

      renderComments();
      commentForm.reset();
      showToast("Thank you. Your comment has been posted.");
    });
  }

  // Initial render
  renderComments();
});
