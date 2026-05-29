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
  const resource = (e.parameter.resource || 'health').toLowerCase();
  if (resource === 'health') return json({ status: 'online', service: 'Han Taekwondo Korea API' });
  if (!SHEETS[resource]) return json({ error: 'Unknown resource', resource: resource });
  return json({ resource: resource, data: readSheet(SHEETS[resource]) });
}

function readSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
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
