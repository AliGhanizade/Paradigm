'use strict';
/* ============================================================
   فراز — سایت ایستای دوره‌ها (بدون فریم‌ورک)
   داده‌ها از پوشهٔ data/*.json خوانده می‌شود؛ افزودن دورهٔ جدید
   فقط با ریختن یک فایل JSON و یک خط در data/courses.json
============================================================ */

const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const FA = '۰۱۲۳۴۵۶۷۸۹';
const fa = n => String(n).replace(/\d/g, d => FA[d]);
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

/* ================================================================
   ۱) آیکون‌های SVG — بدون ایموجی
================================================================ */
const IC = {
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon:'<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>',
  monitor:'<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  sliders:'<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
  check:'<polyline points="20 6 9 17 4 12"/>',
  clock:'<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/>',
  book:'<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  cap:'<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/>',
  brief:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>',
  zap:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  copy:'<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  chev:'<polyline points="6 9 12 15 18 9"/>',
  arl:'<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
  arr:'<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 19 19 12 12 5"/>',
  bulb:'<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.4 1 2.3h6c0-.9.4-1.8 1-2.3A7 7 0 0 0 12 2Z"/>',
  rotate:'<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  trash:'<path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
  db:'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/>',
  code:'<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  braces:'<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/>',
  server:'<rect x="2" y="3" width="20" height="7" rx="2"/><rect x="2" y="14" width="20" height="7" rx="2"/><path d="M6 6.5h.01M6 17.5h.01"/>',
  play:'<polygon points="6 4 20 12 6 20 6 4"/>',
  film:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 9h20M2 15h20M7 4v16M17 4v16"/>',
  ext:'<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  palette:'<circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.6-.7 1.6-1.6 0-.4-.2-.8-.4-1-.3-.3-.4-.6-.4-1 0-.9.7-1.6 1.6-1.6H16a6 6 0 0 0 6-6c0-5-4.5-8.8-10-8.8Z"/>',
  layers:'<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  x:'<path d="M18 6 6 18M6 6l12 12"/>'
};
const icon = (n,s=24) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${IC[n]||IC.book}</svg>`;

/* ================================================================
   ۲) ذخیره‌سازی محلی — تنظیمات، پیشرفت، ویدیوها و آزمون‌ها
================================================================ */
const store = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } };
const prefs = Object.assign({ theme:'system', accent:'default', color:'#0891a0', radius:16, skin:'glass' }, store('faraz.prefs', {}));
let P = store('faraz.progress', {});   // کلید درس → true
let V = store('faraz.videos',   {});   // کلید ویدیو → true
let Q = store('faraz.quiz',     {});   // کلید آزمون → اندکس پاسخ
const savePrefs = () => localStorage.setItem('faraz.prefs',    JSON.stringify(prefs));
const saveProg  = () => localStorage.setItem('faraz.progress', JSON.stringify(P));
const saveVids  = () => localStorage.setItem('faraz.videos',   JSON.stringify(V));
const saveQuiz  = () => localStorage.setItem('faraz.quiz',     JSON.stringify(Q));

/* ---------- رنگ دلخواه: ساخت پالت از یک HEX ---------- */
function hexToHsl(hex){
  const m = hex.replace('#','');
  const r = parseInt(m.slice(0,2),16)/255, g = parseInt(m.slice(2,4),16)/255, b = parseInt(m.slice(4,6),16)/255;
  const mx = Math.max(r,g,b), mn = Math.min(r,g,b), d = mx-mn;
  let h = 0, s = 0, l = (mx+mn)/2;
  if(d){
    s = l > .5 ? d/(2-mx-mn) : d/(mx+mn);
    if(mx === r) h = ((g-b)/d + (g < b ? 6 : 0));
    else if(mx === g) h = (b-r)/d + 2;
    else h = (r-g)/d + 4;
    h *= 60;
  }
  return { h, s:s*100, l:l*100 };
}
const hslToHex = (h,s,l) => {
  s/=100; l/=100;
  const k = n => (n + h/30) % 12;
  const a = s * Math.min(l, 1-l);
  const f = n => l - a * Math.max(-1, Math.min(k(n)-3, Math.min(9-k(n), 1)));
  return '#' + [f(0),f(8),f(4)].map(v => Math.round(v*255).toString(16).padStart(2,'0')).join('');
};
function deriveAccent(hex, dark){
  let { h, s, l } = hexToHsl(hex);
  if(dark){ l = Math.min(72, Math.max(l, 55) + 14); s = Math.min(92, Math.max(s, 58)); }
  else    { l = Math.min(46, Math.max(l - 6, 34));  s = Math.min(88, Math.max(s, 52)); }
  const ac  = hslToHex(h, s, l);
  const ink = l > 60 ? hslToHex(h, Math.max(s*0.55, 20), 12) : '#ffffff';
  return { ac, ink };
}

const mq = matchMedia('(prefers-color-scheme: dark)');
const effTheme = () => prefs.theme === 'system' ? (mq.matches ? 'dark' : 'light') : prefs.theme;

function applyPrefs(){
  const t = effTheme(), root = document.documentElement;
  root.dataset.theme = t;
  root.dataset.skin = prefs.skin || 'glass';
  if(prefs.accent === 'custom'){
    const { ac, ink } = deriveAccent(prefs.color, t === 'dark');
    root.style.setProperty('--ac', ac);
    root.style.setProperty('--ac-ink', ink);
    root.style.setProperty('--ac-soft', ac + '1f');
    root.style.setProperty('--ac-glow', ac + '59');
  } else {
    ['--ac','--ac-ink','--ac-soft','--ac-glow'].forEach(p => root.style.removeProperty(p));
  }
  root.dataset.accent = prefs.accent === 'custom' ? 'default' : prefs.accent;
  root.style.setProperty('--radius', prefs.radius + 'px');
  const tb = document.getElementById('theme-btn');
  if(tb) tb.innerHTML = icon(t === 'dark' ? 'moon' : 'sun');
  $$('#theme-seg button').forEach(b => b.classList.toggle('on', b.dataset.val === prefs.theme));
  $$('#skin-seg button').forEach(b => b.classList.toggle('on', b.dataset.val === (prefs.skin || 'glass')));
  $$('.swatch').forEach(s => s.classList.toggle('on', s.dataset.val === prefs.accent));
  const cr = document.getElementById('color-row');
  if(cr) cr.classList.toggle('on', prefs.accent === 'custom');
  const cc = document.getElementById('color-code');
  if(cc) cc.textContent = prefs.accent === 'custom' ? prefs.color : '—';
  const ci = document.getElementById('color-input');
  if(ci && ci.value.toLowerCase() !== prefs.color.toLowerCase()) ci.value = prefs.color;
  const ri = document.getElementById('radius-input');
  if(ri) ri.value = prefs.radius;
  const rv = document.getElementById('rv');
  if(rv) rv.textContent = prefs.radius + 'px';
}
mq.addEventListener('change', () => { applyPrefs(); });

/* ================================================================
   ۳) بارگذاری داده‌ها از data/  — اسم سایت هم همین‌جا می‌آید
================================================================ */
let DB = [];            // دوره‌های فعال
let DB_FAILED = [];     // فایل‌های دوره که خواندن نشدند
let SITE = { name:'رشد', tagline:'مسیر رشد مهارت‌ها' };   // جایگزین از data/courses.json

async function fetchJSON(u){
  const r = await fetch(u);
  if(!r.ok) throw new Error(`${u} → ${r.status}`);
  return r.json();
}
async function loadData(){
  DB = []; DB_FAILED = [];
  const man = await fetchJSON('data/courses.json');
  if(man.site && man.site.name) SITE = man.site;
  const results = await Promise.allSettled(man.courses.map(c => fetchJSON('data/' + c.file)));
  results.forEach((r, i) => {
    if(r.status === 'fulfilled') DB.push(r.value);
    else { console.warn('بارگذاری نشد:', man.courses[i].file, r.reason); DB_FAILED.push(man.courses[i]); }
  });
}
/* اعمال اسم سایت روی لوگو و عنوان صفحه */
function applySite(){
  const logo = document.querySelector('.logo span');
  if(logo) logo.innerHTML = `${esc(SITE.name)}<small>${esc(SITE.tagline||'')}</small>`;
  document.title = `${SITE.name} · ${SITE.tagline||''}`;
}

/* ================================================================
   ۴) هایلایت سبک کد (Go / SQL / JS / YAML / Dockerfile / Bash)
================================================================ */
const KW = ('package|import|func|var|const|type|struct|interface|map|chan|go|defer|return|if|else|for|range|switch|case|default|select|select|error|string|int|int64|float64|bool|byte|true|false|nil|make|new|append|go.mod|FROM|AS|COPY|RUN|WORKDIR|ENTRYPOINT|CMD|ENV|EXPOSE|syntax|service|rpc|returns|message|apiVersion|kind|metadata|spec|containers|image|name|ports|volumeMounts|volumes|replicas|selector|template|labels|app|namespace|configMap|secretKeyRef|configMapKeyRef|env|value|resources|limits|requests|cpu|memory|livenessProbe|readinessProbe|httpGet|path|port|initialDelaySeconds|periodSeconds|ingress|host|http|paths|pathType|backend|Service|Deployment|Pod|StatefulSet|ConfigMap|Secret|Ingress|Namespace|HorizontalPodAutoscaler|kubectl|helm|docker|git|echo|cd|export')
  + '|let|function|class|extends|new|this|typeof|instanceof|await|async|try|catch|finally|throw|export|of|yield|undefined|null'
  + '|SELECT|FROM|WHERE|GROUP|BY|ORDER|HAVING|JOIN|LEFT|RIGHT|INNER|OUTER|FULL|CROSS|ON|AND|OR|NOT|NULL|IS|IN|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|INDEX|VIEW|DROP|ALTER|PRIMARY|KEY|FOREIGN|REFERENCES|DISTINCT|LIMIT|OFFSET|UNION|ALL|COUNT|SUM|AVG|MIN|MAX|CASE|WHEN|THEN|END|EXISTS|BETWEEN|LIKE|AS|ASC|DESC|WITH|OVER|PARTITION|ROW_NUMBER|RANK|DENSE_RANK|COALESCE|CAST|EXPLAIN|ANALYZE|BEGIN|COMMIT|ROLLBACK|VACUUM|SEQUENCE|CONSTRAINT|UNIQUE|CHECK|DEFAULT|CASCADE|JOIN';
function hl(src){
  let s = esc(src);
  const stash = [];
  s = s.replace(/#[^\n]*/g, m => (stash.push(['c', m]), `\x00${stash.length-1}\x00`));      // شل/یامل/داکر
  s = s.replace(/\/\/[^\n]*/g, m => (stash.push(['c', m]), `\x00${stash.length-1}\x00`));   // گو/جاوااسکریپت
  s = s.replace(/--[^\n]*/g, m => (stash.push(['c', m]), `\x00${stash.length-1}\x00`));     // SQL
  s = s.replace(/"([^"\n]*)"/g, m => (stash.push(['s', m]), `\x00${stash.length-1}\x00`));
  s = s.replace(/'([^'\n]*)'/g, m => (stash.push(['s', m]), `\x00${stash.length-1}\x00`));
  s = s.replace(new RegExp(`\\b(${KW})\\b`,'g'), '<span class="k">$1</span>');
  s = s.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="n">$1</span>');
  s = s.replace(/\x00(\d+)\x00/g, (_, i) => `<span class="${stash[i][0]}">${stash[i][1]}</span>`);
  return s;
}

/* ================================================================
   ۵) آمار پیشرفت
================================================================ */
function flatten(course){
  const out = [];
  course.tracks?.forEach(tr => tr.levels.forEach((lv, li) => lv.lessons.forEach((ls, mi) =>
    out.push({ course, tr, li, mi, ls, key:`${course.id}:${tr.id}:${li}:${mi}` }))));
  return out;
}
const stats = course => {
  const all = flatten(course);
  const done = all.filter(x => P[x.key]);
  return { total: all.length, done: done.length,
    mins: all.reduce((a,x)=>a+(x.ls.m||0),0), minsDone: done.reduce((a,x)=>a+(x.ls.m||0),0),
    pct: all.length ? Math.round(done.length / all.length * 100) : 0 };
};
const allStats = courses => {
  const t = { total:0, done:0, mins:0, minsDone:0, vids:0, vidsDone:0 };
  courses.forEach(c => {
    flatten(c).forEach(x => {
      t.total++; t.mins += x.ls.m||0;
      const nf = (x.ls.videos?.fa?.length||0) + (x.ls.videos?.en?.length||0);
      t.vids += nf;
      if(P[x.key]){ t.done++; t.minsDone += x.ls.m||0; }
      for(let i=0;i<nf;i++){ /* شمارش ویدیوهای دیده‌شده در حلقهٔ زیر */ }
      Object.keys(V).forEach(k => { if(k.startsWith(x.key+':') && V[k]) t.vidsDone++; });
    });
  });
  t.pct = t.total ? Math.round(t.done/t.total*100) : 0;
  return t;
};
const trackStats = (course, tr) => {
  let total=0, done=0, mins=0;
  tr.levels.forEach((lv,li)=>lv.lessons.forEach((ls,mi)=>{
    total++; mins+=ls.m||0; if(P[`${course.id}:${tr.id}:${li}:${mi}`]) done++;
  }));
  return { total, done, mins, pct: total?Math.round(done/total*100):0 };
};
const levelStats = (course, tr, li) => {
  const lv = tr.levels[li];
  const done = lv.lessons.filter((_,mi)=>P[`${course.id}:${tr.id}:${li}:${mi}`]).length;
  return { total: lv.lessons.length, done, mins: lv.lessons.reduce((a,l)=>a+(l.m||0),0),
    pct: lv.lessons.length?Math.round(done/lv.lessons.length*100):0 };
};
const firstPending = course => flatten(course).find(x => !P[x.key]);
function lessonByKey(key){
  const [cid, tid, li, mi] = key.split(':');
  const c = DB.find(x=>x.id===cid);
  const tr = c?.tracks.find(t=>t.id===tid);
  return { c, tr, lv: tr?.levels[+li], ls: tr?.levels[+li]?.lessons[+mi], li:+li, mi:+mi };
}

/* ================================================================
   ۶) اجزای مشترک
================================================================ */
const bar = p => `<div class="bar"><i style="width:${p}%"></i></div>`;
function ring(pct, size=132, sw=11){
  const r = (size - sw - 8) / 2, c = 2 * Math.PI * r;
  return `<svg viewBox="0 0 ${size} ${size}" style="transform:rotate(-90deg)">
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--well)" stroke-width="${sw}"/>
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--ac)" stroke-width="${sw}"
      stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-pct/100)}" style="transition:stroke-dashoffset .6s"/>
  </svg>`;
}
const goMark = () => `<svg viewBox="0 0 48 48" width="58" height="58"><circle cx="24" cy="24" r="22" fill="var(--ac)"/><text x="24" y="31" text-anchor="middle" font-family="JetBrains Mono" font-weight="700" font-size="16" fill="var(--ac-ink)">Go</text></svg>`;
const courseIcon = c => c.icon === 'go' ? goMark() : `<span class="c-ico">${icon(c.icon||'book')}</span>`;
const faNum = n => fa(String(n));

function lessonRow(course, tr, li, mi){
  const ls = tr.levels[li].lessons[mi];
  const key = `${course.id}:${tr.id}:${li}:${mi}`;
  return `<a class="lesson ${P[key]?'done':''}" href="#/lesson/${course.id}/${tr.id}/${li}/${mi}">
    <span class="num">${fa(String(mi+1).padStart(2,'0'))}</span>
    <span class="lbody"><b>${esc(ls.t)}</b><span>${esc(ls.sum||'')}</span></span>
    <span class="mins">${icon('clock',13)}${fa(ls.m)} دقیقه</span>
    <span class="check">${icon('check',15)}</span>
  </a>`;
}

/* ================================================================
   ۷) صفحات
================================================================ */
function pageHome(){
  const st = allStats(DB);
  const last = store('faraz.last', null);
  let target = last;
  for(const c of DB){
    const p = firstPending(c);
    if(p){ target = target || `#/lesson/${p.course.id}/${p.tr.id}/${p.li}/${p.mi}`; break; }
  }
  target = target || `#/course/${DB[0]?.id||''}`;
  const started = st.done > 0;
  const cta = started
    ? `<a class="btn btn-primary" href="${target}">${icon('play',17)}ادامه از جایی که بودی · ٪${fa(st.pct)}</a>`
    : `<a class="btn btn-primary" href="${target}">${icon('play',17)}شروع کن</a>`;
  return `
  <div class="wrap">
    <section class="hero">
      <div class="rise">
        <span class="badge">${icon('zap',14)}${fa(DB.length)} دوره · فارسی · با ردیابی پیشرفت</span>
        <h1 class="big">مهارتت را مثل یک <em>راه</em> جلو ببر،<br>نه مثل یک کتاب</h1>
        <p class="hero-sub">هر دوره دو مسیر دارد: مسیر اکادمیک برای فهم عمیقِ خودِ مفاهیم، و مسیر حرفه‌ای برای ساختن چیزهایی که تیم‌ها و برندها واقعاً به آن‌ها نیاز دارند — از اولین خط کد تا چیزی که روی سرور اجرا می‌شود. پیشرفتت همیشه در همین مرورگر ذخیره می‌ماند.</p>
        <div class="hero-actions">
          ${cta}
          <a class="btn btn-ghost" href="#/overview">${icon('layers',17)}مرور کلی</a>
          <a class="btn btn-ghost" href="#/courses">${icon('book',17)}همهٔ دوره‌ها</a>
        </div>
      </div>
      <div class="prog-card glass rise" style="animation-delay:.12s">
        <h3>پیشرفت شما در همهٔ دوره‌ها</h3>
        <div class="ring-wrap">${ring(st.pct)}<div class="num">${fa(st.pct)}٪<small>کل مسیر</small></div></div>
        <div class="stat-row">
          <div class="stat"><b>${fa(st.done)}</b><span>درس تکمیل‌شده</span></div>
          <div class="stat"><b>${fa(st.vidsDone)}</b><span>ویدیو دیده‌شده</span></div>
          <div class="stat"><b>${fa(st.total)}</b><span>درس مجموع</span></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-head"><h2 class="sec-title">کتابخانهٔ دوره‌ها</h2><span class="sec-sub">هر دوره، صفحهٔ اختصاصی و پیشرفت جداگانهٔ خودش را دارد</span></div>
      <div class="library">
        ${DB.map(c => {
          const s = stats(c);
          return `<a class="course-card-lg glass" href="#/course/${c.id}">
            <div class="cc-head">${courseIcon(c)}<div><h3>${esc(c.title)}</h3><p>${esc(c.tagline||'')}</p></div></div>
            <div class="mini-tracks">${(c.tracks||[]).map(tr=>{const ts=trackStats(c,tr);return `
              <div class="mini-track"><b>${esc(tr.title)}</b><span>${fa(ts.total)} درس · ٪${fa(ts.pct)} تکمیل</span></div>`}).join('')}
            </div>
            <div class="t-prog">${bar(s.pct)}<span>٪${fa(s.pct)} تکمیل · ${fa(s.done)} از ${fa(s.total)} درس</span></div>
          </a>`;
        }).join('')}
        ${DB_FAILED.map(c=>`
          <div class="course-card-sm glass">
            <span class="c-ico">${icon('x')}</span>
            <div class="cc-body"><h4>${esc(c.id)}</h4><p>فایل دادهٔ این دوره (data/${esc(c.file||c.id+'.json')}) پیدا نشد.</p></div>
            <span class="soon-tag">${icon('lock',12)}ناقص</span>
          </div>`).join('')}
      </div>
    </section>
  </div>`;
}

