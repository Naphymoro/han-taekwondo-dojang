function output(payload, callback) {
  if (callback) {
    var safeCallback = String(callback).replace(/[^A-Za-z0-9_.$]/g, '');
    return ContentService
      .createTextOutput(safeCallback + '(' + JSON.stringify(payload) + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return json(payload);
}

function doGet(e) {
  var params = e && e.parameter ? e.parameter : {};
  var action = String(params.action || params.resource || 'health').toLowerCase();
  var payload;

  if (action === 'health') payload = { status: 'online', service: 'Han Taekwondo Korea Academy API' };
  else if (action === 'dashboard' || action === 'getdashboard') payload = getDashboard();
  else if (action === 'all' || action === 'getall') payload = getAllData();
  else if (action === 'admin') payload = getRoleView('Admin');
  else if (action === 'instructor') payload = getRoleView('Instructor', params.instructorId);
  else if (action === 'parent') payload = getRoleView('Parent', params.parentId);
  else {
    var resource = action.replace(/^get/, '').toLowerCase();
    if (!SHEETS[resource]) payload = { error: 'Unknown action', action: action };
    else payload = { resource: resource, data: readSheet(SHEETS[resource]) };
  }

  return output(payload, params.callback);
}
