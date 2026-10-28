import { firebaseConfig } from '../firebase-config.js';
import { DEFAULT_TRIP, DEFAULT_CHECKLIST } from './default-data.js';

export { DEFAULT_TRIP, DEFAULT_CHECKLIST };

const SDK = 'https://www.gstatic.com/firebasejs/10.12.2/';

export const configured = !!(firebaseConfig && firebaseConfig.apiKey && !String(firebaseConfig.apiKey).startsWith('YOUR'));

let fbPromise = null;
export function getFb() {
  if (!configured) return Promise.resolve(null);
  if (!fbPromise) {
    fbPromise = Promise.all([
      import(SDK + 'firebase-app.js'),
      import(SDK + 'firebase-firestore.js'),
      import(SDK + 'firebase-auth.js'),
    ]).then(([appMod, fs, authMod]) => {
      const app = appMod.initializeApp(firebaseConfig);
      return { app, fs, db: fs.getFirestore(app), authMod, auth: authMod.getAuth(app) };
    }).catch((e) => { console.error('Firebase 載入失敗', e); return null; });
  }
  return fbPromise;
}

const clone = (o) => JSON.parse(JSON.stringify(o));

// 即時讀取行程；沒有 Firebase 或沒有資料時回傳內建行程
export async function watchTrip(cb) {
  const fb = await getFb();
  if (!fb) { cb(clone(DEFAULT_TRIP), 'local'); return; }
  const ref = fb.fs.doc(fb.db, 'trip', 'main');
  fb.fs.onSnapshot(ref,
    (snap) => cb(snap.exists() ? snap.data() : clone(DEFAULT_TRIP), snap.exists() ? 'cloud' : 'default'),
    (err) => { console.error(err); cb(clone(DEFAULT_TRIP), 'error'); });
}

export function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
export function safeUrl(u) {
  return /^https?:\/\//i.test(String(u || '').trim()) ? String(u).trim() : '';
}

export function navHtml(active) {
  const item = (href, key, label) =>
    `<a href="${href}" class="${active === key ? 'on' : ''}" ${active === key ? 'aria-current="page"' : ''}>${label}</a>`;
  return `<nav class="topnav"><div class="topnav-in">
    <span class="brand"><span class="ele" aria-hidden="true">🐘</span>曼谷行</span>
    <div class="tabs">${item('index.html', 'trip', '行程')}${item('check.html', 'check', 'CHECK')}${item('admin.html', 'admin', '編輯')}</div>
  </div></nav>`;
}

export function store(key, val) {
  try {
    if (val === undefined) return JSON.parse(localStorage.getItem(key));
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) { return null; }
}
