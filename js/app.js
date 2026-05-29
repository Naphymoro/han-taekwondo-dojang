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
  { name: "Minho Park", initials: "MP", age: 8, belt: "Yellow Belt", slug: "yellow", parent: "Mrs. Jiwon Park", plan: "2 lessons / week", attendance: { attended: 7, remaining: 8, rate: 87 }, poomsae: 67, techniques: 80, stances: 80, instructorApproved: false, feesPaid: false, joined: "Jan 10, 2026", passport: ["White Belt", "Yellow Belt"], payment: "Overdue", promotionFee: "RWF 50,000", monthlyFee: 40000 },
  { name: "Niyonsaba Aline", initials: "NA", age: 11, belt: "Green Stripe", slug: "green-stripe", parent: "Aline Family", plan: "3 lessons / week", attendance: { attended: 18, remaining: 0, rate: 96 }, poomsae: 88, techniques: 90, stances: 92, instructorApproved: true, feesPaid: true, joined: "Nov 03, 2025", passport: ["White", "Yellow", "Green Stripe"], payment: "Paid", promotionFee: "Ready", monthlyFee: 55000 },
  { name: "Umutoni Diane", initials: "UD", age: 10, belt: "Blue Stripe", slug: "blue-stripe", parent: "Umutoni Family", plan: "2 lessons / week", attendance: { attended: 16, remaining: 0, rate: 95 }, poomsae: 84, techniques: 86, stances: 82, instructorApproved: true, feesPaid: true, joined: "Sep 21, 2025", passport: ["White", "Yellow", "Green", "Blue Stripe"], payment: "Paid", promotionFee: "Ready", monthlyFee: 40000 },
  { name: "Hakizimana Eric", initials: "HE", age: 13, belt: "Blue Belt", slug: "blue", parent: "Hakizimana Family", plan: "3 lessons / week", attendance: { attended: 15, remaining: 0, rate: 94 }, poomsae: 81, techniques: 85, stances: 80, instructorApproved: true, feesPaid: false, joined: "Aug 09, 2025", passport: ["White", "Yellow", "Green", "Blue"], payment: "Promotion fee due", promotionFee: "RWF 50,000", monthlyFee: 55000 }
];

const timetable = {
  Monday: [
    { time: "13:00-14:00", title: "Women’s Lesson", type: "women" },
    { time: "17:00-17:55", title: "Kid Lesson", type: "kid" },
    { time: "18:00-18:55", title: "Teen & Adults Lesson", type: "teen" },
    { time: "19:00-19:55", title: "Teen & Adults Lesson", type: "teen" }
  ],
  Tuesday: [
    { time: "16:00-16:55", title: "Kid Lesson", type: "kid" },
    { time: "17:00-17:40", title: "Little Dragon", type: "dragon" },
    { time: "18:00-18:55", title: "Kid Lesson", type: "kid" },
    { time: "19:00-19:55", title: "Sparring Lesson", type: "sparring" }
  ],
  Thursday: [
    { time: "17:00-17:55", title: "Kid Lesson", type: "kid" },
    { time: "18:00-18:55", title: "Teen & Adults Lesson", type: "teen" }
  ],
  Friday: [
    { time: "14:00-14:55", title: "Sparring Lesson", type: "sparring" },
    { time: "15:00-15:40", title: "Little Dragon", type: "dragon" },
    { time: "16:00-16:55", title: "Kid Lesson", type: "kid" },
    { time: "17:00-17:40", title: "Little Dragon", type: "dragon" },
    { time: "18:00-18:55", title: "Kid Lesson", type: "kid" },
    { time: "19:00-19:55", title: "Sparring Lesson", type: "sparring" }
  ],
  Saturday: [
    { time: "09:00-09:55", title: "Kid Lesson", type: "kid" },
    { time: "10:00-10:40", title: "Little Dragon", type: "dragon" },
    { time: "11:00-11:55", title: "Kid Lesson", type: "kid" },
    { time: "12:00-12:55", title: "Teen & Adults Lesson", type: "teen" }
  ]
};

const poomsaeLibrary = beltProgression.map((belt, index) => ({
  title: belt.poomsae,
  belt: belt.name,
  slug: belt.slug,
  focus: ["Etiquette", "Kicks", "Stances", "Blocks", "Punches", "Control"][index % 6] + " progression for " + belt.name,
  progress: Math.max(12, 90 - index * 7)
}));

