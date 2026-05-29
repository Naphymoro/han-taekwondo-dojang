window.HanAcademyAPI = (function () {
  const CONFIG = {
    appsScriptUrl: window.HAN_APPS_SCRIPT_URL || '',
    ready: false
  };

  function configure(url) {
    CONFIG.appsScriptUrl = url || CONFIG.appsScriptUrl;
    CONFIG.ready = Boolean(CONFIG.appsScriptUrl);
    window.HAN_APPS_SCRIPT_URL = CONFIG.appsScriptUrl;
    return CONFIG;
  }

  function endpoint(action, params) {
    if (!CONFIG.appsScriptUrl) throw new Error('Missing Google Apps Script Web App URL');
    const url = new URL(CONFIG.appsScriptUrl);
    url.searchParams.set('action', action);
    Object.keys(params || {}).forEach(key => url.searchParams.set(key, params[key]));
    return url.toString();
  }

  async function get(action, params) {
    const response = await fetch(endpoint(action, params), { method: 'GET' });
    if (!response.ok) throw new Error('API request failed: ' + response.status);
    return response.json();
  }

  async function post(action, payload) {
    if (!CONFIG.appsScriptUrl) throw new Error('Missing Google Apps Script Web App URL');
    const response = await fetch(CONFIG.appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action, payload })
    });
    if (!response.ok) throw new Error('API write failed: ' + response.status);
    return response.json();
  }

  async function loadAcademyData() {
    if (!CONFIG.appsScriptUrl) return { connected: false, reason: 'Apps Script URL not configured' };
    const [dashboard, all] = await Promise.all([get('dashboard'), get('all')]);
    return { connected: true, dashboard, all };
  }

  return {
    configure,
    get,
    post,
    loadAcademyData,
    createStudent: payload => post('createStudent', payload),
    createParent: payload => post('createParent', payload),
    createInstructor: payload => post('createInstructor', payload),
    markAttendance: payload => post('markAttendance', payload),
    recordPayment: payload => post('recordPayment', payload),
    updatePromotion: payload => post('updatePromotion', payload)
  };
})();