function pageCourses(){
  return `<div class="wrap">
    <div class="crumb"><a href="#/">خانه</a>${icon('arr',13)}<span>دوره‌ها</span></div>
    <div class="section-head" style="margin-top:22px"><h2 class="sec-title">کتابخانهٔ دوره‌ها</h2><span class="sec-sub">${fa(DB.length)} دورهٔ فعال</span></div>
    ${DB.map(c => {
      const s = stats(c);
      return `<a class="course-card-lg glass" style="margin-bottom:22px" href="#/course/${c.id}">
        <div class="cc-head">${courseIcon(c)}<div><h3>${esc(c.title)}</h3><p>${esc(c.tagline||'')}</p></div></div>
        <div class="mini-tracks">${(c.tracks||[]).map(tr=>{const ts=trackStats(c,tr);return `
          <div class="mini-track"><b>${esc(tr.title)}</b><span>${fa(ts.total)} درس · ٪${fa(ts.pct)} تکمیل</span></div>`}).join('')}
        </div>
        <div class="t-prog">${bar(s.pct)}<span>پیشرفت کل: ٪${fa(s.pct)}</span></div>
      </a>`;
    }).join('')}
  </div>`;
}

function pageCourse(cid){
  const c = DB.find(x=>x.id===cid);
  if(!c) return `<div class="wrap"><div class="empty glass" style="margin-top:30px">${icon('lock')}<h3>این دوره پیدا نشد</h3><p style="margin-top:8px">اگر فایل دادهٔ آن تازه اضافه شده، صفحه را دوباره باز کن.</p></div></div>`;
  const st = stats(c), pend = firstPending(c);
  return `<div class="wrap">
    <div class="crumb"><a href="#/">خانه</a>${icon('arr',13)}<a href="#/courses">دوره‌ها</a>${icon('arr',13)}<span>${esc(c.title)}</span></div>
    <div class="course-head glass rise">
      ${courseIcon(c)}
      <div class="cc-head"><h3>${esc(c.title)}</h3><p>${esc(c.tagline||'')}</p>
        <div class="t-prog">${bar(st.pct)}<span>٪${fa(st.pct)} · ${fa(st.done)} از ${fa(st.total)} درس · ${fa(st.minsDone)} دقیقه</span></div>
      </div>
      <div class="ring-sm">${ring(st.pct, 96, 10)}<div class="num">${fa(st.pct)}٪</div></div>
      ${pend ? `<a class="btn btn-primary" href="#/lesson/${c.id}/${pend.tr.id}/${pend.li}/${pend.mi}">${icon('play',16)}ادامه</a>`
             : `<a class="btn btn-soft" href="#/lesson/${c.id}/${c.tracks[0].id}/0/0">${icon('check',16)}کامل شد — مرور کن</a>`}
    </div>
    ${(c.tracks||[]).map((tr, ti) => {
      const s = trackStats(c, tr);
      return `<section class="track-panel glass rise" style="animation-delay:${ti*.1}s">
      <div class="tp-head">
        <span class="t-ico">${icon(tr.icon)}</span>
        <div><h3>${esc(tr.title)}</h3><p>${esc(tr.desc||'')}</p></div>
        <div class="tp-prog"><b>٪${fa(s.pct)}</b><span>${fa(s.done)} از ${fa(s.total)} درس · ${fa(s.mins)} دقیقه</span></div>
      </div>
      ${tr.levels.map((lv, li) => {
        const ls = levelStats(c, tr, li);
        const open = (ti===0 && li===0 && s.done===0) ? 'open' : '';
        return `<div class="level ${open}">
          <button class="level-head" data-action="toggle-level">
            <span class="chip lv-${lv.chip}">${esc(lv.t)}</span>
            <span><strong>سطح ${fa(li+1)} · ${esc(lv.t)}</strong><span class="lmeta">${fa(ls.total)} درس · ${fa(ls.mins)} دقیقه</span></span>
            <span class="level-prog">${bar(ls.pct)}<span>٪${fa(ls.pct)}</span></span>
            <span class="chev">${icon('chev',17)}</span>
          </button>
          <div class="lessons">${lv.lessons.map((_,mi)=>lessonRow(c,tr,li,mi)).join('')}</div>
        </div>`;
      }).join('')}
    </section>`;
    }).join('')}
  </div>`;
}

