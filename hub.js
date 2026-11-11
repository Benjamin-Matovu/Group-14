const MEMBERS = [
  {
    id: "benjamin",
    name: "Benjamin Matovu",
    shortName: "Benjamin",
    initials: "BM",
    color: "#b45309",
    path: "Benja/index.html",
    blogTitle: "DevSecOps & AI Infrastructure",
    description: "Personal engineering notebook covering automated security pipelines, AI model serving, sessions, likes, and comments."
  },
  {
    id: "brian",
    name: "Brian",
    shortName: "Brian",
    initials: "BR",
    color: "#2563eb",
    path: "brian/personalblog.html",
    blogTitle: "My Personal Blog",
    description: "Three expandable sessions on About Me, My Journey, and My Goals with a dark mode toggle."
  },
  {
    id: "bridget",
    name: "Bridget",
    shortName: "Bridget",
    initials: "BG",
    color: "#7c3aed",
    path: "Bridget/index.html",
    blogTitle: "My Personal Blog",
    description: "Features live date & time, profile picture, interactive session details, visitor comments, and a session visit counter."
  },
  {
    id: "isaac",
    name: "Talemwa Isaac",
    shortName: "Isaac",
    initials: "TI",
    color: "#0f766e",
    path: "Isaac/index.html",
    blogTitle: "Coursework & Fieldwork Diary",
    description: "Documents coursework activities, a project discussion video, and fieldwork gallery photographs."
  },
  {
    id: "molly",
    name: "Molly (Nianah)",
    shortName: "Molly",
    initials: "MN",
    color: "#db2777",
    path: "molly/index.html",
    blogTitle: "Nianah's Personal Blog",
    description: "Includes Light, Dark, and Pastel themes, story search, photo blog posts, live clock, and visitor comments."
  },
  {
    id: "zion",
    name: "Nsubuga Zion",
    shortName: "Zion",
    initials: "NZ",
    color: "#4f46e5",
    path: "Zion/zion.html",
    blogTitle: "Nsubuga Zion Personal Blog",
    description: "Responsive editorial layout with dark mode, interactive session detail modals, and reflections."
  }
];

const membersMenu = document.getElementById("membersMenu");
const membersDropdown = document.getElementById("membersDropdown");
const membersDropdownBtn = document.getElementById("membersDropdownBtn");
const dropdownLabel = document.getElementById("dropdownLabel");
const quickPills = document.getElementById("quickPills");
const memberGrid = document.getElementById("memberGrid");
const hubView = document.getElementById("hubView");
const viewerWrap = document.getElementById("viewerWrap");
const memberFrame = document.getElementById("memberFrame");
const hubHomeBtn = document.getElementById("hubHomeBtn");
const navHomeBtn = document.getElementById("navHomeBtn");
const navAboutLink = document.getElementById("navAboutLink");
const standaloneLink = document.getElementById("standaloneLink");
const hubThemeBtn = document.getElementById("hubThemeBtn");

function renderMembers() {
  MEMBERS.forEach((member) => {
    const menuBtn = document.createElement("button");
    menuBtn.type = "button";
    menuBtn.className = "dropdown-item";
    menuBtn.role = "menuitem";
    menuBtn.dataset.memberId = member.id;
    menuBtn.innerHTML = `
      <span class="dropdown-dot" style="background:${member.color}"></span>
      <span>${member.name}</span>
      <span class="dropdown-sub">↗</span>
    `;
    menuBtn.addEventListener("click", () => {
      closeDropdown();
      selectMember(member.id);
    });
    membersMenu.appendChild(menuBtn);

    const quickBtn = document.createElement("button");
    quickBtn.type = "button";
    quickBtn.className = "quick-pill";
    quickBtn.textContent = member.shortName;
    quickBtn.addEventListener("click", () => selectMember(member.id));
    quickPills.appendChild(quickBtn);

    const card = document.createElement("article");
    card.className = "member-card";
    card.style.borderTopColor = member.color;
    card.innerHTML = `
      <div class="card-head">
        <span class="avatar" style="background:${member.color}">${member.initials}</span>
        <div>
          <h3 class="member-name">${member.name}</h3>
          <p class="member-file">${member.path}</p>
        </div>
      </div>
      <p class="member-title">${member.blogTitle}</p>
      <p class="member-desc">${member.description}</p>
      <div class="card-actions">
        <button type="button" class="btn-view">Open Blog</button>
        <a class="btn-open" href="${member.path}" target="_blank" rel="noopener">New Tab ↗</a>
      </div>
    `;
    card.querySelector(".btn-view").addEventListener("click", () => selectMember(member.id));
    memberGrid.appendChild(card);
  });
}

