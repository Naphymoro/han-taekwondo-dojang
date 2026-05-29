const beltProgression = [
  { name: "White Belt", slug: "white", poomsae: "Kibon Joonbi", lessonTarget: 15 },
  { name: "Yellow Stripe", slug: "yellow-stripe", poomsae: "Kibon Poomsae", lessonTarget: 15 },
  { name: "Yellow Belt", slug: "yellow", poomsae: "Taegeuk 1 Jang", lessonTarget: 15 },
  { name: "Green Stripe", slug: "green-stripe", poomsae: "Taegeuk 2 Jang", lessonTarget: 15 },
  { name: "Green Belt", slug: "green", poomsae: "Taegeuk 3 Jang", lessonTarget: 15 },
  { name: "Blue Stripe", slug: "blue-stripe", poomsae: "Taegeuk 4 Jang", lessonTarget: 15 },
  { name: "Blue Belt", slug: "blue", poomsae: "Taegeuk 5 Jang", lessonTarget: 15 },
  { name: "Red Stripe", slug: "red-stripe", poomsae: "Taegeuk 6 Jang", lessonTarget: 15 },
  { name: "Red Belt", slug: "red", poomsae: "Taegeuk 7 Jang", lessonTarget: 15 },
  { name: "Black Belt Candidate", slug: "black-candidate", poomsae: "Taegeuk 8 Jang", lessonTarget: 15 },
  { name: "Black Belt", slug: "black", poomsae: "Koryo", lessonTarget: 15 }
];

const students = [
  {
    name: "Amina Uwase", initials: "AU", age: 10, belt: "Yellow Belt", slug: "yellow", parent: "Grace Uwase", phone: "+250 788 101 204", plan: "2 lessons per week",
    attendance: { attended: 14, remaining: 1, rate: 92 }, poomsae: 88, techniques: 82, instructorApproved: true, feesPaid: true,
    joined: "Jan 15, 2026", passport: ["White Belt", "Yellow Stripe", "Yellow Belt"], payment: "Paid", nextClass: "Saturday 10:00", promotionFee: "Due after 1 lesson"
  },
  {
    name: "Noah Kim", initials: "NK", age: 12, belt: "Green Stripe", slug: "green-stripe", parent: "Daniel Kim", phone: "+250 788 440 010", plan: "3 lessons per week",
    attendance: { attended: 17, remaining: 0, rate: 96 }, poomsae: 91, techniques: 87, instructorApproved: true, feesPaid: false,
    joined: "Nov 03, 2025", passport: ["White Belt", "Yellow Stripe", "Yellow Belt", "Green Stripe"], payment: "Promotion fee due", nextClass: "Friday 17:00", promotionFee: "RWF 25,000"
  },
  {
    name: "Ethan Mugisha", initials: "EM", age: 8, belt: "White Belt", slug: "white", parent: "Patrick Mugisha", phone: "+250 782 302 771", plan: "1 lesson per week",
    attendance: { attended: 9, remaining: 6, rate: 78 }, poomsae: 62, techniques: 70, instructorApproved: false, feesPaid: true,
    joined: "Mar 18, 2026", passport: ["White Belt"], payment: "Paid", nextClass: "Wednesday 16:00", promotionFee: "Not yet eligible"
  },
  {
    name: "Lina Park", initials: "LP", age: 14, belt: "Blue Belt", slug: "blue", parent: "Sora Park", phone: "+250 789 222 619", plan: "3 lessons per week",
    attendance: { attended: 20, remaining: 0, rate: 94 }, poomsae: 95, techniques: 93, instructorApproved: true, feesPaid: true,
    joined: "Aug 09, 2025", passport: ["White Belt", "Yellow Stripe", "Yellow Belt", "Green Stripe", "Green Belt", "Blue Stripe", "Blue Belt"], payment: "Paid", nextClass: "Thursday 18:30", promotionFee: "Ready"
  }
];

const classes = [
  { time: "16:00", name: "Kids Foundation", level: "White to Yellow Belt", role: "Instructor", assigned: 18, status: "Ongoing" },
  { time: "17:00", name: "Poomsae Lab", level: "Yellow to Green Belt", role: "Instructor", assigned: 14, status: "Upcoming" },
  { time: "18:30", name: "Performance Team", level: "Blue to Red Belt", role: "Admin", assigned: 10, status: "Upcoming" },
  { time: "19:30", name: "Family Review", level: "Parent progress briefing", role: "Parent", assigned: 8, status: "Scheduled" }
];

const events = [
  { month: "JUN", day: "06", title: "Promotion Readiness Review", detail: "Instructor approval and MTN MoMo fee audit" },
  { month: "JUN", day: "14", title: "Belt Promotion Test", detail: "Minimum 15 attended lessons required" },
  { month: "JUL", day: "05", title: "Poomsae Showcase", detail: "Parent viewing and digital belt passport updates" }
];