/* ---------- بلوک‌های بدنهٔ درس ---------- */
function quizBlock(qk, b, picked){
  const done = picked != null && picked !== undefined;
  const opt = (x,i) => {
    let cls = 'quiz-opt';
    if(done){ if(i === b.a) cls += ' ok'; else if(i === picked) cls += ' no'; }
    return `<button class="${cls}" ${done?'disabled':''} data-action="quiz-pick" data-qk="${qk}" data-i="${i}">${esc(x)}</button>`;
  };
  return `<div class="quiz" data-bi="${b._bi}">
    <div class="quiz-q">${icon('bulb',18)}<b>${esc(b.q)}</b></div>
    <div class="quiz-opts">${b.options.map(opt).join('')}</div>
    ${done ? `<div class="quiz-why ${picked===b.a?'ok':'no'}">${picked===b.a?'<b>درست بود!</b> ':'<b>پاسخ درست: '+esc(b.options[b.a])+'</b> — '}${esc(b.why||'')}</div>` : ''}
  </div>`;
}

function videoBlock(key, ls, lang){
  const groups = { fa:'فارسی', en:'English' };
  if(!lang) lang = (ls.videos?.fa?.length) ? 'fa' : 'en';
  const list = ls.videos?.[lang] || [];
  const cards = list.map((v,i) => {
    const vk = `${key}:${lang}:${i}`;
    const title = v.title || v.q || 'ویدیو';
    const href = v.vid
      ? `https://www.youtube.com/watch?v=${encodeURIComponent(v.vid)}`
      : `https://www.youtube.com/results?search_query=${encodeURIComponent(v.q||title)}`;
    return `<div class="vid-card ${V[vk]?'watched':''}">
      <a class="v-link" href="${href}" target="_blank" rel="noopener" title="${esc(title)}">
        <span class="v-ico">${icon('play',15)}</span>
        <span class="v-body"><b>${esc(title)}</b><span>${[v.channel, v.dur].filter(Boolean).join(' · ') || 'youtube.com'}</span></span>
        ${v.vid ? '' : `<span class="lang-tag">جست‌وجو</span>`}
        <span class="ext">${icon('ext',14)}</span>
      </a>
      <button class="watch-btn ${V[vk]?'on':''}" data-action="vid-watch" data-vk="${vk}" title="دیدم — ذخیره در مرورگر">${icon('check',13)}</button>
    </div>`;
  }).join('');
  return `<section class="vids glass rise" style="animation-delay:.1s" data-lkey="${key}">
    <div class="vid-head">
      <span class="t-ico">${icon('film',20)}</span>
      <div><h3>ویدیوهای مرتبط با این درس</h3><p>انتخاب‌شده برای همین موضوع — تیک «دیدم» در مرورگر ذخیره می‌شود</p></div>
      <div class="vid-tabs">${Object.entries(groups).map(([k,l])=>{
        const n = (ls.videos?.[k]||[]).length;
        return `<button class="${k===lang?'on':''}" data-action="vid-tab" data-lang="${k}">${l} <b>${k==='fa'?fa(n):n}</b></button>`;
      }).join('')}
      </div>
    </div>
    <div class="vid-grid" data-grid>${cards}</div>
  </section>`;
}

