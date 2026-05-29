const views = {
  dashboard: {
    kicker: "Dojang pulse",
    title: "Today’s academy command center",
    text: "Live classes, attendance, payments, and promotion readiness presented as a premium sports-tech dashboard.",
    cta: "View weekly schedule"
  },
  students: {
    kicker: "Athlete development",
    title: "Every student has a journey",
    text: "Profiles combine guardians, subscription plans, lesson counts, belt passport, and readiness progress.",
    cta: "Review students"
  },
  classes: {
    kicker: "Training command center",
    title: "Weekly schedule, redesigned",
    text: "The timetable is now a visual training calendar with color-coded classes, age rules, and belt eligibility.",
    cta: "Open schedule"
  },
  attendance: {
    kicker: "15 lesson rule",
    title: "Attendance becomes promotion intelligence",
    text: "Track lessons attended, lessons remaining, and class consistency before grading tests.",
    cta: "Check readiness"
  },
  progress: {
    kicker: "Belt advancement",
    title: "Progression is the product language",
    text: "Belts, poomsae, techniques, instructor approval, and payment status combine into a readiness engine.",
    cta: "View belt passport"
  },
  payments: {
    kicker: "MTN MoMo billing",
    title: "Payments that feel like Stripe, not accounting software",
    text: "Monthly fees, uniforms, and promotion testing are organized into parent-friendly invoices in RWF.",
    cta: "Review invoices"
  },
  reports: {
    kicker: "Operations intelligence",
    title: "Alerts before problems become admin work",
    text: "See overdue payments, promotion fee reminders, class capacity, and upcoming academy events.",
    cta: "View reports"
  },
  settings: {
    kicker: "Accessibility and device fit",
    title: "Desktop, tablet, and phone each get a designed experience",
    text: "The app detects device width, supports light, dark, high contrast, and adjustable text size.",
    cta: "Adjust display"
  }
};

const metrics = [
  ["128", "Total students", "6 joined this month", "icon-students"],
  ["87%", "Attendance today", "74 expected students", "icon-check"],
  ["12", "Promotion ready", "15 lesson rule applied", "icon-belt"],
  ["RWF 180k", "Pending payments", "MoMo reminders due", "icon-payments"]
];

const students = [
  ["MP", "Minho Park", "Yellow Belt", "belt-yellow", "Mrs. Jiwon Park", "2 lessons / week", 67, "8 lessons left", "blue"],
  ["NA", "Niyonsaba Aline", "Green Stripe", "belt-green-stripe", "Aline Family", "3 lessons / week", 92, "Ready", "green"],
  ["UD", "Umutoni Diane", "Blue Stripe", "belt-blue-stripe", "Umutoni Family", "2 lessons / week", 88, "Ready", "green"],
  ["HE", "Hakizimana Eric", "Blue Belt", "belt-blue", "Hakizimana Family", "3 lessons / week", 82, "Fee due", "red"]
];

const schedule = {
  Monday: [
    ["13:00-14:00", "Women’s Lesson", "women", "Women focused training"],
    ["17:00-17:55", "Kid Lesson", "kid", "Ages 6-10"],
    ["18:00-18:55", "Teen & Adults", "teen", "Above 11 years"],
    ["19:00-19:55", "Teen & Adults", "teen", "Above 11 years"]
  ],
  Tuesday: [
    ["16:00-16:55", "Kid Lesson", "kid", "Ages 6-10"],
    ["17:00-17:40", "Little Dragon", "dragon", "Ages 3-5"],
    ["18:00-18:55", "Kid Lesson", "kid", "Ages 6-10"],
    ["19:00-19:55", "Sparring Lesson", "sparring", "Blue belt and above"]
  ],
  Thursday: [
    ["17:00-17:55", "Kid Lesson", "kid", "Ages 6-10"],
    ["18:00-18:55", "Teen & Adults", "teen", "Above 11 years"]
  ],
  Friday: [
    ["14:00-14:55", "Sparring Lesson", "sparring", "Blue belt and above"],
    ["15:00-15:40", "Little Dragon", "dragon", "Ages 3-5"],
    ["16:00-16:55", "Kid Lesson", "kid", "Ages 6-10"],
    ["17:00-17:40", "Little Dragon", "dragon", "Ages 3-5"],
    ["18:00-18:55", "Kid Lesson", "kid", "Ages 6-10"],
    ["19:00-19:55", "Sparring Lesson", "sparring", "Blue belt and above"]
  ],
  Saturday: [
    ["09:00-09:55", "Kid Lesson", "kid", "Ages 6-10"],
    ["10:00-10:40", "Little Dragon", "dragon", "Ages 3-5"],
    ["11:00-11:55", "Kid Lesson", "kid", "Ages 6-10"],
    ["12:00-12:55", "Teen & Adults", "teen", "Above 11 years"]
  ]
};

