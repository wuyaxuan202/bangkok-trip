// 泰國小象吉祥物「阿象」：點一下會跳、教一句泰文；CHECK 頁打勾時會加油，全部完成會撒彩帶。

const PHRASES = [
  { th: 'สวัสดีค่ะ', say: 'sa-wat-dee ka', zh: '你好' },
  { th: 'ขอบคุณค่ะ', say: 'khop-khun ka', zh: '謝謝' },
  { th: 'อร่อยมาก', say: 'a-roi mak', zh: '很好吃！' },
  { th: 'เท่าไหร่คะ', say: 'tao-rai ka', zh: '多少錢？' },
  { th: 'ลดได้ไหมคะ', say: 'lot dai mai ka', zh: '可以算便宜一點嗎？' },
  { th: 'ไม่เผ็ด', say: 'mai phet', zh: '不要辣' },
  { th: 'เผ็ดนิดหน่อย', say: 'phet nit-noi', zh: '小辣就好' },
  { th: 'ห้องน้ำอยู่ไหนคะ', say: 'hong-nam yu nai ka', zh: '廁所在哪裡？' },
  { th: 'ไม่เป็นไร', say: 'mai pen rai', zh: '沒關係～' },
  { th: 'ไปที่นี่ค่ะ', say: 'pai tee-nee ka', zh: '我要去這裡（指地圖）' },
];
const CHEERS = ['勾到了！', '好棒～', '又少一件事！', '準備得很好喔', '曼谷在等你們！', 'เยี่ยม！（讚！）'];

const ELEPHANT = `
<svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden="true">
  <ellipse cx="62" cy="112" rx="34" ry="5" fill="rgba(20,22,28,.15)"/>
  <!-- 身體 -->
  <rect x="34" y="62" width="58" height="40" rx="20" fill="#5b86ff"/>
  <rect x="40" y="90" width="12" height="20" rx="6" fill="#4a73e8"/>
  <rect x="74" y="90" width="12" height="20" rx="6" fill="#4a73e8"/>
  <!-- 泰式格紋披巾 -->
  <path d="M34 78 Q63 92 92 78 L92 86 Q63 100 34 86 Z" fill="#e3343f"/>
  <path d="M44 82 l4 6 M54 85 l4 6 M64 86 l4 6 M74 85 l4 6 M84 82 l4 6" stroke="#14161c" stroke-width="2" stroke-linecap="round"/>
  <!-- 頭 -->
  <circle cx="58" cy="50" r="28" fill="#6b92ff"/>
  <!-- 耳朵 -->
  <ellipse cx="86" cy="46" rx="16" ry="20" fill="#4a73e8"/>
  <ellipse cx="86" cy="46" rx="9" ry="13" fill="#ff8f96"/>
  <!-- 鼻子 -->
  <path class="trunk" d="M34 56 C 22 60, 18 74, 26 80 C 30 83, 34 78, 31 75 C 27 70, 32 64, 40 62 Z" fill="#6b92ff"/>
  <!-- 眼睛與腮紅 -->
  <circle cx="52" cy="44" r="4.2" fill="#14161c"/>
  <circle cx="53.4" cy="42.6" r="1.4" fill="#fff"/>
  <ellipse cx="46" cy="55" rx="5" ry="3" fill="#ff8f96" opacity=".75"/>
  <path d="M58 58 q4 4 8 0" stroke="#14161c" stroke-width="2" fill="none" stroke-linecap="round"/>
  <!-- 頭上的小花 -->
  <circle cx="62" cy="22" r="5" fill="#e3343f"/><circle cx="62" cy="22" r="2" fill="#fff"/>
</svg>`;

const TUKTUK = `
<svg viewBox="0 0 140 80" width="100%" height="100%" aria-hidden="true">
  <rect x="18" y="8" width="96" height="10" rx="5" fill="#14161c"/>
  <rect x="22" y="16" width="4" height="28" fill="#14161c"/><rect x="108" y="16" width="4" height="28" fill="#14161c"/>
  <path d="M14 44 h96 q20 0 22 14 v4 H14 Z" fill="#2457e6"/>
  <path d="M14 44 h40 v18 H14 Z" fill="#e3343f"/>
  <rect x="60" y="22" width="40" height="18" rx="4" fill="#cfe0ff" opacity=".9"/>
  <circle cx="34" cy="66" r="10" fill="#14161c"/><circle cx="34" cy="66" r="4" fill="#dde3ee"/>
  <circle cx="112" cy="66" r="10" fill="#14161c"/><circle cx="112" cy="66" r="4" fill="#dde3ee"/>
  <circle cx="132" cy="50" r="3" fill="#ffd34d"/>
</svg>`;