function pageLesson(cid, tid, li, mi){
  const c = DB.find(x=>x.id===cid);
  const tr = c?.tracks.find(t=>t.id===tid);
  const lv = tr?.levels[li], ls = lv?.lessons[mi];
  if(!ls) return `<div class="wrap"><div class="empty glass" style="margin-top:30px">${icon('book')}<h3>درسی که دنبالش بودی پیدا نشد</h3></div></div>`;
  const key = `${cid}:${tid}:${li}:${mi}`;
  const flat = flatten(c), idx = flat.findIndex(x=>x.key===key);
  const prev = flat[idx-1], next = flat[idx+1];
  const nav = (x, lbl) => x
    ? `<a class="btn btn-ghost" href="#/lesson/${x.course.id}/${x.tr.id}/${x.li}/${x.mi}">${lbl} · ${esc(x.ls.t)}</a>`
    : `<span class="btn btn-ghost" style="opacity:.4;cursor:default">${lbl} —</span>`;
  const body = ls.body.map((b, bi) => {
    if(b.t==='p') return `<p>${b.x}</p>`;
    if(b.t==='code') return `<div class="codeblock"><div class="cb-head"><span>${esc(b.f||'snippet')}</span>
      <button class="copy-btn" data-action="copy-code">${icon('copy',13)}کپی</button></div>
      <pre><code>${hl(b.x)}</code></pre></div>`;
    if(b.t==='tip') return `<div class="tip">${icon('bulb',19)}<div><b>نکته:</b> ${b.x}
      ${b.list?`<ul>${b.list.map(i=>`<li>${i}</li>`).join('')}</ul>`:''}</div></div>`;
    if(b.t==='quiz'){ b._bi = bi; return quizBlock(`${key}:${bi}`, b, Q[`${key}:${bi}`]); }
    return '';
  }).join('');
  return `<div class="wrap">
    <div class="crumb"><a href="#/">خانه</a>${icon('arr',13)}<a href="#/courses">دوره‌ها</a>${icon('arr',13)}<a href="#/course/${cid}">${esc(c.title)}</a>${icon('arr',13)}<span>${esc(tr.title)}</span></div>
    <div class="lesson-hero glass rise">
      <div class="lmeta">
        <span class="chip lv-${lv.chip}">سطح ${fa(li+1)} · ${esc(lv.t)}</span>
        <span class="mins">${icon('clock',13)}${fa(ls.m)} دقیقه</span>
        <span class="chip ${tr.kind==='academic'?'lv-m':'lv-a'}">${esc(tr.title)}</span>
      </div>
      <h1>${esc(ls.t)}</h1>
      <p class="sum">${esc(ls.sum||'')}</p>
    </div>
    <div class="prose rise" style="animation-delay:.08s">${body}</div>
    ${ls.videos ? videoBlock(key, ls) : ''}
    <div class="lesson-foot rise" style="animation-delay:.14s">
      ${P[key]
        ? `<button class="btn btn-soft" data-action="uncomplete" data-key="${key}">${icon('check',17)}تکمیل شد — برای برگرداندن کلیک کن</button>`
        : `<button class="btn btn-primary" data-action="complete" data-key="${key}">${icon('check',17)}این درس را کامل کردم</button>`}
      <div class="pager">
        ${nav(prev,'درس قبلی')}
        ${nav(next,'درس بعدی')}
      </div>
    </div>
  </div>`;
}

