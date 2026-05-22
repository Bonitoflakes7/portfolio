const primaryTech = [
  "Python", "Go", "SQL", "Cypher", "JavaScript", "TypeScript", "Flask", "FastAPI",
  "Streamlit", "LangChain", "Next.js", "React", "Tailwind CSS", "PostgreSQL",
  "Neo4j", "ChromaDB", "TensorFlow"
];

const secondaryTech = [
  "Keras", "Pandas", "NumPy", "Plotly", "Scikit-Learn", "Matplotlib", "Docker",
  "AWS", "Vercel", "Git", "GitHub", "Postman", "Ollama", "Mistral",
  "Supabase", "Groq API", "AI Agents"
];

function fillMarquee(selector, items) {
  const node = document.querySelector(selector);
  if (!node) return;
  const doubled = [...items, ...items, ...items];
  node.innerHTML = doubled.map((item) => `<span class="tech-pill">${item}</span>`).join("");
}

function updateClock() {
  const clock = document.querySelector("#clock");
  if (!clock) return;
  const now = new Date();
  const time = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).format(now);
  clock.innerHTML = `${time} <b>時間</b>`;
}

function scrollToSection(target) {
  const section = document.getElementById(target);
  if (!section) return;
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

fillMarquee('[data-tech-row="primary"]', primaryTech);
fillMarquee('[data-tech-row="secondary"]', secondaryTech);
updateClock();
setInterval(updateClock, 30000);

const root = document.documentElement;
const nav = document.querySelector(".nav");
const menuButton = document.querySelector(".menu-btn");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 28);
});

document.querySelectorAll("[data-target]").forEach((button) => {
  button.addEventListener("click", () => {
    scrollToSection(button.dataset.target);
    root.classList.remove("mobile-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

menuButton?.addEventListener("click", () => {
  const isOpen = root.classList.toggle("mobile-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));

const animatedItems = [
  ".copy-grid p",
  ".project-card",
  ".other-projects a",
  ".timeline-item",
  ".notes article",
  ".contact-actions a",
  ".contact-links a"
];

document.querySelectorAll(animatedItems.join(",")).forEach((item, index) => {
  item.classList.add("reveal-item");
  item.style.setProperty("--delay", `${Math.min(index % 6, 5) * 70}ms`);
  observer.observe(item);
});