const belts = [
  ["White Belt", "belt-white", "Kibon Joonbi"],
  ["Yellow Stripe", "belt-yellow", "Kibon Poomsae"],
  ["Yellow Belt", "belt-yellow", "Taegeuk 1 Jang"],
  ["Green Stripe", "belt-green-stripe", "Taegeuk 2 Jang"],
  ["Green Belt", "belt-green-stripe", "Taegeuk 3 Jang"],
  ["Blue Stripe", "belt-blue-stripe", "Taegeuk 4 Jang"],
  ["Blue Belt", "belt-blue", "Taegeuk 5 Jang"],
  ["Red Belt", "belt-red", "Taegeuk 7 Jang"],
  ["Black Belt", "belt-black", "Koryo"]
];

const invoices = [
  ["May 2026 Monthly Fee", "May 15", "RWF 40,000", "Overdue", "red"],
  ["June 2026 Monthly Fee", "Jun 15", "RWF 40,000", "Pending", "gold"],
  ["Promotion Test Fee", "May 31", "RWF 50,000", "Pending", "gold"],
  ["Uniform Dobok", "Apr 20", "RWF 30,000", "Paid", "green"]
];

let currentView = "dashboard";
let fontScale = 1;

const icon = id => `<svg><use href="#${id}"></use></svg>`;
const beltMark = cls => `<span class="belt-mark ${cls}"></span>`;

function setDeviceClass() {
  const width = window.innerWidth;
  const html = document.documentElement;
  html.dataset.device = width < 760 ? "phone" : width < 1180 ? "tablet" : "desktop";
}

function renderNav() {
  document.querySelectorAll("[data-view]").forEach(button => {
    button.classList.toggle("active", button.dataset.view === currentView);
    button.setAttribute("aria-current", button.dataset.view === currentView ? "true" : "false");
    button.onclick = () => {
      currentView = button.dataset.view;
      render();
      document.getElementById("main").scrollIntoView({ behavior: "smooth", block: "start" });
    };
  });
}

function renderHero() {
  const view = views[currentView];
  document.getElementById("hero").innerHTML = `
    <span class="hero-kicker">${view.kicker}</span>
    <h1>${view.title}</h1>
    <p>${view.text}</p>
    <div class="hero-actions">
      <button class="pill-btn" data-next="${currentView === "classes" ? "students" : "classes"}">${view.cta}</button>
      <button class="pill-btn light" id="themeToggle">Light / Dark</button>
      <button class="pill-btn light" id="contrastToggle">High contrast</button>
    </div>
  `;

  document.querySelector("[data-next]")?.addEventListener("click", event => {
    currentView = event.currentTarget.dataset.next;
    render();
  });

  document.getElementById("themeToggle").onclick = () => {
    const html = document.documentElement;
    html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
  };

  document.getElementById("contrastToggle").onclick = () => {
    document.documentElement.classList.toggle("high-contrast");
  };
}

function renderMetrics() {
  document.getElementById("metrics").innerHTML = metrics.map(([value, label, note, iconId]) => `
    <article class="metric-card">
      <div class="metric-icon">${icon(iconId)}</div>
      <div>
        <span>${label}</span>
        <strong>${value}</strong>
        <small>${note}</small>
      </div>
    </article>
  `).join("");
}