/* ---------- صفحهٔ مرور کلی ---------- */
function pageOverview(){
  const st = allStats(DB);
  return `<div class="wrap">
    <div class="crumb"><a href="#/">خانه</a>${icon('arr',13)}<span>مرور کلی</span></div>
    <div class="ov-head glass rise">
      <div class="cc-head">
        <h3 style="font-size:26px;font-weight:900">مرور کلی همهٔ دوره‌ها</h3>
        <p class="ov-sum">خلاصهٔ کلیدی هر دوره در یک نگاه: چکیده، نکته‌های مهم و برگهٔ تقلب کدها — برای مرور سریع قبل از مصاحبه، پروژه یا چک‌کردن حافظه.</p>
        <div class="t-prog">${bar(st.pct)}<span>٪${fa(st.pct)} · ${fa(st.done)} از ${fa(st.total)} درس · ${fa(st.vidsDone)} ویدیوی دیده‌شده</span></div>
      </div>
      <div class="ring-sm">${ring(st.pct, 96, 10)}<div class="num">${fa(st.pct)}٪</div></div>
    </div>
    ${DB.map((c, ci) => {
      const s = stats(c);
      const ov = c.overview || {};
      const points = ov.keyPoints || [];
      const cheats = ov.cheatsheet || [];
      return `<section class="ov-course glass rise" style="animation-delay:${ci*.08}s">
        <div class="cc-head">
          ${courseIcon(c)}
          <div style="flex:1;min-width:0"><h3>${esc(c.title)}</h3><p>${esc(ov.summary || c.tagline || '')}</p></div>
        </div>
        <div class="t-prog" style="margin-bottom:16px">${bar(s.pct)}<span>٪${fa(s.pct)} تکمیل · ${fa(s.done)} از ${fa(s.total)} درس</span></div>
        ${points.length ? `<div class="ov-points">${points.map(p=>`<span class="kp">${icon('check',15)}<span>${esc(p)}</span></span>`).join('')}</div>` : ''}
        ${c.tracks ? `<details class="sheet">
          <summary>${icon('chev',15)}نقشهٔ کامل درس‌ها</summary>
          <div class="sheet-body">
            ${c.tracks.map(tr=>{
              const ts = trackStats(c,tr);
              return `<div class="map-level"><b>${esc(tr.title)}</b> <span style="font-size:11.5px;color:var(--muted)">· ${fa(ts.done)} از ${fa(ts.total)}</span>
                ${tr.levels.map((lv,li)=>`<div class="map-lessons" style="margin-top:7px"><span class="chip lv-${lv.chip}">${esc(lv.t)}</span>
                  ${lv.lessons.map((l,mi)=>{const k=`${c.id}:${tr.id}:${li}:${mi}`;return `<span class="map-ls ${P[k]?'done':''}">${esc(l.t)}</span>`}).join('')}
                </div>`).join('')}
              </div>`;
            }).join('')}
          </div>
        </details>` : ''}
        ${cheats.length ? `<details class="sheet" style="margin-top:12px">
          <summary>${icon('copy',15)}برگهٔ تقلب — کدهای کلیدی</summary>
          <div class="sheet-body">${cheats.map(b=>`
            <div class="codeblock"><div class="cb-head"><span>${esc(b.f||'cheatsheet')}</span>
              <button class="copy-btn" data-action="copy-code">${icon('copy',13)}کپی</button></div>
            <pre><code>${hl(b.x)}</code></pre></div>`).join('')}
          </div>
        </details>` : ''}
        <div style="margin-top:18px"><a class="btn btn-ghost" href="#/course/${c.id}">${icon('book',15)}صفحهٔ ${esc(c.title)}</a></div>
      </section>`;
    }).join('')}
  </div>`;
}