function toggleDropdown() {
  const isHidden = membersMenu.hidden;
  membersMenu.hidden = !isHidden;
  membersDropdownBtn.setAttribute("aria-expanded", String(isHidden));
}

function closeDropdown() {
  membersMenu.hidden = true;
  membersDropdownBtn.setAttribute("aria-expanded", "false");
}

function updateActiveState(activeMember) {
  const isHome = !activeMember;
  navHomeBtn.classList.toggle("is-active", isHome);
  membersDropdownBtn.classList.toggle("is-active", !isHome);
  dropdownLabel.textContent = activeMember ? activeMember.shortName : "Members";

  membersMenu.querySelectorAll(".dropdown-item").forEach((item) => {
    item.classList.toggle("is-active", Boolean(activeMember && item.dataset.memberId === activeMember.id));
  });
}

function showHome(updateHash = true, scrollTarget = null) {
  hubView.hidden = false;
  viewerWrap.hidden = true;
  standaloneLink.hidden = true;
  memberFrame.removeAttribute("src");
  updateActiveState(null);
  document.title = "Group Academic Blog | Home";

  if (updateHash && window.location.hash) {
    history.pushState(null, "", window.location.pathname + window.location.search);
  }

  if (scrollTarget) {
    const targetEl = document.getElementById(scrollTarget);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function selectMember(memberId, updateHash = true) {
  const member = MEMBERS.find((item) => item.id === memberId);
  if (!member) {
    showHome(false);
    return;
  }

  hubView.hidden = true;
  viewerWrap.hidden = false;
  standaloneLink.hidden = false;
  standaloneLink.href = member.path;

  if (memberFrame.getAttribute("src") !== member.path) {
    memberFrame.setAttribute("src", member.path);
  }
  memberFrame.title = `${member.name} — ${member.blogTitle}`;
  document.title = `${member.name} — Group Academic Blog`;
  updateActiveState(member);

  if (updateHash && window.location.hash !== `#${member.id}`) {
    window.location.hash = member.id;
  }
}

function syncFromHash() {
  const hash = window.location.hash.replace(/^#/, "").toLowerCase();
  if (!hash) {
    showHome(false);
    return;
  }
  if (hash === "aboutsection" || hash === "memberssection") {
    showHome(false, hash === "aboutsection" ? "aboutSection" : "membersSection");
    return;
  }
  selectMember(hash, false);
}

function applySavedTheme() {
  try {
    if (localStorage.getItem("group_hub_theme") === "dark") {
      document.body.classList.add("hub-dark");
    }
  } catch (e) {}
}

hubThemeBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("hub-dark");
  try {
    localStorage.setItem("group_hub_theme", isDark ? "dark" : "light");
  } catch (e) {}
});

membersDropdownBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleDropdown();
});

document.addEventListener("click", (event) => {
  if (!membersDropdown.contains(event.target)) {
    closeDropdown();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDropdown();
  }
});

hubHomeBtn.addEventListener("click", () => showHome(true));
navHomeBtn.addEventListener("click", () => showHome(true));

navAboutLink.addEventListener("click", (event) => {
  if (hubView.hidden) {
    event.preventDefault();
    showHome(true, "aboutSection");
  }
});

window.addEventListener("hashchange", syncFromHash);

applySavedTheme();
renderMembers();
syncFromHash();