const CSS = `
.mascot{position:fixed;z-index:40;right:calc(14px + env(safe-area-inset-right,0px));bottom:calc(14px + env(safe-area-inset-bottom,0px));
  display:flex;flex-direction:column;align-items:flex-end;gap:6px;pointer-events:none}
.mascot-btn{pointer-events:auto;width:84px;height:84px;border:0;background:none;padding:0;cursor:pointer;filter:drop-shadow(0 6px 10px rgba(36,87,230,.25));
  animation:mascotIdle 3.2s ease-in-out infinite;-webkit-tap-highlight-color:transparent}
.mascot-btn:focus-visible{outline:3px solid #e3343f;outline-offset:4px;border-radius:50%}
.mascot-btn.jump{animation:mascotJump .55s cubic-bezier(.3,1.6,.5,1)}
.mascot-btn .trunk{transform-origin:40px 62px;animation:trunkWag 2.4s ease-in-out infinite}
@keyframes mascotIdle{50%{transform:translateY(-4px) rotate(-2deg)}}
@keyframes mascotJump{0%{transform:translateY(0) scale(1)}35%{transform:translateY(-26px) scale(1.06,.94) rotate(-6deg)}70%{transform:translateY(0) scale(1.08,.9)}100%{transform:none}}
@keyframes trunkWag{50%{transform:rotate(10deg)}}
.mascot-bubble{pointer-events:auto;max-width:min(260px,70vw);background:var(--surface,#fff);color:var(--fg,#14161c);border:2.5px solid var(--fg,#14161c);
  border-radius:18px 18px 4px 18px;padding:10px 14px;font-size:14px;line-height:1.5;box-shadow:0 6px 0 rgba(20,22,28,.08);
  opacity:0;transform:translateY(8px) scale(.96);transition:opacity .2s,transform .2s}
.mascot-bubble.show{opacity:1;transform:none}
.mascot-bubble .th{font-size:19px;font-weight:900;color:var(--accent,#2457e6)}
.mascot-bubble .say{font-size:12.5px;color:var(--red,#e3343f);font-weight:700}
.mascot-bubble .zh{font-weight:700}
.mascot-bubble .tip{display:block;margin-top:4px;font-size:11px;color:var(--muted,#5d6475)}
.mascot-bubble .replay{margin-top:6px;border:2px solid var(--accent,#2457e6);background:transparent;color:var(--accent,#2457e6);border-radius:999px;padding:2px 12px;font:inherit;font-size:13px;font-weight:700;cursor:pointer}
.mascot-bubble .replay:active{transform:translateY(1px)}
.tuktuk-lane{position:relative;height:46px;margin-top:4px;overflow:hidden;border-bottom:2px dashed var(--line,#dde3ee)}
.tuktuk{position:absolute;bottom:2px;width:78px;height:45px;left:-90px;animation:drive 9s linear infinite}
.tuktuk::after{content:"";position:absolute;left:-14px;bottom:10px;width:10px;height:10px;border-radius:50%;background:var(--line,#dde3ee);box-shadow:-10px -4px 0 -2px var(--line,#dde3ee);animation:puff .6s linear infinite}
@keyframes drive{0%{left:-90px}100%{left:calc(100% + 20px)}}
@keyframes puff{50%{opacity:.3;transform:translateX(-4px)}}
.confetti{position:fixed;inset:0;pointer-events:none;z-index:60;overflow:hidden}
.confetti i{position:absolute;top:-12px;width:9px;height:14px;border-radius:2px;animation:fall linear forwards}
@keyframes fall{to{transform:translateY(110vh) rotate(720deg)}}
@media (max-width:480px){.mascot-btn{width:70px;height:70px}}
@media (prefers-reduced-motion:reduce){.mascot-btn,.mascot-btn .trunk,.tuktuk,.tuktuk::after{animation:none}.tuktuk{left:12px}}
`;

