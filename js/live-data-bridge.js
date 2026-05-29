(function () {
  var state = {
    connected: false,
    loading: true,
    error: '',
    dashboard: null,
    all: {
      students: [],
      parents: [],
      instructors: [],
      classes: [],
      attendance: [],
      payments: [],
      promotions: []
    }
  };

  function esc(value) {
    return String(value === undefined || value === null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function initials(name) {
    return String(name || 'HT')
      .split(' ')
      .filter(Boolean)
      .map(function (part) { return part.charAt(0); })
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  function money(value) {
    var amount = Number(value || 0);
    return 'RWF ' + amount.toLocaleString('en-US');
  }

  function statusClass(status) {
    var s = String(status || '').toLowerCase();
    if (s.indexOf('ready') >= 0 || s === 'paid' || s === 'present' || s === 'current') return 'green';
    if (s.indexOf('overdue') >= 0 || s === 'absent') return 'red';
    if (s.indexOf('pending') >= 0 || s.indexOf('almost') >= 0) return 'gold';
    return 'blue';
  }

  function findBy(list, key, value) {
    return (list || []).find(function (item) { return String(item[key]) === String(value); }) || {};
  }

  function setHeroStatus() {
    var hero = document.getElementById('hero');
    if (!hero) return;
    var badge = state.loading ? 'Connecting to Google Sheets...' : (state.connected ? 'Live Google Sheets connected' : 'Using local demo fallback');
    var detail = state.error ? esc(state.error) : 'Admin, Instructor, and Parent views now read from the academy data service when available.';
    hero.insertAdjacentHTML('beforeend', '<p style="margin-top:8px;font-weight:800;color:#0f766e">' + badge + '</p><p style="font-size:12px;color:#64748b">' + detail + '</p>');
  }

  function liveMetricsHTML() {
    var data = state.all || {};
    var students = data.students || [];
    var instructors = data.instructors || [];
    var payments = data.payments || [];
    var promotions = data.promotions || [];
    var attendance = data.attendance || [];
    var overdue = payments.filter(function (p) { return String(p.Status).toLowerCase() === 'overdue'; });
    var ready = promotions.filter(function (p) { return String(p.Status).toLowerCase() === 'ready'; });
    var present = attendance.filter(function (a) { return String(a.Status).toLowerCase() === 'present'; }).length;
    var attendancePct = attendance.length ? Math.round((present / attendance.length) * 100) + '%' : '0%';
    var pendingAmount = payments.filter(function (p) { return ['overdue', 'pending'].indexOf(String(p.Status).toLowerCase()) >= 0; }).reduce(function (sum, p) { return sum + Number(p.AmountRWF || 0); }, 0);

    var items = [
      [students.length, 'Live Students', state.connected ? 'From Google Sheet' : 'Fallback data', 'icon-students'],
      [attendancePct, 'Attendance Records', present + ' / ' + attendance.length + ' present', 'icon-check'],
      [ready.length, 'Ready for Promotion', promotions.length + ' tracked', 'icon-belt'],
      [money(pendingAmount), 'Pending Payments', overdue.length + ' overdue', 'icon-payments'],
      [instructors.length, 'Instructors', 'Assigned to classes', 'icon-report']
    ];

    return items.map(function (item) {
      return '<article class="metric-card"><div class="metric-icon">' + ic(item[3]) + '</div><div><span>' + esc(item[1]) + '</span><strong>' + esc(item[0]) + '</strong><small>' + esc(item[2]) + '</small></div></article>';
    }).join('');
  }

  function liveScheduleHTML() {
    var classes = state.all.classes || [];
    if (!classes.length && typeof scheduleHTML === 'function') return scheduleHTML();
    var groups = {};
    classes.forEach(function (cls) {
      var day = cls.Day || 'Unscheduled';
      if (!groups[day]) groups[day] = [];
      groups[day].push(cls);
    });
    var days = Object.keys(groups);
    var html = '<article class="panel"><h2>Live Class Schedule</h2><p class="panel-subtitle">Loaded from Classes sheet with instructor assignment and capacity.</p><div class="calendar-board">';
    days.forEach(function (day) {
      html += '<section class="day-column"><h3>' + esc(day) + '</h3>';
      groups[day].forEach(function (cls) {
        var instructor = findBy(state.all.instructors, 'InstructorID', cls.InstructorID);
        html += '<article class="lesson-card kid"><strong>' + esc(cls.ClassName) + '</strong><span>' + esc(cls.StartTime) + '-' + esc(cls.EndTime) + '</span><small>' + esc(instructor.DisplayName || cls.InstructorID) + ' · cap ' + esc(cls.Capacity) + '</small></article>';
      });
      html += '</section>';
    });
    return html + '</div></article>';
  }

  function liveAnalyticsHTML() {
    var payments = state.all.payments || [];
    var attendance = state.all.attendance || [];
    var paid = payments.filter(function (p) { return String(p.Status).toLowerCase() === 'paid'; }).reduce(function (sum, p) { return sum + Number(p.AmountRWF || 0); }, 0);
    var pending = payments.filter(function (p) { return ['pending', 'overdue'].indexOf(String(p.Status).toLowerCase()) >= 0; }).reduce(function (sum, p) { return sum + Number(p.AmountRWF || 0); }, 0);
    var overdue = payments.filter(function (p) { return String(p.Status).toLowerCase() === 'overdue'; }).reduce(function (sum, p) { return sum + Number(p.AmountRWF || 0); }, 0);
    var present = attendance.filter(function (a) { return String(a.Status).toLowerCase() === 'present'; }).length;
    var pct = attendance.length ? Math.round((present / attendance.length) * 100) : 0;
    return '<div class="side-stack"><article class="panel"><h2>Live Attendance</h2><div class="ring"><div><strong>' + pct + '%</strong><span>Present</span></div></div><p class="panel-subtitle">' + present + ' present · ' + attendance.length + ' records</p></article><article class="panel"><h2>Payment Summary</h2><div class="payment-summary"><div class="payment-row"><span>Paid</span><strong>' + money(paid) + '</strong></div><div class="payment-row"><span>Pending</span><strong>' + money(pending) + '</strong></div><div class="payment-row"><span>Overdue</span><strong>' + money(overdue) + '</strong></div></div></article><article class="panel"><h2>Recent Alerts</h2>' + payments.filter(function (p) { return String(p.Status).toLowerCase() !== 'paid'; }).map(function (p) { return '<div class="alert-item"><strong>' + esc(p.Status) + ': ' + esc(p.Type) + '</strong><br><span>' + esc(p.StudentID) + ' · ' + money(p.AmountRWF) + '</span></div>'; }).join('') + '</article></div>';
  }

  function liveStudentsHTML() {
    var students = state.all.students || [];
    return '<article class="panel"><h2>Live Student Management</h2><p class="panel-subtitle">Students loaded from Google Sheets.</p><div class="student-grid">' + students.map(function (student) {
      var parent = findBy(state.all.parents, 'ParentID', student.ParentID);
      var attended = Number(student.LessonsAttended || 0);
      var required = Number(student.LessonsRequired || 15);
      var pct = Math.min(100, Math.round((attended / required) * 100));
      return '<article class="student-card"><div class="avatar-dot">' + initials(student.DisplayName) + '</div><div><strong>' + esc(student.DisplayName) + '</strong><span class="belt-tag"><span class="belt-mark belt-yellow"></span>' + esc(student.Belt) + '</span><small>Parent: ' + esc(parent.DisplayName || student.ParentID) + ' · ' + attended + '/' + required + ' lessons</small><div class="progress"><i style="width:' + pct + '%"></i></div></div><span class="status ' + statusClass(student.PromotionStatus) + '">' + esc(student.PromotionStatus) + '</span></article>';
    }).join('') + '</div></article>';
  }

  function liveAttendanceHTML() {
    var attendance = state.all.attendance || [];
    return '<article class="panel"><h2>Live Attendance</h2><p class="panel-subtitle">Attendance records from Google Sheets.</p><table class="invoice-table"><tr><th>Date</th><th>Student</th><th>Class</th><th>Status</th><th>Notes</th></tr>' + attendance.map(function (row) {
      var student = findBy(state.all.students, 'StudentID', row.StudentID);
      var cls = findBy(state.all.classes, 'ClassID', row.ClassID);
      return '<tr><td>' + esc(row.Date) + '</td><td>' + esc(student.DisplayName || row.StudentID) + '</td><td>' + esc(cls.ClassName || row.ClassID) + '</td><td><span class="status ' + statusClass(row.Status) + '">' + esc(row.Status) + '</span></td><td>' + esc(row.Notes) + '</td></tr>';
    }).join('') + '</table></article>';
  }

  function livePaymentsHTML() {
    if (currentRole === 'Instructor') return '<article class="demo-lock"><strong>Instructor access:</strong> payments are hidden for this role.</article>';
    var payments = state.all.payments || [];
    return '<article class="panel"><h2>Live Payments & MTN MoMo</h2><table class="invoice-table"><tr><th>Student</th><th>Type</th><th>Amount</th><th>Status</th><th>Due</th></tr>' + payments.map(function (payment) {
      var student = findBy(state.all.students, 'StudentID', payment.StudentID);
      return '<tr><td>' + esc(student.DisplayName || payment.StudentID) + '</td><td>' + esc(payment.Type) + '</td><td>' + money(payment.AmountRWF) + '</td><td><span class="status ' + statusClass(payment.Status) + '">' + esc(payment.Status) + '</span></td><td>' + esc(payment.DueDate) + '</td></tr>';
    }).join('') + '</table></article>';
  }

  function liveProgressHTML() {
    var promotions = state.all.promotions || [];
    return '<article class="panel"><h2>Live Promotion Readiness</h2><p class="panel-subtitle">Promotion data loaded from Google Sheets.</p><div class="student-grid">' + promotions.map(function (promo) {
      var student = findBy(state.all.students, 'StudentID', promo.StudentID);
      var score = Number(promo.ReadinessScore || 0);
      return '<article class="student-card"><div class="avatar-dot">' + initials(student.DisplayName) + '</div><div><strong>' + esc(student.DisplayName || promo.StudentID) + '</strong><small>' + esc(promo.CurrentBelt) + ' to ' + esc(promo.NextBelt) + ' · test: ' + esc(promo.TestDate || 'Not scheduled') + '</small><div class="progress"><i style="width:' + Math.min(100, score) + '%"></i></div></div><span class="status ' + statusClass(promo.Status) + '">' + esc(promo.Status) + '</span></article>';
    }).join('') + '</div></article>';
  }

  function liveReportsHTML() {
    if (currentRole === 'Parent') return '<article class="demo-lock"><strong>Parent access:</strong> reports are not visible.</article>';
    return '<article class="panel"><h2>Live Reports</h2><div class="event-item"><strong>Students</strong><br><span>' + (state.all.students || []).length + ' active records</span></div><div class="event-item"><strong>Payments</strong><br><span>' + (state.all.payments || []).length + ' payment records</span></div><div class="event-item"><strong>Promotions</strong><br><span>' + (state.all.promotions || []).length + ' promotion records</span></div></article>';
  }

  function liveParentHTML() {
    var student = (state.all.students || [])[0] || {};
    var payment = (state.all.payments || []).find(function (p) { return String(p.StudentID) === String(student.StudentID); }) || {};
    var promo = (state.all.promotions || []).find(function (p) { return String(p.StudentID) === String(student.StudentID); }) || {};
    var score = Number(promo.ReadinessScore || 0);
    document.getElementById('parentPanel').innerHTML = '<div class="phone-shell"><div class="phone-screen"><div class="phone-top"><span>9:41</span><span>Live</span></div><strong>Parent Portal</strong><div class="child-switcher"><button class="child-thumb active"><span class="child-avatar">' + initials(student.DisplayName) + '</span>' + esc((student.FirstName || 'Child')) + '</button></div><section class="child-hero"><span>' + esc(student.Belt || 'Belt') + '</span><h2>' + esc(student.DisplayName || 'Student') + '</h2><p>' + esc(student.PromotionStatus || 'Progress tracked from Google Sheets') + '</p></section><article class="phone-card"><strong>Program</strong><span>' + esc(student.Program || '') + '</span></article><article class="phone-card"><strong>Payment</strong><span>' + esc(payment.Status || 'No payment') + ' · ' + money(payment.AmountRWF || 0) + '</span></article><article class="phone-card"><strong>Promotion readiness</strong><div class="progress"><i style="width:' + Math.min(100, score) + '%"></i></div></article><nav class="phone-bottom-nav"><span class="active">Home</span><span>Classes</span><span>Progress</span><span>Pay</span></nav></div></div>';
  }

  function installLiveRenderers() {
    if (!state.connected) return;
    window.renderMetrics = function () { document.getElementById('metrics').innerHTML = liveMetricsHTML(); };
    window.scheduleHTML = liveScheduleHTML;
    window.analyticsHTML = liveAnalyticsHTML;
    window.dashboardHTML = function () { return '<div class="screen-grid">' + liveScheduleHTML() + liveAnalyticsHTML() + '</div>'; };
    window.studentsHTML = liveStudentsHTML;
    window.attendanceHTML = liveAttendanceHTML;
    window.paymentsHTML = livePaymentsHTML;
    window.progressHTML = liveProgressHTML;
    window.reportsHTML = liveReportsHTML;
    window.renderParent = liveParentHTML;
  }

  function wireQuickActions() {
    var buttons = document.querySelectorAll('.quick-actions button');
    if (!buttons.length) return;
    buttons[0].onclick = function () { currentView = 'attendance'; render(); };
    buttons[1].onclick = function () { currentView = 'payments'; render(); };
    buttons[2].onclick = function () { currentView = 'progress'; render(); };
  }

  async function start() {
    if (!window.HanAcademyAPI) {
      state.loading = false;
      state.error = 'academy-api.js was not loaded';
      if (typeof render === 'function') render();
      setHeroStatus();
      return;
    }

    try {
      window.HanAcademyAPI.configure(window.HAN_APPS_SCRIPT_URL);
      var result = await window.HanAcademyAPI.loadAcademyData();
      if (result.connected) {
        state.connected = true;
        state.dashboard = result.dashboard;
        state.all = result.all || state.all;
        if (result.all && result.all.all) state.all = result.all.all;
      } else {
        state.error = result.reason || 'API not connected';
      }
    } catch (error) {
      state.error = error.message || String(error);
    }
    state.loading = false;
    installLiveRenderers();
    if (typeof render === 'function') render();
    setHeroStatus();
    wireQuickActions();
  }

  window.HanAcademyLiveState = state;
  window.addEventListener('DOMContentLoaded', start);
})();