/* ================================================================
   ۸) مسیریابی (hash router)
================================================================ */
function render(){
  const h = location.hash.replace(/^#\/?/, '');
  const [a, b, c2, d, e] = h.split('/');
  let html, title = `${SITE.name} · ${SITE.tagline||''}`, navId = 'home';
  if(h === ''){ html = pageHome(); }
  else if(a === 'courses'){ html = pageCourses(); navId = 'courses'; title = `دوره‌ها · ${SITE.name}`; }
  else if(a === 'overview'){ html = pageOverview(); navId = 'overview'; title = `مرور کلی · ${SITE.name}`; }
  else if(a === 'course'){ html = pageCourse(b); navId = 'courses'; title = `${DB.find(x=>x.id===b)?.title ?? ''} · ${SITE.name}`; }
  else if(a === 'lesson'){
    html = pageLesson(b, c2, +d, +e); navId = 'courses';
    const lk = lessonByKey(`${b}:${c2}:${+d}:${+e}`);
    title = `${lk.ls?.t ?? 'درس'} · ${lk.c?.title ?? ''} · ${SITE.name}`;
    localStorage.setItem('faraz.last', location.hash);
  }
  else html = pageHome();
  document.getElementById('app').innerHTML = html;
  document.title = title;
  document.querySelectorAll('.nav a').forEach(x => x.classList.toggle('active', x.dataset.nav === navId));
  window.scrollTo({top:0});
}
window.addEventListener('hashchange', render);

/* ================================================================
   ۹) رویدادها (event delegation)
================================================================ */
let toastTimer;
function toast(msg){
  const t = document.getElementById('toast');
  document.getElementById('toast-ico').innerHTML = icon('check',17);
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('show'), 2600);
}
const panel = () => document.getElementById('panel');

