window.addEventListener('DOMContentLoaded', function () {
  var fallback = {
    dashboard: { metrics: { students: 3, activeInstructors: 2, activeClasses: 3, overduePayments: 1, promotionReady: 1, attendanceRecords: 3 } },
    all: {
      students: [
        { StudentID: 'STU-001', DisplayName: 'Minho Park', Belt: 'Yellow Belt', LessonsAttended: 7, LessonsRequired: 15, PromotionStatus: 'In Progress' },
        { StudentID: 'STU-002', DisplayName: 'Aline Niyonsaba', Belt: 'Green Stripe', LessonsAttended: 18, LessonsRequired: 15, PromotionStatus: 'Ready' },
        { StudentID: 'STU-003', DisplayName: 'Diane Umutoni', Belt: 'Blue Stripe', LessonsAttended: 14, LessonsRequired: 15, PromotionStatus: 'Almost Ready' }
      ],
      classes: [
        { ClassID: 'CLS-001', ClassName: 'Kid Lesson', Day: 'Monday', StartTime: '17:00', EndTime: '17:55', Capacity: 20, AssignedStudentIDs: 'STU-001,STU-003' },
        { ClassID: 'CLS-002', ClassName: 'Teen and Adult', Day: 'Monday', StartTime: '18:00', EndTime: '18:55', Capacity: 25, AssignedStudentIDs: 'STU-002' },
        { ClassID: 'CLS-003', ClassName: 'Little Dragon', Day: 'Tuesday', StartTime: '17:00', EndTime: '17:40', Capacity: 12, AssignedStudentIDs: '' }
      ],
      attendance: [
        { Date: '2026-05-25', StudentID: 'STU-001', Status: 'Present', Notes: 'Strong focus during basics' },
        { Date: '2026-05-25', StudentID: 'STU-002', Status: 'Present', Notes: 'Ready for promotion test review' },
        { Date: '2026-05-26', StudentID: 'STU-003', Status: 'Absent', Notes: 'Parent notified' }
      ],
      payments: [
        { StudentID: 'STU-001', Type: 'Monthly Fee', AmountRWF: 40000, Status: 'Overdue', DueDate: '2026-05-10' },
        { StudentID: 'STU-002', Type: 'Promotion Test', AmountRWF: 50000, Status: 'Paid', DueDate: '2026-05-20' },
        { StudentID: 'STU-003', Type: 'Uniform', AmountRWF: 30000, Status: 'Pending', DueDate: '2026-05-30' }
      ],
      promotions: [
        { StudentID: 'STU-001', CurrentBelt: 'Yellow Belt', NextBelt: 'Green Stripe', ReadinessScore: 47, Status: 'In Progress' },
        { StudentID: 'STU-002', CurrentBelt: 'Green Stripe', NextBelt: 'Green Belt', ReadinessScore: 96, Status: 'Ready' },
        { StudentID: 'STU-003', CurrentBelt: 'Blue Stripe', NextBelt: 'Blue Belt', ReadinessScore: 72, Status: 'Almost Ready' }
      ]
    }
  };

  function text(sel, value) {
    var el = document.querySelector(sel);
    if (el) el.textContent = value;
  }

  function html(sel, value) {
    var el = document.querySelector(sel);
    if (el) el.innerHTML = value;
  }

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c];
    });
  }

  function money(v) {
    return 'RWF ' + Number(v || 0).toLocaleString('en-US');
  }

  function statusClass(s) {
    s = String(s || '').toLowerCase();
    if (s === 'ready' || s === 'paid' || s === 'present') return 'p-green';
    if (s === 'overdue' || s === 'absent') return 'p-red';
    return 'p-gold';
  }

  function studentName(data, id) {
    var s = (data.all.students || []).find(function (x) { return String(x.StudentID) === String(id); });
    return s ? s.DisplayName : id;
  }

  function countAssigned(classItem) {
    return String(classItem.AssignedStudentIDs || '').split(',').filter(Boolean).length;
  }

  function render(data, source) {
    var all = data.all || fallback.all;
    var metrics = (data.dashboard && data.dashboard.metrics) || fallback.dashboard.metrics;
    var students = all.students || [];
    var classes = all.classes || [];
    var payments = all.payments || [];
    var promotions = all.promotions || [];
    var attendance = all.attendance || [];
    var paid = payments.filter(function (p) { return String(p.Status).toLowerCase() === 'paid'; }).reduce(function (s, p) { return s + Number(p.AmountRWF || 0); }, 0);
    var pending = payments.filter(function (p) { return String(p.Status).toLowerCase() !== 'paid'; }).reduce(function (s, p) { return s + Number(p.AmountRWF || 0); }, 0);
    var present = attendance.filter(function (a) { return String(a.Status).toLowerCase() === 'present'; }).length;
    var attPct = attendance.length ? Math.round((present / attendance.length) * 100) : 0;

    text('.live-count', students.length + ' students');
    text('.nav-badge', students.length);

    var values = document.querySelectorAll('.metric-value');
    if (values[0]) values[0].textContent = students.length;
    if (values[1]) values[1].textContent = attPct + '%';
    if (values[2]) values[2].textContent = money(paid + pending);
    if (values[3]) values[3].textContent = metrics.promotionReady || 0;

    var heroBadge = document.querySelector('.hero-badge-val');
    if (heroBadge) heroBadge.textContent = attPct + '%';

    html('.hero-meta', '<div class="hero-stat"><strong>' + (source === 'api' ? 'LIVE' : 'LOCAL') + '</strong> Google Sheets data layer</div><div class="hero-stat-dot"></div><div class="hero-stat"><strong>' + classes.length + '</strong> classes loaded</div><div class="hero-stat-dot"></div><div class="hero-stat"><strong>' + students.length + '</strong> students loaded</div>');

    var schedule = classes.map(function (c) {
      return '<div class="sched-row"><span class="sched-time">' + esc(c.StartTime) + '-' + esc(c.EndTime) + '</span><div class="sched-block live" style="border-left-color:var(--teal)"><span class="sched-name">' + esc(c.ClassName) + '</span><div class="sched-info"><span class="sched-dot" style="background:var(--teal)"></span>' + countAssigned(c) + ' students</div></div></div>';
    }).join('');
    html('.schedule', schedule);

    var alerts = payments.filter(function (p) { return String(p.Status).toLowerCase() !== 'paid'; }).map(function (p) {
      return '<div class="alert a-red"><svg class="alert-ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg><div class="alert-body"><strong>' + esc(p.Status) + ': ' + esc(p.Type) + '</strong> - ' + esc(studentName({ all: all }, p.StudentID)) + ' owes ' + money(p.AmountRWF) + ' due ' + esc(p.DueDate) + '.</div></div>';
    }).join('');
    html('.alerts', alerts || '<div class="alert a-green"><div class="alert-body"><strong>No payment alerts</strong> - all visible accounts are clear.</div></div>');

    var attendanceTable = document.querySelector('#page-dashboard .data-table tbody, #page-dashboard table tbody');
    if (attendanceTable) {
      attendanceTable.innerHTML = attendance.map(function (a) {
        return '<tr><td>' + esc(studentName({ all: all }, a.StudentID)) + '</td><td>' + esc(a.Status) + '</td><td>' + esc(a.Date) + '</td><td>' + esc(a.Notes) + '</td></tr>';
      }).join('');
    }

    var existing = document.getElementById('live-api-status');
    if (!existing) {
      var badge = document.createElement('div');
      badge.id = 'live-api-status';
      badge.style.cssText = 'position:fixed;right:18px;bottom:18px;z-index:99999;background:#0f172a;border:1px solid rgba(255,255,255,.18);color:#fff;border-radius:12px;padding:10px 14px;font:700 12px Outfit,Arial;box-shadow:0 10px 30px rgba(0,0,0,.35)';
      document.body.appendChild(badge);
      existing = badge;
    }
    existing.textContent = source === 'api' ? 'Live API connected: Google Sheets' : 'API not available: showing seeded data';
    existing.style.background = source === 'api' ? '#064e3b' : '#7f1d1d';
  }

  render(fallback, 'fallback');

  if (window.HanAcademyAPI) {
    window.HanAcademyAPI.configure(window.HAN_APPS_SCRIPT_URL);
    window.HanAcademyAPI.loadAcademyData().then(function (data) {
      if (data && data.all && data.all.students) render(data, 'api');
    }).catch(function (err) {
      console.error('Live data bridge failed', err);
    });
  }
});
