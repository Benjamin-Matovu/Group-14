const MEMBERS = [
  {
    id: "benjamin",
    name: "Benjamin Matovu",
    shortName: "Benjamin",
    initials: "BM",
    color: "#854d0e",
    path: "Benja/index.html",
    blogTitle: "DevSecOps & AI Infrastructure",
    description: "Engineering notebook on automated security pipelines, AI model serving, sessions, and comments."
  },
  {
    id: "brian",
    name: "Brian",
    shortName: "Brian",
    initials: "BR",
    color: "#1e40af",
    path: "brian/personalblog.html",
    blogTitle: "My Personal Blog",
    description: "Three expandable sessions covering About Me, My Journey, and My Goals with a dark mode toggle."
  },
  {
    id: "bridget",
    name: "Bridget",
    shortName: "Bridget",
    initials: "BG",
    avatarImage: "Bridget/profile.jpg.jpeg",
    color: "#6d28d9",
    path: "Bridget/index.html",
    blogTitle: "My Personal Blog",
    description: "Features live date and time, session details, visitor comments, and a session visit counter."
  },
  {
    id: "isaac",
    name: "Talemwa Isaac",
    shortName: "Isaac",
    initials: "TI",
    color: "#0f766e",
    path: "Isaac/index.html",
    blogTitle: "Coursework & Fieldwork Diary",
    description: "Coursework activities, project discussion video, and fieldwork gallery photographs."
  },
  {
    id: "molly",
    name: "Molly (Nianah)",
    shortName: "Molly",
    initials: "MN",
    color: "#9d174d",
    path: "molly/index.html",
    blogTitle: "Nianah's Personal Blog",
    description: "Light, Dark, and Pastel themes, story search, photo blog posts, live clock, and comments."
  },
  {
    id: "zion",
    name: "Nsubuga Zion",
    shortName: "Zion",
    initials: "NZ",
    color: "#3730a3",
    path: "Zion/zion.html",
    blogTitle: "Nsubuga Zion Personal Blog",
    description: "Editorial layout with dark mode, session detail modals, and personal reflections."
  }
];

const membersMenu = document.getElementById("membersMenu");
const membersDropdown = document.getElementById("membersDropdown");
const membersDropdownBtn = document.getElementById("membersDropdownBtn");
const dropdownLabel = document.getElementById("dropdownLabel");
const memberGrid = document.getElementById("memberGrid");
const hubView = document.getElementById("hubView");
const viewerWrap = document.getElementById("viewerWrap");
const memberFrame = document.getElementById("memberFrame");
const hubHomeBtn = document.getElementById("hubHomeBtn");
const navHomeBtn = document.getElementById("navHomeBtn");
const navAboutLink = document.getElementById("navAboutLink");
const hubThemeBtn = document.getElementById("hubThemeBtn");

function renderMembers() {
  MEMBERS.forEach((member) => {
    const menuLink = document.createElement("a");
    menuLink.className = "dropdown-item";
    menuLink.role = "menuitem";
    menuLink.href = `#${member.id}`;
    menuLink.dataset.memberId = member.id;
    menuLink.textContent = member.name;
    menuLink.addEventListener("click", (event) => {
      event.preventDefault();
      closeDropdown();
      selectMember(member.id);
    });
    membersMenu.appendChild(menuLink);

    const avatarMarkup = member.avatarImage
      ? `<span class="avatar"><img class="avatar-img" src="${member.avatarImage}" alt="${member.name}"></span>`
      : `<span class="avatar" style="background:${member.color}">${member.initials}</span>`;

    const card = document.createElement("article");
    card.className = "member-card";
    card.innerHTML = `
      <div class="card-head">
        ${avatarMarkup}
        <div>
          <h3 class="member-name">${member.name}</h3>
          <p class="member-title">${member.blogTitle}</p>
        </div>
      </div>
      <p class="member-desc">${member.description}</p>
      <button type="button" class="btn-view">Open Blog</button>
    `;
    card.querySelector(".btn-view").addEventListener("click", () => selectMember(member.id));
    memberGrid.appendChild(card);
  });
}

function toggleDropdown() {
  const isOpen = membersDropdown.classList.toggle("is-open");
  membersDropdownBtn.setAttribute("aria-expanded", String(isOpen));
}

function closeDropdown() {
  membersDropdown.classList.remove("is-open");
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
  memberFrame.removeAttribute("src");
  updateActiveState(null);
  document.title = "Group 14 | Personal Blogs";

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

  if (memberFrame.getAttribute("src") !== member.path) {
    memberFrame.setAttribute("src", member.path);
  }
  memberFrame.title = `${member.name} — ${member.blogTitle}`;
  document.title = `${member.name} — Group 14`;
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