document.addEventListener('click', e => {
  const el = e.target.closest('[data-action]');
  if(!el || el.dataset.action === 'toggle-panel'){
    if(!e.target.closest('#panel') && !el){ panel().classList.remove('open'); return; }
  }
  if(!el) return;
  const act = el.dataset.action;

  if(act === 'toggle-panel') panel().classList.toggle('open');
  if(act === 'quick-theme'){
    const cur = document.documentElement.dataset.theme;
    prefs.theme = cur === 'dark' ? 'light' : 'dark';
    applyPrefs(); savePrefs(); toast(cur === 'dark' ? 'حالت روشن فعال شد' : 'حالت تیره فعال شد');
  }
  if(act === 'set-theme'){ prefs.theme = el.dataset.val; applyPrefs(); savePrefs(); }
  if(act === 'set-skin'){ prefs.skin = el.dataset.val; applyPrefs(); savePrefs(); toast('سبک ظاهری عوض شد'); }
  if(act === 'set-accent'){ prefs.accent = el.dataset.val; applyPrefs(); savePrefs(); toast('رنگ اصلی عوض شد'); }
  if(act === 'reset-radius'){ prefs.radius = 16; applyPrefs(); savePrefs(); toast('گردی گوشه‌ها به حالت پیش‌فرض برگشت'); }
  if(act === 'reset-progress'){
    if(confirm('همهٔ پیشرفت‌ها، ویدیوها و آزمون‌های ذخیره‌شده پاک شود؟')){
      P = {}; V = {}; Q = {};
      saveProg(); saveVids(); saveQuiz(); render(); toast('همهٔ پیشرفت‌ها پاک شد');
    }
  }
  if(act === 'toggle-level') el.closest('.level').classList.toggle('open');
  if(act === 'complete'){ P[el.dataset.key] = true; saveProg(); render(); toast('آفرین! درس تکمیل شد'); }
  if(act === 'uncomplete'){ delete P[el.dataset.key]; saveProg(); render(); }
  if(act === 'copy-code'){
    const pre = el.closest('.codeblock').querySelector('pre');
    navigator.clipboard.writeText(pre.textContent).then(()=>toast('کد در کلیپ‌بورد کپی شد'));
  }
  if(act === 'vid-watch'){
    const vk = el.dataset.vk;
    if(V[vk]) delete V[vk]; else V[vk] = true;
    saveVids();
    el.classList.toggle('on', !!V[vk]);
    el.closest('.vid-card').classList.toggle('watched', !!V[vk]);
  }
  if(act === 'vid-tab'){
    const sec = el.closest('.vids');
    const lk = lessonByKey(sec.dataset.lkey);
    if(lk.ls) sec.outerHTML = videoBlock(sec.dataset.lkey, lk.ls, el.dataset.lang);
  }
  if(act === 'quiz-pick'){
    const qk = el.dataset.qk, pick = +el.dataset.i;
    Q[qk] = pick; saveQuiz();
    const box = el.closest('.quiz');
    const lk = lessonByKey(qk.split(':').slice(0,4).join(':'));
    const bi = +box.dataset.bi;
    const b = lk.ls?.body[bi];
    if(b) box.outerHTML = quizBlock(qk, b, pick);
  }
});