function calendarHTML() {
  const legend = [
    ["women", "Women’s"],
    ["kid", "Kid"],
    ["dragon", "Little Dragon"],
    ["teen", "Teen & Adults"],
    ["sparring", "Sparring"]
  ].map(([type, label]) => `<span class="legend-pill ${type}"><i></i>${label}</span>`).join("");

  return `
    <article class="panel">
      <h2>Han Taekwondo Korea weekly schedule</h2>
      <p class="panel-subtitle">A premium training calendar based on the timetable brief. Classes are color-coded by type and eligibility.</p>
      <div class="calendar-board">
        ${Object.entries(schedule).map(([day, lessons]) => `
          <section class="day-column">
            <h3>${day}</h3>
            ${lessons.map(([time, title, type, rule]) => `
              <article class="lesson-card ${type}">
                <strong>${title}</strong>
                <span>${time}</span>
                <small>${rule}</small>
              </article>
            `).join("")}
          </section>
        `).join("")}
      </div>
      <div class="legend-row">${legend}</div>
    </article>
  `;
}

function studentsHTML() {
  return `
    <article class="panel">
      <h2>Student command center</h2>
      <p class="panel-subtitle">Profiles show parent, plan, belt, and promotion readiness in one scan.</p>
      <div class="student-grid">
        ${students.map(([initials, name, belt, beltClass, parent, plan, progress, status, statusColor]) => `
          <article class="student-card">
            <div class="avatar-dot">${initials}</div>
            <div>
              <strong>${name}</strong>
              <span class="belt-tag">${beltMark(beltClass)}${belt}</span>
              <small>${parent} · ${plan}</small>
              <div class="progress"><i style="width:${progress}%"></i></div>
            </div>
            <span class="status ${statusColor}">${status}</span>
          </article>
        `).join("")}
      </div>
    </article>
  `;
}

function progressHTML() {
  return `
    <article class="panel">
      <h2>Digital belt passport</h2>
      <p class="panel-subtitle">Belt progression becomes the core visual language of the platform.</p>
      <div class="belt-road">
        ${belts.map(([name, cls, poomsae]) => `
          <article class="belt-step">
            ${beltMark(cls)}
            <strong>${name}</strong>
            <small>${poomsae}</small>
          </article>
        `).join("")}
      </div>
      <h2>Promotion readiness</h2>
      <div class="student-grid">
        <article class="student-card">
          <div class="avatar-dot">MP</div>
          <div>
            <strong>Minho Park · Yellow Belt</strong>
            <small>Lessons 7 / 15 · Poomsae 2 / 3 · Kicks 4 / 5 · Stances 4 / 5</small>
            <div class="progress"><i style="width:67%"></i></div>
          </div>
          <span class="status blue">8 lessons left</span>
        </article>
      </div>
    </article>
  `;
}

function paymentsHTML() {
  return `
    <article class="panel">
      <h2>Payments and invoices</h2>
      <p class="panel-subtitle">A Stripe-inspired billing view for MTN MoMo, monthly fees, uniforms, and grading tests.</p>
      <table class="invoice-table">
        <thead><tr><th>Description</th><th>Due</th><th>Amount</th><th>Status</th></tr></thead>
        <tbody>
          ${invoices.map(([description, due, amount, status, color]) => `
            <tr><td>${description}</td><td>${due}</td><td>${amount}</td><td><span class="status ${color}">${status}</span></td></tr>
          `).join("")}
        </tbody>
      </table>
    </article>
  `;
}

function dashboardHTML() {
  return `
    <div class="screen-grid">
      ${calendarHTML()}
      <div class="side-stack">
        <article class="panel">
          <h2>Attendance pulse</h2>
          <div class="ring"><div><strong>87%</strong><span>today</span></div></div>
          <p class="panel-subtitle">74 expected students. 12 promotion-ready candidates.</p>
        </article>
        <article class="panel">
          <h2>Alerts</h2>
          <div class="student-grid">
            <article class="student-card"><div class="avatar-dot">!</div><div><strong>7 overdue payments</strong><small>RWF 180,000 pending</small></div><span class="status red">Action</span></article>
            <article class="student-card"><div class="avatar-dot">★</div><div><strong>Promotion test fees</strong><small>5 students need reminders</small></div><span class="status gold">Due</span></article>
          </div>
        </article>
      </div>
    </div>
  `;
}

