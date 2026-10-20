/* RL_FRESH_START — 2026-10-19 全家族「離線要有，但不能擋更新」（母版：04_管理工具\PWA新鮮度\rl_fresh_sw.js，用 apply.py 重新套用，不要在這裡手改）
   問題：原本 fetch 對網頁本身也是 cache-first → 重整先畫舊畫面、發新版要開兩次才看得到。
   做法：這段排在 sw.js 最前面、最先註冊 fetch：網頁／程式／樣式／資料（.html .js .mjs .css .json 與導覽）一律先拿線上最新的，
   4 秒沒回應或離線才用快取；成功時存一份到 rl-fresh 快取，離線也有最新版可用。
   圖片、字型、地圖圖磚等其他檔案不攔，交給原本的 handler（照舊 cache-first）。
   攔下的請求呼叫 stopImmediatePropagation()，原本的 fetch handler 不會再處理同一個請求。 */
(function(){
  var FRESH = 'rl-fresh';
  var CODE = /\.(?:html?|m?js|css|json|webmanifest)$/i;
  function fromCache(req){
    return caches.match(req).then(function(r){
      if (r) return r;
      return caches.match(req, { ignoreSearch: true }).then(function(r2){
        if (r2 || req.mode !== 'navigate') return r2;
        return caches.match('./').then(function(r3){ return r3 || caches.match('./index.html') || caches.match('index.html'); });
      });
    });
  }
  function fresh(e, req){
    var net = fetch(req).then(function(res){
      if (res && res.ok && res.type === 'basic'){
        var copy = res.clone();
        e.waitUntil(caches.open(FRESH).then(function(c){ return c.put(req, copy); }).catch(function(){}));
      }
      return res;
    });
    var timer = new Promise(function(resolve){ setTimeout(function(){ resolve(null); }, 4000); });
    return Promise.race([net.catch(function(){ return null; }), timer]).then(function(res){
      if (res && (res.ok || res.status === 304 || res.type === 'opaqueredirect')) return res;
      return fromCache(req).then(function(c){
        if (c) return c;
        return net.catch(function(){ return Response.error(); });   /* 快取也沒有：再等網路（可能只是慢） */
      });
    });
  }
  self.addEventListener('fetch', function(e){
    var req = e.request;
    if (req.method !== 'GET') return;
    var url; try { url = new URL(req.url); } catch (x) { return; }
    if (url.origin !== self.location.origin) return;
    if (url.pathname.indexOf('/api/') === 0) return;          /* 有自己 API 的 App（Worker）交給原本邏輯 */
    var isDoc = req.mode === 'navigate' || url.pathname.slice(-1) === '/' || CODE.test(url.pathname);
    if (!isDoc) return;
    if (url.pathname.slice(-6) === '/sw.js' || url.pathname === '/sw.js') return;
    e.stopImmediatePropagation();
    e.respondWith(fresh(e, req));
  });
})();
/* RL_FRESH_END */
const CACHE = "921_junior2a-icons-f9e2b74915";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./ridgeline-ui.css", "./favicon.svg", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png", "./lively-core.css", "./lively-engine.css", "./lively-theme.css", "./lively-pre.js", "./lively.js", "./vendor/canvas-confetti/confetti.browser.js", "./vendor/nunito/nunito-latin-800-normal.woff2", "./vendor/nunito/nunito-latin-900-normal.woff2", "./vendor/andika/andika-latin-400-normal.woff2", "./vendor/andika/andika-latin-700-normal.woff2", "./vendor/fluent-emoji/airplane_flat.svg", "./vendor/fluent-emoji/bar_chart_flat.svg", "./vendor/fluent-emoji/basketball_flat.svg", "./vendor/fluent-emoji/books_flat.svg", "./vendor/fluent-emoji/brick_flat.svg", "./vendor/fluent-emoji/bullseye_flat.svg", "./vendor/fluent-emoji/bust_in_silhouette_flat.svg", "./vendor/fluent-emoji/calendar_flat.svg", "./vendor/fluent-emoji/card_index_dividers_flat.svg", "./vendor/fluent-emoji/card_index_flat.svg", "./vendor/fluent-emoji/check_mark_button_flat.svg", "./vendor/fluent-emoji/child_flat.svg", "./vendor/fluent-emoji/clipboard_flat.svg", "./vendor/fluent-emoji/closed_book_flat.svg", "./vendor/fluent-emoji/fire_flat.svg", "./vendor/fluent-emoji/floppy_disk_flat.svg", "./vendor/fluent-emoji/gear_flat.svg", "./vendor/fluent-emoji/glowing_star_flat.svg", "./vendor/fluent-emoji/graduation_cap_flat.svg", "./vendor/fluent-emoji/headphone_flat.svg", "./vendor/fluent-emoji/high_voltage_flat.svg", "./vendor/fluent-emoji/house_flat.svg", "./vendor/fluent-emoji/inbox_tray_flat.svg", "./vendor/fluent-emoji/input_latin_letters_flat.svg", "./vendor/fluent-emoji/key_flat.svg", "./vendor/fluent-emoji/ledger_flat.svg", "./vendor/fluent-emoji/light_bulb_flat.svg", "./vendor/fluent-emoji/link_flat.svg", "./vendor/fluent-emoji/magnifying_glass_tilted_left_flat.svg", "./vendor/fluent-emoji/magnifying_glass_tilted_right_flat.svg", "./vendor/fluent-emoji/memo_flat.svg", "./vendor/fluent-emoji/microphone_flat.svg", "./vendor/fluent-emoji/open_book_flat.svg", "./vendor/fluent-emoji/outbox_tray_flat.svg", "./vendor/fluent-emoji/party_popper_flat.svg", "./vendor/fluent-emoji/performing_arts_flat.svg", "./vendor/fluent-emoji/puzzle_piece_flat.svg", "./vendor/fluent-emoji/red_heart_flat.svg", "./vendor/fluent-emoji/repeat_button_flat.svg", "./vendor/fluent-emoji/rocket_flat.svg", "./vendor/fluent-emoji/seedling_flat.svg", "./vendor/fluent-emoji/shield_flat.svg", "./vendor/fluent-emoji/sos_button_flat.svg", "./vendor/fluent-emoji/sparkles_flat.svg", "./vendor/fluent-emoji/speaker_high_volume_flat.svg", "./vendor/fluent-emoji/speech_balloon_flat.svg", "./vendor/fluent-emoji/star_flat.svg", "./vendor/fluent-emoji/sun_flat.svg", "./vendor/fluent-emoji/tomato_flat.svg", "./vendor/fluent-emoji/trophy_flat.svg", "./vendor/fluent-emoji/video_game_flat.svg", "./vendor/fluent-emoji/wrench_flat.svg", "./vendor/fluent-emoji/writing_hand_flat.svg"];

// CACHE 的版本由 scripts/build.py 每次建置時依 index.html 的雜湊自動戳上。
// 不要手動改也不要讓它固定：位元組沒變，瀏覽器就不會安裝新的 SW，
// 已把 App 加到桌面的裝置會永遠停在第一次快取的舊版，任何修正都送不到。

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {}));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

function isHTML(req) {
  return req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
}

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  // App 本體走 network-first：有網路就拿最新版，離線才回退快取。
  if (isHTML(e.request)) {
    e.respondWith(
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put('./index.html', copy)).catch(() => {});
        return res;
      }).catch(() => caches.match('./index.html').then(hit => hit || caches.match('./')))
    );
    return;
  }

  // 圖示等靜態資源維持 cache-first
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }))
  );
});