document.getElementById('radius-input')?.addEventListener('input', e => {
  prefs.radius = +e.target.value; applyPrefs(); savePrefs();
});
document.getElementById('color-input')?.addEventListener('input', e => {
  prefs.color = e.target.value; prefs.accent = 'custom';
  applyPrefs(); savePrefs();
});
document.getElementById('color-input')?.addEventListener('change', () => {
  toast('رنگ دلخواهت ذخیره شد');
});

/* ================================================================
   ۱۰) راه‌اندازی
================================================================ */
(function initUI(){
  const pb = document.getElementById('panel-btn');
  if(pb) pb.innerHTML = icon('sliders',19);
  const pi = document.getElementById('panel-ico');
  if(pi) pi.innerHTML = icon('sliders',17);
  document.querySelectorAll('[data-ico]').forEach(s => s.innerHTML = icon(s.dataset.ico,15));
  applyPrefs();
})();

(async function boot(){
  const app = document.getElementById('app');
  try{
    await loadData();
    applySite();
    render();
  }catch(err){
    console.error(err);
    app.innerHTML = `<div class="wrap"><div class="empty glass" style="margin-top:60px">
      ${icon('x',40)}<h3>داده‌ها بارگذاری نشد</h3>
      <p style="margin-top:10px;font-size:14px">این سایت داده‌هایش را از پوشهٔ <b>data/</b> می‌خواند؛ برای همین باید از طریق یک وب‌سرور باز شود
      (باز کردن مستقیم فایل index.html کار نمی‌کند).<br>
      مثلاً در پوشهٔ پروژه: <code style="font-family:var(--mono);direction:ltr;display:inline-block">python -m http.server 8080</code></p>
    </div></div>`;
  }
})();