const invoices = [
  { description: "May 2026 Monthly Fee", due: "May 15, 2026", amount: 40000, status: "Overdue" },
  { description: "June 2026 Monthly Fee", due: "Jun 15, 2026", amount: 40000, status: "Pending" },
  { description: "Promotion Test Fee", due: "May 31, 2026", amount: 50000, status: "Pending" },
  { description: "Uniform Dobok", due: "Apr 20, 2026", amount: 30000, status: "Paid" }
];

const qs = id => document.getElementById(id);
const rwf = value => "RWF " + new Intl.NumberFormat("en-RW").format(value);
const safe = value => String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
const readinessScore = s => Math.round(((Math.min(s.attendance.attended, 15) / 15) * 25) + (s.poomsae * .2) + (s.techniques * .2) + (s.stances * .15) + (s.instructorApproved ? 10 : 0) + (s.feesPaid ? 10 : 0));
const isReady = s => s.attendance.attended >= 15 && s.poomsae >= 75 && s.techniques >= 75 && s.stances >= 75 && s.instructorApproved && s.feesPaid;
const beltMark = slug => `<span class="belt-mark belt-${safe(slug)}"></span>`;

function detectDevice() {
  const html = document.documentElement;
  const width = window.innerWidth;
  html.classList.toggle("device-phone", width < 720);
  html.classList.toggle("device-tablet", width >= 720 && width < 1180);
  html.classList.toggle("device-desktop", width >= 1180);
  html.dataset.device = width < 720 ? "phone" : width < 1180 ? "tablet" : "desktop";
}

function renderStats() {
  const ready = students.filter(isReady).length;
  const due = invoices.filter(i => i.status !== "Paid").length;
  const attendance = Math.round(students.reduce((sum, s) => sum + s.attendance.rate, 0) / students.length);
  const revenue = students.reduce((sum, s) => sum + s.monthlyFee, 0);
  qs("totalStudents").textContent = "128";
  qs("attendanceRate").textContent = `${attendance}%`;
  qs("paymentsDue").textContent = rwf(invoices.filter(i => i.status !== "Paid").reduce((sum, i) => sum + i.amount, 0));
  qs("promotionsReady").textContent = ready;
  const revenueNode = qs("monthlyRevenue");
  if (revenueNode) revenueNode.textContent = rwf(revenue);
  const donut = qs("donutTotal");
  if (donut) donut.textContent = "128";
}

function renderStudents() {
  const s = students[0];
  qs("studentList").innerHTML = students.map(student => `
    <article class="student-row">
      <div class="student-photo">${safe(student.initials)}</div>
      <div class="student-meta"><strong>${safe(student.name)}</strong><span class="belt">${beltMark(student.slug)}${safe(student.belt)}</span><small>${safe(student.parent)} · ${safe(student.plan)} · ${safe(student.payment)}</small><div class="progress-bar"><i style="width:${readinessScore(student)}%"></i></div></div>
      <div class="student-kpis"><span class="pill">${student.attendance.attended}/15 lessons</span><span class="pill">${readinessScore(student)}% ready</span></div>
    </article>`).join("");
}

function renderClasses() {
  const days = Object.keys(timetable);
  qs("classList").innerHTML = `<div class="mock-timetable">${days.map(day => `<section class="time-day"><h3>${day}</h3>${timetable[day].map(item => `<article class="lesson-chip ${item.type}"><strong>${item.title}</strong><span>${item.time}</span></article>`).join("")}</section>`).join("")}</div><div class="timetable-note"><strong>Class rules:</strong> Little Dragon: 3-5 years old. Kid: 6-10 years old. Teens & Adults: above 11 years old. Sparring lesson is only for students above blue belt.</div>`;
}

function renderReadiness() {
  const s = students[0];
  const checks = [["Poomsae", s.poomsae, 3], ["Kicks", s.techniques, 5], ["Stances", s.stances, 5], ["Attendance", s.attendance.attended, 15]];
  qs("readinessPanel").innerHTML = `<article class="profile-progress"><div class="belt-line">${beltProgression.slice(0, 6).map(b => `<span>${beltMark(b.slug)}<small>${safe(b.name.split(" ")[0])}</small></span>`).join("")}</div><h3>${safe(s.belt)} Requirements</h3>${checks.map(([label, value, max]) => `<div class="requirement-row"><span>${label}</span><div class="progress-bar"><i style="width:${Math.min(100, value / max * 100)}%"></i></div><strong>${Math.min(value, max)} / ${max}</strong></div>`).join("")}<p>${s.attendance.remaining} lessons remaining to be eligible for promotion test.</p><span class="status ${isReady(s) ? "green" : "blue"}">${isReady(s) ? "Promotion ready" : "Almost ready"}</span></article>`;
}

