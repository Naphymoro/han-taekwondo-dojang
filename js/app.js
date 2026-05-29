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
  { name: "Minho Park", initials: "MP", age: 8, belt: "Yellow Belt", slug: "yellow", parent: "Mrs. Jiwon Park", plan: "2 lessons / week", attendance: { attended: 7, remaining: 8, rate: 87 }, poomsae: 67, techniques: 80, stances: 80, instructorApproved: false, feesPaid: false, joined: "Jan 10, 2026", payment: "Overdue", monthlyFee: 40000 },
  { name: "Niyonsaba Aline", initials: "NA", age: 11, belt: "Green Stripe", slug: "green-stripe", parent: "Aline Family", plan: "3 lessons / week", attendance: { attended: 18, remaining: 0, rate: 96 }, poomsae: 88, techniques: 90, stances: 92, instructorApproved: true, feesPaid: true, joined: "Nov 03, 2025", payment: "Paid", monthlyFee: 55000 },
  { name: "Umutoni Diane", initials: "UD", age: 10, belt: "Blue Stripe", slug: "blue-stripe", parent: "Umutoni Family", plan: "2 lessons / week", attendance: { attended: 16, remaining: 0, rate: 95 }, poomsae: 84, techniques: 86, stances: 82, instructorApproved: true, feesPaid: true, joined: "Sep 21, 2025", payment: "Paid", monthlyFee: 40000 },
  { name: "Hakizimana Eric", initials: "HE", age: 13, belt: "Blue Belt", slug: "blue", parent: "Hakizimana Family", plan: "3 lessons / week", attendance: { attended: 15, remaining: 0, rate: 94 }, poomsae: 81, techniques: 85, stances: 80, instructorApproved: true, feesPaid: false, joined: "Aug 09, 2025", payment: "Promotion fee due", monthlyFee: 55000 }
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

const invoices = [
  { description: "May 2026 Monthly Fee", due: "May 15, 2026", amount: 40000, status: "Overdue" },
  { description: "June 2026 Monthly Fee", due: "Jun 15, 2026", amount: 40000, status: "Pending" },
  { description: "Promotion Test Fee", due: "May 31, 2026", amount: 50000, status: "Pending" },
  { description: "Uniform Dobok", due: "Apr 20, 2026", amount: 30000, status: "Paid" }
];

const heroCopy = {
  dashboard: ["Dojang operations dashboard", "Live academy overview for classes, payments, attendance, and promotions.", "Track the entire academy from one command center."],
  students: ["Student management", "Profiles, guardians, belt passport, attendance, and payment context.", "Move from basic records to a full student lifecycle view."],
  classes: ["Classes & weekly schedule", "Real Han Taekwondo Korea timetable with role-aware class visibility.", "This view mirrors the timetable you provided and adapts for phone, tablet, and desktop."],
  payments: ["Payments & invoices", "MTN MoMo-ready billing for monthly fees, uniforms, and promotion tests.", "Parent reminders and invoice states are modeled in RWF."],
  poomsae: ["Progress & belts", "Belt progression, poomsae library, and digital passport pathways.", "Promotion logic uses lessons, techniques, poomsae, approval, and fee status."],
  attendance: ["Attendance readiness", "Lesson counters and promotion eligibility based on the 15-lesson rule.", "Instructors see who is ready and who needs more classes."],
  reports: ["Reports & alerts", "Overdue payments, test fee reminders, and upcoming grading events.", "A compact operations feed for academy leadership."],
  settings: ["Accessibility settings", "Light, dark, high contrast, and adjustable text size controls.", "The shell detects device size and switches layout behavior."],
};

const qs = id => document.getElementById(id);
const rwf = value => "RWF " + new Intl.NumberFormat("en-RW").format(value);
const safe = value => String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
const beltMark = slug => `<span class="belt-mark belt-${safe(slug)}"></span>`;
const readinessScore = s => Math.round(((Math.min(s.attendance.attended, 15) / 15) * 25) + (s.poomsae * .2) + (s.techniques * .2) + (s.stances * .15) + (s.instructorApproved ? 10 : 0) + (s.feesPaid ? 10 : 0));
const isReady = s => s.attendance.attended >= 15 && s.poomsae >= 75 && s.techniques >= 75 && s.stances >= 75 && s.instructorApproved && s.feesPaid;

