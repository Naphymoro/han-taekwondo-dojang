window.HanAcademyAPI = (function () {
  var apiUrl = window.HAN_APPS_SCRIPT_URL || '';
  var seq = 0;

  function configure(url) {
    apiUrl = url || apiUrl;
  }

  function get(action, params) {
    return new Promise(function (resolve, reject) {
      if (!apiUrl) {
        reject(new Error('Missing Apps Script URL'));
        return;
      }

      var cb = 'hanAcademyJsonp' + Date.now() + '_' + seq++;
      var url = new URL(apiUrl);
      url.searchParams.set('action', action);
      url.searchParams.set('callback', cb);
      Object.keys(params || {}).forEach(function (key) {
        url.searchParams.set(key, params[key]);
      });

      var tag = document.createElement('script');
      var done = false;

      function finish(payload, error) {
        if (done) return;
        done = true;
        window[cb] = undefined;
        if (tag.parentNode) tag.parentNode.removeChild(tag);
        if (error) reject(error);
        else resolve(payload);
      }

      window[cb] = function (payload) {
        finish(payload, null);
      };

      tag.onerror = function () {
        finish(null, new Error('Apps Script request failed: ' + action));
      };

      setTimeout(function () {
        finish(null, new Error('Apps Script request timed out: ' + action));
      }, 15000);

      tag.src = url.toString();
      document.head.appendChild(tag);
    });
  }

  async function loadAcademyData() {
    var dashboard = await get('dashboard');
    var all = await get('all');
    return { connected: true, dashboard: dashboard, all: all };
  }

  return { configure: configure, get: get, loadAcademyData: loadAcademyData };
})();