function renderPayments() {
  const total = invoices.reduce((sum, i) => sum + i.amount, 0);
  const paid = invoices.filter(i => i.status === "Paid").reduce((sum, i) => sum + i.amount, 0);
  const pending = total - paid;
  qs("paymentLegend").innerHTML = `<div class="payment-summary"><div><span>Total Invoices</span><strong>${rwf(total)}</strong></div><div><span>Paid</span><strong>${rwf(paid)}</strong></div><div><span>Pending</span><strong>${rwf(pending)}</strong></div><button type="button">View All Invoices</button></div>`;
}

function renderPoomsae() {
  qs("poomsaeList").innerHTML = poomsaeLibrary.map(item => `<article class="poomsae-card"><span class="belt">${beltMark(item.slug)}${safe(item.belt)}</span><strong>${safe(item.title)}</strong><p>${safe(item.focus)}</p><div class="progress-bar"><i style="width:${item.progress}%"></i></div><a class="video-link" href="https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + " taekwondo poomsae")}" target="_blank" rel="noreferrer">Video library</a></article>`).join("");
}

function renderBeltRoadmap() {
  qs("beltRoadmap").innerHTML = beltProgression.map(b => `<article class="belt-step">${beltMark(b.slug)}<strong>${safe(b.name)}</strong><small>${safe(b.poomsae)}</small></article>`).join("");
}

function renderPhone() {
  const s = students[0];
  const phoneCard = qs("phoneChildCard");
  if (phoneCard) phoneCard.innerHTML = `<div class="student-photo">${safe(s.initials)}</div><div><strong>${safe(s.name)}</strong><span class="belt">${beltMark(s.slug)}${safe(s.belt)}</span><small>Age ${s.age} · ${safe(s.plan)}</small></div>`;
  const phoneClasses = qs("phoneClasses");
  if (phoneClasses) phoneClasses.innerHTML = `<div class="phone-mini-card"><strong>Next: Tuesday Kid Lesson</strong><span>16:00-16:55</span></div><div class="phone-mini-card"><strong>Saturday Kid Lesson</strong><span>09:00-09:55</span></div>`;
  const phonePayments = qs("phonePayments");
  if (phonePayments) phonePayments.innerHTML = `<div class="phone-mini-card"><strong>May 2026 Monthly Fee</strong><span>${rwf(s.monthlyFee)} · ${safe(s.payment)}</span></div>`;
}

function renderEvents() {
  const node = qs("eventList");
  if (!node) return;
  node.innerHTML = `<article class="event-item"><div class="date-badge"><span>MAY</span><strong>31</strong></div><div><strong>Promotion Test</strong><span>Minimum 15 lessons required.</span></div></article><article class="event-item"><div class="date-badge"><span>JUN</span><strong>07</strong></div><div><strong>Poomsae Workshop</strong><span>Technique and forms review.</span></div></article>`;
}

function setupControls() {
  const html = document.documentElement;
  let scale = 1;
  qs("themeToggle")?.addEventListener("click", () => { const dark = html.dataset.theme !== "dark"; html.dataset.theme = dark ? "dark" : "light"; qs("themeToggle").setAttribute("aria-pressed", String(dark)); });
  qs("phoneTheme")?.addEventListener("click", () => qs("themeToggle").click());
  qs("increaseText")?.addEventListener("click", () => { scale = Math.min(1.35, scale + 0.1); html.style.setProperty("--font-scale", scale); });
  qs("decreaseText")?.addEventListener("click", () => { scale = Math.max(0.9, scale - 0.1); html.style.setProperty("--font-scale", scale); });
  qs("resetText")?.addEventListener("click", () => { scale = 1; html.style.setProperty("--font-scale", scale); });
  qs("phoneText")?.addEventListener("click", () => qs("increaseText").click());
  qs("highContrast")?.addEventListener("click", () => html.classList.toggle("high-contrast"));
  window.addEventListener("resize", detectDevice, { passive: true });
}

function init() {
  detectDevice();
  renderStats();
  renderStudents();
  renderClasses();
  renderPayments();
  renderPoomsae();
  renderBeltRoadmap();
  renderReadiness();
  renderEvents();
  renderPhone();
  setupControls();
}

document.addEventListener("DOMContentLoaded", init);