function reportsHTML() {
  return `
    <div class="screen-grid">
      <article class="panel">
        <h2>Operations intelligence</h2>
        <div class="student-grid">
          <article class="student-card"><div class="avatar-dot">7</div><div><strong>Overdue payments</strong><small>Send MoMo reminders today</small></div><span class="status red">Urgent</span></article>
          <article class="student-card"><div class="avatar-dot">12</div><div><strong>Promotion-ready students</strong><small>Prepare grading list</small></div><span class="status green">Ready</span></article>
          <article class="student-card"><div class="avatar-dot">5</div><div><strong>High-capacity classes</strong><small>Kid lessons nearing capacity</small></div><span class="status gold">Watch</span></article>
        </div>
      </article>
      <article class="panel">
        <h2>Upcoming events</h2>
        <div class="student-grid">
          <article class="student-card"><div class="avatar-dot">31</div><div><strong>Promotion Test</strong><small>May 31 · 15 lessons required</small></div></article>
          <article class="student-card"><div class="avatar-dot">07</div><div><strong>Poomsae Workshop</strong><small>June 7 · Technique review</small></div></article>
        </div>
      </article>
    </div>
  `;
}

function settingsHTML() {
  return `
    <article class="panel">
      <h2>Display and accessibility</h2>
      <p class="panel-subtitle">The app detects desktop, tablet, and phone. Try resizing the browser to see the layout reorganize.</p>
      <div class="access-row">
        <button id="increaseText">Increase text</button>
        <button id="decreaseText">Decrease text</button>
        <button id="resetText">Reset text</button>
      </div>
    </article>
  `;
}

function renderWorkspace() {
  const map = {
    dashboard: dashboardHTML,
    students: studentsHTML,
    classes: calendarHTML,
    attendance: progressHTML,
    progress: progressHTML,
    payments: paymentsHTML,
    reports: reportsHTML,
    settings: settingsHTML
  };

  document.getElementById("workspace").innerHTML = map[currentView]();

  document.getElementById("increaseText")?.addEventListener("click", () => {
    fontScale = Math.min(1.35, fontScale + .1);
    document.documentElement.style.setProperty("--font-scale", fontScale);
  });

  document.getElementById("decreaseText")?.addEventListener("click", () => {
    fontScale = Math.max(.9, fontScale - .1);
    document.documentElement.style.setProperty("--font-scale", fontScale);
  });

  document.getElementById("resetText")?.addEventListener("click", () => {
    fontScale = 1;
    document.documentElement.style.setProperty("--font-scale", fontScale);
  });
}

function renderParentPanel() {
  document.getElementById("parentPanel").innerHTML = `
    <div class="phone-shell">
      <div class="phone-screen">
        <div class="phone-top"><span>9:41</span><span>LTE</span></div>
        <section class="child-hero">
          <span>Parent Portal</span>
          <h2>Minho Park</h2>
          <p>Yellow Belt · 8 lessons remaining before promotion eligibility.</p>
        </section>
        <article class="phone-card">
          <strong>Next class</strong>
          <span>Tuesday · Kid Lesson · 16:00-16:55</span>
        </article>
        <article class="phone-card">
          <strong>Payment due</strong>
          <span>May monthly fee · RWF 40,000 · MTN MoMo</span>
        </article>
        <article class="phone-card">
          <strong>Promotion countdown</strong>
          <span>7 / 15 lessons completed</span>
          <div class="progress"><i style="width:47%"></i></div>
        </article>
        <article class="phone-card">
          <strong>Belt passport</strong>
          <span class="belt-tag">${beltMark("belt-yellow")}Yellow Belt</span>
        </article>
      </div>
    </div>
  `;
}

function render() {
  setDeviceClass();
  renderHero();
  renderMetrics();
  renderWorkspace();
  renderParentPanel();
  renderNav();
}

window.addEventListener("resize", setDeviceClass, { passive: true });
document.addEventListener("DOMContentLoaded", render);
