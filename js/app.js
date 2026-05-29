const students = [
  { name: "Alex Johnson", belt: "White Belt", age: 10, joined: "May 10, 2025", initials: "AJ", color: "white" },
  { name: "Maria Santos", belt: "Yellow Belt", age: 12, joined: "May 8, 2025", initials: "MS", color: "yellow" },
  { name: "James Lee", belt: "Green Belt", age: 14, joined: "May 6, 2025", initials: "JL", color: "green" },
  { name: "Sophie Kim", belt: "White Belt", age: 9, joined: "May 5, 2025", initials: "SK", color: "white" },
  { name: "Daniel Park", belt: "Blue Belt", age: 13, joined: "May 1, 2025", initials: "DP", color: "blue" }
];

const classes = [
  { time: "4:00 PM", name: "Kids Beginner", level: "White – Yellow Belt", status: "Ongoing" },
  { time: "5:00 PM", name: "Kids Intermediate", level: "Green – Blue Belt", status: "Upcoming" },
  { time: "6:30 PM", name: "Teen/Adult", level: "Blue – Red Belt", status: "Upcoming" },
  { time: "8:00 PM", name: "Poomsae Class", level: "All Belts", status: "Upcoming" }
];

const poomsae = [
  { title: "Kibon Poomsae", belt: "Yellow Stripe", focus: "Basic stance, blocks, discipline" },
  { title: "Taegeuk 1 Jang", belt: "Yellow Belt", focus: "Walking stance, low block, middle punch" },
  { title: "Taegeuk 2 Jang", belt: "Green Stripe", focus: "Front kick, rhythm, combinations" },
  { title: "Taegeuk 3 Jang", belt: "Green Belt", focus: "Knife-hand blocks and transitions" },
  { title: "Taegeuk 4 Jang", belt: "Blue Stripe", focus: "Side kick and sparring readiness" },
  { title: "Taegeuk 5 Jang", belt: "Blue Belt", focus: "Power control and elbow strike" }
];

function qs(id) {
  return document.getElementById(id);
}

function renderStats() {
  qs("totalStudents").textContent = "128";
  qs("activeClasses").textContent = "12";
  qs("paymentsDue").textContent = "15";
  qs("promotionsReady").textContent = "6";
  qs("donutTotal").textContent = "128";
}

function renderStudents() {
  qs("studentList").innerHTML = students.map(student => `
    <div class="student-row">
      <div class="student-photo">${student.initials}</div>
      <div class="student-meta">
        <strong>${student.name}</strong>
        <span class="belt"><span class="belt-mark belt-${student.color}"></span>${student.belt}</span>
      </div>
      <div class="student-age">Age ${student.age}</div>
      <div class="student-date"><span>Joined</span><br>${student.joined}</div>
    </div>
  `).join("");
}

function renderClasses() {
  qs("classList").innerHTML = classes.map(item => `
    <div class="class-row">
      <div class="class-time">${item.time}</div>
      <div>
        <strong>${item.name}</strong>
        <span>${item.level}</span>
      </div>
      <span class="status ${item.status === "Ongoing" ? "green" : "blue"}">${item.status}</span>
    </div>
  `).join("");
}

function renderPayments() {
  qs("paymentLegend").innerHTML = `
    <div class="legend-row"><span><i class="legend-dot" style="background:#39a854"></i>Paid</span><strong>88 (69%)</strong></div>
    <div class="legend-row"><span><i class="legend-dot" style="background:#f5b400"></i>Partial</span><strong>25 (20%)</strong></div>
    <div class="legend-row"><span><i class="legend-dot" style="background:#ef4444"></i>Unpaid</span><strong>15 (12%)</strong></div>
  `;
}

function renderPoomsae() {
  qs("poomsaeList").innerHTML = poomsae.map(item => `
    <article class="poomsae-card">
      <strong>${item.title}</strong>
      <span>${item.belt}</span>
      <p>${item.focus}</p>
    </article>
  `).join("");
}

function renderPhone() {
  qs("phoneChildCard").innerHTML = `
    <div class="student-photo">AJ</div>
    <div>
      <strong>Alex Johnson</strong>
      <span>White Belt</span>
      <small>Member since May 10, 2025</small>
    </div>
    <span aria-hidden="true">›</span>
  `;

  qs("phoneClasses").innerHTML = `
    <div class="phone-mini-card"><strong>May 17, Sat • 4:00 PM</strong><span>Kids Beginner</span></div>
    <div class="phone-mini-card"><strong>May 20, Tue • 4:00 PM</strong><span>Kids Beginner</span></div>
  `;

  qs("phonePayments").innerHTML = `
    <div class="phone-mini-card"><strong>May Membership</strong><span>May 1, 2025 • Paid</span></div>
  `;
}

function setupControls() {
  const html = document.documentElement;
  let scale = 1;

  qs("themeToggle").addEventListener("click", () => {
    const dark = html.dataset.theme !== "dark";
    html.dataset.theme = dark ? "dark" : "light";
    qs("themeToggle").setAttribute("aria-pressed", String(dark));
  });

  qs("phoneTheme").addEventListener("click", () => qs("themeToggle").click());

  qs("increaseText").addEventListener("click", () => {
    scale = Math.min(1.25, scale + 0.1);
    html.style.setProperty("--font-scale", scale);
  });

  qs("decreaseText").addEventListener("click", () => {
    scale = Math.max(0.9, scale - 0.1);
    html.style.setProperty("--font-scale", scale);
  });

  qs("resetText").addEventListener("click", () => {
    scale = 1;
    html.style.setProperty("--font-scale", scale);
  });

  qs("phoneText").addEventListener("click", () => qs("increaseText").click());

  qs("highContrast").addEventListener("click", () => {
    html.classList.toggle("high-contrast");
  });
}

renderStats();
renderStudents();
renderClasses();
renderPayments();
renderPoomsae();
renderPhone();
setupControls();
