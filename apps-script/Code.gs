const SPREADSHEET_ID = '1gEO7nsBISrv9JKciqnggekMR3aVeD4qnUm0AU0pKeW4';

const SHEETS = {
  students: 'Students',
  parents: 'Parents',
  instructors: 'Instructors',
  classes: 'Classes',
  attendance: 'Attendance',
  payments: 'Payments',
  promotions: 'Promotions'
};

function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  const action = String(params.action || params.resource || 'health').toLowerCase();

  if (action === 'health') return json({ status: 'online', service: 'Han Taekwondo Korea Academy API' });
  if (action === 'dashboard' || action === 'getdashboard') return json(getDashboard());
  if (action === 'all' || action === 'getall') return json(getAllData());
  if (action === 'admin') return json(getRoleView('Admin'));
  if (action === 'instructor') return json(getRoleView('Instructor', params.instructorId));
  if (action === 'parent') return json(getRoleView('Parent', params.parentId));

  const resource = action.replace(/^get/, '').toLowerCase();
  if (!SHEETS[resource]) return json({ error: 'Unknown action', action: action });
  return json({ resource: resource, data: readSheet(SHEETS[resource]) });
}

function doPost(e) {
  const body = e && e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};
  const action = String(body.action || '').toLowerCase();
  const payload = body.payload || {};

  if (action === 'createstudent') return json(appendRecord('Students', payload));
  if (action === 'createparent') return json(appendRecord('Parents', payload));
  if (action === 'createinstructor') return json(appendRecord('Instructors', payload));
  if (action === 'markattendance') return json(appendRecord('Attendance', payload));
  if (action === 'recordpayment') return json(appendRecord('Payments', payload));
  if (action === 'updatepromotion') return json(appendRecord('Promotions', payload));

  return json({ error: 'Unknown write action', action: action });
}

function getDashboard() {
  const students = readSheet('Students');
  const instructors = readSheet('Instructors');
  const classes = readSheet('Classes');
  const payments = readSheet('Payments');
  const promotions = readSheet('Promotions');
  const attendance = readSheet('Attendance');

  return {
    resource: 'dashboard',
    metrics: {
      students: students.length,
      activeInstructors: instructors.filter(x => String(x.Status).toLowerCase() === 'active').length,
      activeClasses: classes.filter(x => String(x.Status).toLowerCase() === 'active').length,
      overduePayments: payments.filter(x => String(x.Status).toLowerCase() === 'overdue').length,
      promotionReady: promotions.filter(x => String(x.Status).toLowerCase() === 'ready').length,
      attendanceRecords: attendance.length
    },
    todayClasses: classes,
    promotionCandidates: promotions,
    paymentAlerts: payments.filter(x => ['overdue', 'pending'].indexOf(String(x.Status).toLowerCase()) >= 0)
  };
}

function getAllData() {
  return {
    students: readSheet('Students'),
    parents: readSheet('Parents'),
    instructors: readSheet('Instructors'),
    classes: readSheet('Classes'),
    attendance: readSheet('Attendance'),
    payments: readSheet('Payments'),
    promotions: readSheet('Promotions')
  };
}

function getRoleView(role, id) {
  const data = getAllData();
  if (role === 'Admin') return { role: role, data: data, dashboard: getDashboard() };
  if (role === 'Instructor') {
    const instructorId = id || 'INS-001';
    const classes = data.classes.filter(x => String(x.InstructorID) === instructorId);
    const classIds = classes.map(x => String(x.ClassID));
    const attendance = data.attendance.filter(x => String(x.InstructorID) === instructorId || classIds.indexOf(String(x.ClassID)) >= 0);
    return { role: role, instructorId: instructorId, classes: classes, attendance: attendance, students: data.students };
  }
  if (role === 'Parent') {
    const parentId = id || 'PAR-001';
    const students = data.students.filter(x => String(x.ParentID) === parentId);
    const ids = students.map(x => String(x.StudentID));
    return {
      role: role,
      parentId: parentId,
      students: students,
      payments: data.payments.filter(x => ids.indexOf(String(x.StudentID)) >= 0),
      promotions: data.promotions.filter(x => ids.indexOf(String(x.StudentID)) >= 0),
      attendance: data.attendance.filter(x => ids.indexOf(String(x.StudentID)) >= 0)
    };
  }
  return { role: role, data: data };
}

function appendRecord(sheetName, record) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return { ok: false, error: 'Missing sheet', sheetName: sheetName };
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].filter(String);
  const row = headers.map(header => record[header] !== undefined ? record[header] : '');
  sheet.appendRow(row);
  return { ok: true, sheetName: sheetName, record: record };
}

function readSheet(sheetName) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0];
  return values.slice(1).filter(row => row.join('') !== '').map(row => {
    const item = {};
    headers.forEach((header, index) => item[String(header).trim()] = row[index]);
    return item;
  });
}

function json(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