function detectDevice() {
  const width = window.innerWidth;
  const html = document.documentElement;
  html.classList.toggle("device-phone", width < 720);
  html.classList.toggle("device-tablet", width >= 720 && width < 1180);
  html.classList.toggle("device-desktop", width >= 1180);
  html.dataset.device = width < 720 ? "phone" : width < 1180 ? "tablet" : "desktop";
}

function setHero(section) {
  const copy = heroCopy[section] || heroCopy.dashboard;
  const header = document.querySelector(".top-header");
  if (!header) return;
  const eyebrow = header.querySelector(".eyebrow");
  const title = header.querySelector("h1");
  const text = header.querySelector("p:not(.eyebrow)");
  if (eyebrow) eyebrow.textContent = copy[0];
  if (title) title.textContent = copy[1];
  if (text) text.textContent = copy[2];
  header.dataset.section = section;
}

function attachNavigation() {
  document.querySelectorAll(".main-nav a").forEach(link => {
    const section = (link.getAttribute("href") || "#dashboard").replace("#", "");
    link.dataset.section = section;
    link.addEventListener("click", event => {
      event.preventDefault();
      document.querySelectorAll(".main-nav a").forEach(item => {
        item.classList.remove("active");
        item.removeAttribute("aria-current");
      });
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
      setHero(section);
      showWorkspace(section);
      const main = qs("main") || document.querySelector("main");
      document.querySelector(".main-content")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderStats() {
  const ready = students.filter(isReady).length;
  const due = invoices.filter(i => i.status !== "Paid").reduce((sum, i) => sum + i.amount, 0);
  const attendance = Math.round(students.reduce((sum, s) => sum + s.attendance.rate, 0) / students.length);
  qs("totalStudents").textContent = "128";
  qs("attendanceRate").textContent = `${attendance}%`;
  qs("paymentsDue").textContent = rwf(due);
  qs("promotionsReady").textContent = ready;
  if (qs("donutTotal")) qs("donutTotal").textContent = "128";
}

function timetableHtml() {
  const days = Object.keys(timetable);
  return `<div class="mock-timetable">${days.map(day => `<section class="time-day"><h3>${day}</h3>${timetable[day].map(item => `<article class="lesson-chip ${item.type}"><strong>${item.title}</strong><span>${item.time}</span></article>`).join("")}</section>`).join("")}</div><div class="timetable-note"><strong>Class rules:</strong> Little Dragon: 3-5 years old. Kid: 6-10 years old. Teens & Adults: above 11 years old. Sparring is only for students above blue belt. Please notify the dojang before schedule changes.</div>`;
}

function studentRowsHtml() {
  return students.map(student => `<article class="student-row"><div class="student-photo">${safe(student.initials)}</div><div class="student-meta"><strong>${safe(student.name)}</strong><span class="belt">${beltMark(student.slug)}${safe(student.belt)}</span><small>${safe(student.parent)} · ${safe(student.plan)} · ${safe(student.payment)}</small><div class="progress-bar"><i style="width:${readinessScore(student)}%"></i></div></div><div class="student-kpis"><span class="pill">${student.attendance.attended}/15 lessons</span><span class="pill">${readinessScore(student)}% ready</span></div></article>`).join("");
}

function readinessHtml() {
  const s = students[0];
  const checks = [["Poomsae", 2, 3], ["Kicks", 4, 5], ["Stances", 4, 5], ["Attendance", s.attendance.attended, 15], ["Instructor Approval", s.instructorApproved ? 1 : 0, 1]];
  return `<article class="profile-progress"><div class="belt-line">${beltProgression.slice(0, 6).map(b => `<span>${beltMark(b.slug)}<small>${safe(b.name.split(" ")[0])}</small></span>`).join("")}</div><h3>${safe(s.name)} · ${safe(s.belt)} requirements</h3>${checks.map(([label, value, max]) => `<div class="requirement-row"><span>${safe(label)}</span><div class="progress-bar"><i style="width:${Math.min(100, value / max * 100)}%"></i></div><strong>${value} / ${max}</strong></div>`).join("")}<p>${s.attendance.remaining} lessons remaining to be eligible for promotion test.</p></article>`;
}

function paymentsHtml() {
  const rows = invoices.map(i => `<tr><td>${safe(i.description)}</td><td>${safe(i.due)}</td><td>${rwf(i.amount)}</td><td><span class="status ${i.status === "Paid" ? "green" : i.status === "Overdue" ? "red" : "blue"}">${safe(i.status)}</span></td></tr>`).join("");
  return `<div class="invoice-wrap"><table><thead><tr><th>Description</th><th>Due</th><th>Amount</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div><div class="momo-box"><strong>Total outstanding</strong><span>${rwf(invoices.filter(i => i.status !== "Paid").reduce((s, i) => s + i.amount, 0))}</span><button type="button">Pay with MTN MoMo</button></div>`;
}

function poomsaeHtml() {
  return `<div class="belt-roadmap">${beltProgression.map(b => `<article class="belt-step">${beltMark(b.slug)}<strong>${safe(b.name)}</strong><small>${safe(b.poomsae)}</small></article>`).join("")}</div><div class="poomsae-list">${beltProgression.map((b, index) => `<article class="poomsae-card"><span class="belt">${beltMark(b.slug)}${safe(b.name)}</span><strong>${safe(b.poomsae)}</strong><p>Curriculum checkpoint ${index + 1}: poomsae, kicks, stances, blocks, discipline, and instructor approval.</p><div class="progress-bar"><i style="width:${Math.max(12, 92 - index * 7)}%"></i></div></article>`).join("")}</div>`;
}

function reportsHtml() {
  return `<div class="alert-list"><article class="alert-card red"><strong>7 payments are overdue</strong><span>Total: RWF 180,000</span></article><article class="alert-card gold"><strong>Promotion test fees due</strong><span>5 students</span></article><article class="alert-card blue"><strong>Monthly fees due in 7 days</strong><span>12 invoices</span></article></div><div class="event-list"><article class="event-item"><div class="date-badge"><span>MAY</span><strong>31</strong></div><div><strong>Promotion Test</strong><span>Minimum 15 lessons required.</span></div></article><article class="event-item"><div class="date-badge"><span>JUN</span><strong>07</strong></div><div><strong>Poomsae Workshop</strong><span>Technique and forms review.</span></div></article></div>`;
}

function buildWorkspace() {
  const contentGrid = document.querySelector(".content-grid");
  if (!contentGrid || qs("workspaceTabs")) return;
  const workspace = document.createElement("section");
  workspace.id = "workspaceTabs";
  workspace.className = "workspace-tabs";
  workspace.innerHTML = `<div class="tab-bar" role="tablist" aria-label="Digital dojang sections">${Object.keys(heroCopy).map((key, index) => `<button type="button" role="tab" data-tab="${key}" aria-selected="${index === 0}">${heroCopy[key][0].replace("Dojang operations ", "")}</button>`).join("")}</div><div id="workspacePanel" class="workspace-panel"></div>`;
  contentGrid.parentNode.insertBefore(workspace, contentGrid);
  workspace.querySelectorAll("button[data-tab]").forEach(button => button.addEventListener("click", () => showWorkspace(button.dataset.tab)));
}

function showWorkspace(section = "dashboard") {
  const panel = qs("workspacePanel");
  if (!panel) return;
  document.querySelectorAll(".tab-bar button").forEach(button => button.setAttribute("aria-selected", String(button.dataset.tab === section)));
  setHero(section);
  const map = {
    dashboard: `<div class="workspace-grid dashboard-view"><article class="panel full-width"><div class="panel-header"><div><p class="eyebrow">Primary timetable</p><h2>Han Taekwondo Korea Lesson Schedule</h2></div></div>${timetableHtml()}</article><article class="panel"><h2>Attendance Overview</h2><div class="donut"><div><strong>87%</strong><span>Average</span></div></div></article><article class="panel"><h2>Payment Summary</h2>${paymentsHtml()}</article></div>`,
    students: `<div class="workspace-grid"><article class="panel full-width"><h2>Student Profiles</h2><div class="student-list">${studentRowsHtml()}</div></article></div>`,
    classes: `<article class="panel full-width"><div class="panel-header"><div><p class="eyebrow">Timetable from approved brief</p><h2>Lesson Schedule</h2></div></div>${timetableHtml()}</article>`,
    payments: `<article class="panel full-width"><div class="panel-header"><div><p class="eyebrow">Invoices and MTN MoMo</p><h2>Payments & Invoices</h2></div></div>${paymentsHtml()}</article>`,
    poomsae: `<article class="panel full-width"><div class="panel-header"><div><p class="eyebrow">Digital belt passport</p><h2>Progress & Belts</h2></div></div>${poomsaeHtml()}</article>`,
    attendance: `<article class="panel full-width"><div class="panel-header"><div><p class="eyebrow">15 lesson rule</p><h2>Promotion Readiness</h2></div></div>${readinessHtml()}</article>`,
    reports: `<article class="panel full-width"><div class="panel-header"><div><p class="eyebrow">Alerts and events</p><h2>Reports</h2></div></div>${reportsHtml()}</article>`,
    settings: `<article class="panel full-width"><h2>Responsive and accessibility controls</h2><p>The app now detects phone, tablet, and desktop with <strong>data-device</strong> on the HTML element. Use the controls above for dark mode, high contrast, and text size.</p></article>`
  };
  panel.innerHTML = map[section] || map.dashboard;
}

function renderExistingSections() {
  if (qs("studentList")) qs("studentList").innerHTML = studentRowsHtml();
  if (qs("classList")) qs("classList").innerHTML = timetableHtml();
  if (qs("readinessPanel")) qs("readinessPanel").innerHTML = readinessHtml();
  if (qs("paymentLegend")) qs("paymentLegend").innerHTML = `<div class="payment-summary"><strong>Outstanding</strong><span>${rwf(invoices.filter(i => i.status !== "Paid").reduce((s, i) => s + i.amount, 0))}</span><button type="button">View invoices</button></div>`;
  if (qs("poomsaeList")) qs("poomsaeList").innerHTML = beltProgression.map(b => `<article class="poomsae-card"><span class="belt">${beltMark(b.slug)}${safe(b.name)}</span><strong>${safe(b.poomsae)}</strong><p>Required poomsae and progress checkpoint.</p></article>`).join("");
  if (qs("beltRoadmap")) qs("beltRoadmap").innerHTML = beltProgression.map(b => `<article class="belt-step">${beltMark(b.slug)}<strong>${safe(b.name)}</strong><small>${safe(b.poomsae)}</small></article>`).join("");
  if (qs("eventList")) qs("eventList").innerHTML = reportsHtml();
  if (qs("phoneChildCard")) qs("phoneChildCard").innerHTML = `<div class="student-photo">MP</div><div><strong>Minho Park</strong><span class="belt">${beltMark("yellow")}Yellow Belt</span><small>7 / 15 lessons · 8 remaining</small></div>`;
  if (qs("phoneClasses")) qs("phoneClasses").innerHTML = `<div class="phone-mini-card"><strong>Tuesday Kid Lesson</strong><span>16:00-16:55</span></div><div class="phone-mini-card"><strong>Saturday Kid Lesson</strong><span>09:00-09:55</span></div>`;
  if (qs("phonePayments")) qs("phonePayments").innerHTML = `<div class="phone-mini-card"><strong>May Monthly Fee</strong><span>RWF 40,000 · Overdue</span></div>`;
}

function setupControls() {
  const html = document.documentElement;
  let scale = 1;
  qs("themeToggle")?.addEventListener("click", () => { const dark = html.dataset.theme !== "dark"; html.dataset.theme = dark ? "dark" : "light"; qs("themeToggle").setAttribute("aria-pressed", String(dark)); });
  qs("phoneTheme")?.addEventListener("click", () => qs("themeToggle").click());
  qs("increaseText")?.addEventListener("click", () => { scale = Math.min(1.35, scale + 0.1); html.style.setProperty("--font-scale", scale); });
  qs("decreaseText")?.addEventListener("click", () => { scale = Math.max(0.9, scale - 0.1); html.style.setProperty("--font-scale", scale); });
  qs("resetText")?.addEventListener("click", () => { scale = 1; html.style.setProperty("--font-scale", scale); });
  qs("phoneText")?.addEventListener("click", () => qs("increaseText")?.click());
  qs("highContrast")?.addEventListener("click", () => html.classList.toggle("high-contrast"));
  window.addEventListener("resize", detectDevice, { passive: true });
}

function init() {
  detectDevice();
  renderStats();
  buildWorkspace();
  renderExistingSections();
  attachNavigation();
  showWorkspace("dashboard");
  setupControls();
}

document.addEventListener("DOMContentLoaded", init);