const poomsaeLibrary = [
  { title: "Kibon Joonbi", belt: "White Belt", slug: "white", focus: "Attention stance, etiquette, chambering, basic blocks.", progress: 74 },
  { title: "Kibon Poomsae", belt: "Yellow Stripe", slug: "yellow-stripe", focus: "Walking stance, low block, middle punch, rhythm.", progress: 68 },
  { title: "Taegeuk 1 Jang", belt: "Yellow Belt", slug: "yellow", focus: "Keon pattern, confidence, foundational direction changes.", progress: 82 },
  { title: "Taegeuk 2 Jang", belt: "Green Stripe", slug: "green-stripe", focus: "Tae principle, front kicks, balance and timing.", progress: 76 },
  { title: "Taegeuk 3 Jang", belt: "Green Belt", slug: "green", focus: "Ri principle, knife-hand blocks and transitions.", progress: 71 },
  { title: "Taegeuk 4 Jang", belt: "Blue Stripe", slug: "blue-stripe", focus: "Jin principle, side kicks, sparring readiness.", progress: 64 },
  { title: "Taegeuk 5 Jang", belt: "Blue Belt", slug: "blue", focus: "Seon principle, power control and elbow strikes.", progress: 59 },
  { title: "Taegeuk 6 Jang", belt: "Red Stripe", slug: "red-stripe", focus: "Gam principle, flow, control, and precision.", progress: 42 },
  { title: "Taegeuk 7 Jang", belt: "Red Belt", slug: "red", focus: "Gan principle, advanced stance discipline.", progress: 36 },
  { title: "Taegeuk 8 Jang", belt: "Black Belt Candidate", slug: "black-candidate", focus: "Gon principle, black belt preparation and mastery.", progress: 24 },
  { title: "Koryo", belt: "Black Belt", slug: "black", focus: "Dan-level poomsae, leadership and technical maturity.", progress: 12 }
];

const money = new Intl.NumberFormat("en-RW", { style: "currency", currency: "RWF", maximumFractionDigits: 0 });
const qs = id => document.getElementById(id);
const safe = value => String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
const readinessScore = student => Math.round(((Math.min(student.attendance.attended, 15) / 15) * 30) + (student.poomsae * .25) + (student.techniques * .2) + (student.instructorApproved ? 15 : 0) + (student.feesPaid ? 10 : 0));
const isReady = student => student.attendance.attended >= 15 && student.poomsae >= 75 && student.techniques >= 75 && student.instructorApproved && student.feesPaid;
const beltMark = slug => `<span class="belt-mark belt-${safe(slug)}"></span>`;

function renderStats() {
  const ready = students.filter(isReady).length;
  const attendance = Math.round(students.reduce((sum, student) => sum + student.attendance.rate, 0) / students.length);
  const due = students.filter(student => !student.feesPaid || student.payment.toLowerCase().includes("due")).length;
  qs("totalStudents").textContent = students.length;
  qs("attendanceRate").textContent = `${attendance}%`;
  qs("promotionsReady").textContent = ready;
  qs("paymentsDue").textContent = due;
  qs("donutTotal").textContent = students.length;
}

function renderStudents() {
  qs("studentList").innerHTML = students.map(student => {
    const score = readinessScore(student);
    return `
      <article class="student-row" aria-label="${safe(student.name)} student profile">
        <div class="student-photo">${safe(student.initials)}</div>
        <div class="student-meta">
          <strong>${safe(student.name)}</strong>
          <span class="belt">${beltMark(student.slug)}${safe(student.belt)}</span>
          <small>Parent: ${safe(student.parent)} · ${safe(student.plan)} · Joined ${safe(student.joined)}</small>
          <div class="progress-bar" aria-label="Promotion readiness ${score} percent"><i style="width:${score}%"></i></div>
          <small>Digital passport: ${student.passport.map(safe).join(" → ")}</small>
        </div>
        <div class="student-kpis">
          <span class="pill">${student.attendance.attended}/15 lessons</span>
          <span class="pill">Poomsae ${student.poomsae}%</span>
          <span class="status ${isReady(student) ? "green" : "blue"}">${isReady(student) ? "Ready" : `${student.attendance.remaining} lessons left`}</span>
        </div>
      </article>`;
  }).join("");
}

function renderReadiness() {
  qs("readinessPanel").innerHTML = students.map(student => {
    const score = readinessScore(student);
    const checks = [
      ["15 lessons", student.attendance.attended >= 15],
      ["Poomsae", student.poomsae >= 75],
      ["Techniques", student.techniques >= 75],
      ["Instructor", student.instructorApproved],
      ["Fees paid", student.feesPaid]
    ];
    return `
      <article class="readiness-card">
        <strong>${safe(student.name)}</strong>
        <span class="belt">${beltMark(student.slug)}${safe(student.belt)}</span>
        <div class="progress-bar" aria-label="${safe(student.name)} readiness ${score} percent"><i style="width:${score}%"></i></div>
        <span class="status ${isReady(student) ? "green" : "red"}">${score}% readiness · ${isReady(student) ? "Eligible" : "Needs action"}</span>
        <div class="check-grid">${checks.map(([label, ready]) => `<span class="check-item ${ready ? "ready" : ""}">${ready ? "✓" : "○"} ${label}</span>`).join("")}</div>
      </article>`;
  }).join("");
}

