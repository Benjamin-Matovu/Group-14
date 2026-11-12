const MEMBERS = [
  {
    id: "brian",
    name: "Lokolimoe John Brian",
    shortName: "Brian",
    regNumber: "25/U/03848/PS",
    path: "brian/personalblog.html",
    blogTitle: "My Personal Blog"
  },
  {
    id: "molly",
    name: "Navubya Molly",
    shortName: "Molly",
    regNumber: "25/U/04022/PS",
    path: "molly/index.html",
    blogTitle: "Nianah's Personal Blog"
  },
  {
    id: "bridget",
    name: "Kembabazi Bridget",
    shortName: "Bridget",
    regNumber: "25/U/03794/PS",
    path: "Bridget/index.html",
    blogTitle: "My Personal Blog"
  },
  {
    id: "isaac",
    name: "Talemwa Isaac",
    shortName: "Isaac",
    regNumber: "25/U/04114/EVE",
    path: "Isaac/index.html",
    blogTitle: "Coursework & Fieldwork Diary"
  },
  {
    id: "zion",
    name: "Nsubuga Zion",
    shortName: "Zion",
    regNumber: "25/U/04039/PS",
    path: "Zion/zion.html",
    blogTitle: "Nsubuga Zion Personal Blog"
  },
  {
    id: "benjamin",
    name: "Matovu Benjamin Agustine",
    shortName: "Benjamin",
    regNumber: "25/U/03874/PS",
    path: "Benja/index.html",
    blogTitle: "DevSecOps & AI Infrastructure"
  }
];

const membersMenu = document.getElementById("membersMenu");
const membersDropdown = document.getElementById("membersDropdown");
const membersDropdownBtn = document.getElementById("membersDropdownBtn");
const dropdownLabel = document.getElementById("dropdownLabel");
const memberTableBody = document.getElementById("memberTableBody");
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

    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    const nameLink = document.createElement("a");
    nameLink.className = "member-name-link";
    nameLink.href = `#${member.id}`;
    nameLink.textContent = member.name;
    const arrow = document.createElement("span");
    arrow.className = "link-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";
    nameLink.appendChild(arrow);
    nameLink.addEventListener("click", (event) => {
      event.preventDefault();
      selectMember(member.id);
    });
    nameCell.appendChild(nameLink);

    const regCell = document.createElement("td");
    regCell.className = "reg-number";
    regCell.textContent = member.regNumber;

    row.appendChild(nameCell);
    row.appendChild(regCell);
    memberTableBody.appendChild(row);
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
