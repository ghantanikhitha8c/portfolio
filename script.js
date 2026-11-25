const roles = [
  "Passionate Learner",
  "Future Software Engineer",
  "Creative Problem Solver",
  "Tech Enthusiast",
];

const skillGroups = [
  { icon: "{ }", name: "Programming", skills: ["C", "Python"] },
  { icon: "</>", name: "Web fundamentals", skills: ["HTML", "CSS"] },
];

const projects = [];
const certifications = [];

const skillsGrid = document.querySelector("#skills-grid");
const projectsGrid = document.querySelector("#projects-grid");
const certificationsGrid = document.querySelector("#certifications-grid");
const roleElement = document.querySelector("#rotating-role");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function renderSkills() {
  skillsGrid.innerHTML = skillGroups.map((group, index) => `
    <article class="skill-card">
      <div class="skill-card-top">
        <span class="skill-icon" aria-hidden="true">${group.icon}</span>
        <span class="skill-index">0${index + 1}</span>
      </div>
      <h3>${group.name}</h3>
      <div class="skill-list">${group.skills.map((skill) => `<span>${skill}</span>`).join("")}</div>
    </article>
  `).join("");
}

function renderProjects() {
  if (projects.length === 0) {
    projectsGrid.classList.add("is-empty");
    projectsGrid.innerHTML = `
      <div class="empty-state project-empty-state">
        <span class="empty-state-icon" aria-hidden="true">&lt;/&gt;</span>
        <div>
          <h3>Projects are in progress</h3>
          <p>There aren’t any projects to share yet. I’ll add project details and GitHub links here as I build them.</p>
        </div>
        <span class="empty-state-index">MORE SOON</span>
      </div>
    `;
    return;
  }

  projectsGrid.classList.remove("is-empty");
  projectsGrid.innerHTML = projects.map((project) => `
    <article class="project-card">
      <div class="project-art project-art--${project.art}" role="img" aria-label="Abstract interface preview for ${project.name}">
        <span class="art-label">PROJECT_${project.number} / PREVIEW</span>
        <div class="art-frame" aria-hidden="true">
          <div class="art-window-bar"><i></i><i></i><i></i></div>
          <div class="art-window-content">
            <div class="art-sidebar"></div>
            <div class="art-lines"><i></i><i></i><i></i><i></i></div>
          </div>
        </div>
        <span class="art-number">${project.number} — 03</span>
      </div>
      <div class="project-info">
        <div class="project-kicker"><span>${project.category}</span><span>↗ ${project.number}</span></div>
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <div class="project-tech">${project.technologies.map((technology) => `<span>${technology}</span>`).join("")}</div>
        <div class="project-links">
          <a href="${project.repository}" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          <a href="${project.demo}" target="_blank" rel="noreferrer">Live demo <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </article>
  `).join("");
}

function renderCertifications() {
  if (certifications.length === 0) {
    certificationsGrid.innerHTML = `
      <div class="empty-state">
        <span class="empty-state-icon" aria-hidden="true">✳</span>
        <div>
          <h3>No certifications listed yet</h3>
          <p>I’ll add certifications here when I’ve earned them.</p>
        </div>
        <span class="empty-state-index">COMING SOON</span>
      </div>
    `;
    return;
  }

  certificationsGrid.innerHTML = certifications.map((certification) => `
    <article class="certification-card">
      <span class="empty-state-icon" aria-hidden="true">✳</span>
      <div>
        <h3>${certification.name}</h3>
        <p>${certification.issuer}${certification.date ? ` · ${certification.date}` : ""}</p>
      </div>
      ${certification.url ? `<a class="text-link" href="${certification.url}" target="_blank" rel="noreferrer">View credential <span aria-hidden="true">↗</span></a>` : ""}
    </article>
  `).join("");
}

function rotateRoles() {
  if (reducedMotion.matches || !roleElement) return;
  let index = 0;
  window.setInterval(() => {
    index = (index + 1) % roles.length;
    roleElement.classList.add("is-changing");
    window.setTimeout(() => {
      roleElement.textContent = roles[index];
      roleElement.classList.remove("is-changing");
    }, 170);
  }, 3000);
}

function closeNavigation() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  navigation.classList.remove("is-open");
}

renderSkills();
renderProjects();
renderCertifications();
rotateRoles();

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeNavigation();
});

window.matchMedia("(min-width: 641px)").addEventListener("change", (event) => {
  if (event.matches) closeNavigation();
});