function renderClasses() {
  qs("classList").innerHTML = classes.map(item => `
    <article class="class-row">
      <div class="class-time">${safe(item.time)}</div>
      <div><strong>${safe(item.name)}</strong><span>${safe(item.level)} · ${safe(item.role)} view · ${item.assigned} assigned</span></div>
      <span class="status ${item.status === "Ongoing" ? "green" : "blue"}">${safe(item.status)}</span>
    </article>`).join("");
}

function renderPayments() {
  const paid = students.filter(student => student.feesPaid).length;
  const due = students.length - paid;
  qs("paymentLegend").innerHTML = `
    <div class="legend-row"><span><i class="legend-dot" style="background:#168a4a"></i>Monthly subscriptions paid</span><strong>${paid}</strong></div>
    <div class="legend-row"><span><i class="legend-dot" style="background:#c69214"></i>MTN MoMo reminders</span><strong>${due}</strong></div>
    <div class="legend-row"><span><i class="legend-dot" style="background:#c91f2f"></i>Promotion fees pending</span><strong>${students.filter(s => s.promotionFee.includes("RWF")).length}</strong></div>
    <div class="legend-row"><span>Uniform inventory example</span><strong>${money.format(35000)}</strong></div>`;
}

function renderEvents() {
  qs("eventList").innerHTML = events.map(event => `
    <article class="event-item">
      <div class="date-badge"><span>${safe(event.month)}</span><strong>${safe(event.day)}</strong></div>
      <div><strong>${safe(event.title)}</strong><span>${safe(event.detail)}</span></div>
    </article>`).join("");
}

function renderBeltRoadmap() {
  qs("beltRoadmap").innerHTML = beltProgression.map((belt, index) => `
    <article class="belt-step">
      ${beltMark(belt.slug)}
      <strong>${safe(belt.name)}</strong>
      <small>${index + 1}/11 · ${safe(belt.poomsae)}</small>
    </article>`).join("");
}

function renderPoomsae() {
  qs("poomsaeList").innerHTML = poomsaeLibrary.map(item => `
    <article class="poomsae-card">
      <span class="belt">${beltMark(item.slug)}${safe(item.belt)}</span>
      <strong>${safe(item.title)}</strong>
      <p>${safe(item.focus)}</p>
      <div class="progress-bar" aria-label="${safe(item.title)} academy progress ${item.progress} percent"><i style="width:${item.progress}%"></i></div>
      <a class="video-link" href="https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + " taekwondo poomsae")}" target="_blank" rel="noreferrer">Open video library</a>
    </article>`).join("");
}

function renderPhone() {
  const child = students[0];
  const score = readinessScore(child);
  qs("phoneChildCard").innerHTML = `
    <div class="student-photo">${safe(child.initials)}</div>
    <div><strong>${safe(child.name)}</strong><span class="belt">${beltMark(child.slug)}${safe(child.belt)}</span><small>${child.attendance.attended} lessons complete · ${score}% ready</small></div>`;
  qs("phoneClasses").innerHTML = `
    <div class="phone-mini-card"><strong>${safe(child.nextClass)}</strong><span>Kids Foundation · Instructor confirmed</span></div>
    <div class="phone-mini-card"><strong>Saturday 12:00</strong><span>Poomsae home practice review</span></div>`;
  qs("phonePayments").innerHTML = `
    <div class="phone-mini-card"><strong>Monthly subscription</strong><span>${safe(child.payment)} · MTN MoMo enabled</span></div>
    <div class="phone-mini-card"><strong>Promotion fee</strong><span>${safe(child.promotionFee)}</span></div>`;
}

function setupControls() {
  const html = document.documentElement;
  let scale = 1;
  const setTheme = dark => {
    html.dataset.theme = dark ? "dark" : "light";
    qs("themeToggle").setAttribute("aria-pressed", String(dark));
  };
  qs("themeToggle")?.addEventListener("click", () => setTheme(html.dataset.theme !== "dark"));
  qs("phoneTheme")?.addEventListener("click", () => qs("themeToggle").click());
  qs("increaseText")?.addEventListener("click", () => { scale = Math.min(1.35, scale + 0.1); html.style.setProperty("--font-scale", scale); });
  qs("decreaseText")?.addEventListener("click", () => { scale = Math.max(0.9, scale - 0.1); html.style.setProperty("--font-scale", scale); });
  qs("resetText")?.addEventListener("click", () => { scale = 1; html.style.setProperty("--font-scale", scale); });
  qs("phoneText")?.addEventListener("click", () => qs("increaseText").click());
  qs("highContrast")?.addEventListener("click", () => html.classList.toggle("high-contrast"));
}

function init() {
  renderStats();
  renderStudents();
  renderReadiness();
  renderClasses();
  renderPayments();
  renderEvents();
  renderBeltRoadmap();
  renderPoomsae();
  renderPhone();
  setupControls();
}

document.addEventListener("DOMContentLoaded", init);