let bubble, btn, hideTimer, idx = Math.floor(Math.random() * PHRASES.length);

// ---------- 泰文發音（用手機／電腦內建的語音，不用另外下載） ----------
const synth = 'speechSynthesis' in window ? window.speechSynthesis : null;
let thaiVoice = null;
function pickVoice() {
  if (!synth) return;
  const vs = synth.getVoices();
  thaiVoice = vs.find((v) => /^th(-|_|$)/i.test(v.lang)) || null;
}
if (synth) { pickVoice(); synth.addEventListener?.('voiceschanged', pickVoice); }
function speakThai(text) {
  if (!synth) return false;
  if (!thaiVoice) pickVoice();
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'th-TH';
  if (thaiVoice) u.voice = thaiVoice;
  u.rate = 0.8;
  synth.speak(u);
  return !!thaiVoice || /iPhone|iPad|Android/i.test(navigator.userAgent);
}
const noVoiceTip = '<span class="tip">這台裝置沒有泰文語音，可以在系統設定加裝「泰文」語音，或改用手機聽</span>';

function say(html, ms = 4200) {
  bubble.innerHTML = html;
  bubble.classList.add('show');
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => bubble.classList.remove('show'), ms);
}
function jump() { btn.classList.remove('jump'); void btn.offsetWidth; btn.classList.add('jump'); }

export function initMascot() {
  const style = document.createElement('style'); style.textContent = CSS; document.head.appendChild(style);
  const wrap = document.createElement('div'); wrap.className = 'mascot';
  wrap.innerHTML = `<div class="mascot-bubble" role="status" aria-live="polite"></div>
    <button class="mascot-btn" type="button" aria-label="點小象學一句泰文（會唸出聲音）">${ELEPHANT}</button>`;
  document.body.appendChild(wrap);
  bubble = wrap.querySelector('.mascot-bubble'); btn = wrap.querySelector('.mascot-btn');
  btn.addEventListener('animationend', (e) => { if (e.animationName === 'mascotJump') btn.classList.remove('jump'); });
  btn.addEventListener('click', () => {
    const p = PHRASES[idx++ % PHRASES.length];
    jump();
    const ok = speakThai(p.th);
    say(`<div class="th" lang="th">${p.th}</div><div class="say">${p.say}</div><div class="zh">${p.zh}</div>
      <button class="replay" type="button" data-th="${p.th}">🔊 再聽一次</button>
      ${ok || !synth ? '' : noVoiceTip}<span class="tip">女生句尾說 ka，男生說 krap</span>`, 8000);
  });
  bubble.addEventListener('click', (e) => {
    const r = e.target.closest('.replay'); if (!r) return;
    speakThai(r.dataset.th);
    clearTimeout(hideTimer); hideTimer = setTimeout(() => bubble.classList.remove('show'), 6000);
  });
  setTimeout(() => say('<div class="zh">สวัสดีค่ะ！我是阿象 🐘</div><span class="tip">點我學一句泰文，會唸給你聽 🔊</span>', 3800), 900);

  window.addEventListener('trip:cheer', () => { jump(); say(`<div class="zh">${CHEERS[Math.floor(Math.random() * CHEERS.length)]}</div>`, 1800); });
  window.addEventListener('trip:alldone', () => { jump(); confetti(); speakThai('ไปเที่ยวกัน'); say('<div class="zh">全部準備好了！</div><div class="th" lang="th">ไปเที่ยวกัน！</div><div class="say">pai tiao gan</div><span class="tip">一起去玩吧！</span>', 6500); });
}

export function tuktukLane() {
  return `<div class="tuktuk-lane" aria-hidden="true"><div class="tuktuk">${TUKTUK}</div></div>`;
}

export function confetti() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const box = document.createElement('div'); box.className = 'confetti';
  const colors = ['#2457e6', '#e3343f', '#14161c', '#5b86ff', '#ffd34d'];
  for (let i = 0; i < 70; i++) {
    const c = document.createElement('i');
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = colors[i % colors.length];
    c.style.animationDuration = 1.8 + Math.random() * 1.8 + 's';
    c.style.animationDelay = Math.random() * 0.6 + 's';
    c.style.transform = `rotate(${Math.random() * 180}deg)`;
    box.appendChild(c);
  }
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 4500);
}
