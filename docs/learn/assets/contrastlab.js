// Contrast lab: pick a color for each role and see every pair it touches pass or fail WCAG
// contrast (C2), plus a preview under simulated color vision deficiency (Machado 2009,
// severity 1) to test two colors that must mean different things (C3, C4).
// Markup: <div class="contrastlab" data-presets='[{"name":"…","bg":"#…",…}]'></div>
// Roles: bg, text, muted, primary, action, field, onfield, peach, highlight.
// Styles: .contrastlab in course.css (presets and checks reuse the type lab's classes).
(() => {
  const ROLES = [
    ['bg', 'Ground'], ['text', 'Ink'], ['muted', 'Muted'], ['primary', 'Primary'], ['action', 'Action'],
    ['field', 'Field'], ['onfield', 'Text on Field'], ['peach', 'Peach'], ['highlight', 'Highlight'],
  ];
  // [foreground, background, minimum, what it's for]
  const PAIRS = [
    ['text', 'bg', 7, 'Ink on Ground: body text (C2, P2)'],
    ['muted', 'bg', 4.5, 'Muted on Ground: captions (C2)'],
    ['primary', 'bg', 4.5, 'Primary on Ground: headings, statements'],
    ['action', 'bg', 4.5, 'Action on Ground: links'],
    ['onfield', 'field', 7, 'Text on Field: body text in a chapter'],
    ['peach', 'field', 4.5, 'Peach on Field: links in a chapter'],
    ['highlight', 'field', 3, 'Highlight on Field: the “now” marker (WCAG 1.4.11)'],
  ];
  const SIM = {
    normal: null,
    protan: [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
    deutan: [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.011820, 0.042940, 0.968881]],
    gray: 'gray',
  };

  const lin = c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const gam = c => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
  const rgb = hex => [1, 3, 5].map(i => lin(parseInt(hex.slice(i, i + 2), 16) / 255));
  const hex = l => '#' + l.map(c => Math.round(Math.min(1, Math.max(0, gam(c))) * 255).toString(16).padStart(2, '0')).join('');
  const lum = l => 0.2126 * l[0] + 0.7152 * l[1] + 0.0722 * l[2];
  const ratio = (a, b) => { const [x, y] = [lum(rgb(a)), lum(rgb(b))].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  const sim = (h, mode) => {
    const m = SIM[mode]; if (!m) return h;
    const l = rgb(h);
    if (m === 'gray') { const y = lum(l); return hex([y, y, y]); }
    return hex(m.map(r => r[0] * l[0] + r[1] * l[1] + r[2] * l[2]));
  };
  const fix = r => Math.floor(r * 100) / 100; // WCAG doesn't round up: 4.499 fails 4.5

  document.querySelectorAll('.contrastlab').forEach(lab => {
    const presets = JSON.parse(lab.dataset.presets || '[]');
    const st = Object.assign({}, presets[0]); let mode = 'normal';
    lab.innerHTML = `
      <div class="cl-roles">${ROLES.map(([k, name]) =>
        `<label><input type="color" data-k="${k}"> <span>${name} <output data-o="${k}"></output></span></label>`).join('')}</div>
      <div class="tl-presets"></div>
      <div class="cl-modes" role="group" aria-label="Preview as">
        <button type="button" data-m="normal" aria-pressed="true">Typical vision</button><button type="button" data-m="protan" aria-pressed="false">Protanopia</button><button type="button" data-m="deutan" aria-pressed="false">Deuteranopia</button><button type="button" data-m="gray" aria-pressed="false">Grayscale</button>
      </div>
      <div class="cl-preview" aria-hidden="true">
        <div class="cl-ground"><p class="cl-h">Phuru Shekar</p><p class="cl-body">Body text sits in Ink on the Ground, and most of the page is this.</p><p class="cl-muted">A caption in Muted</p><p class="cl-link">A link in Action</p><p class="cl-pair"><span class="cl-a">Done</span> <span class="cl-b">Paused</span> <span class="cl-note">← if Primary and Action meant these, could you tell?</span></p></div>
        <div class="cl-field"><p class="cl-on">A chapter on the Field, in its own text color.</p><p><span class="cl-dot"></span> <span class="cl-peach">A link in Peach</span></p></div>
      </div>
      <ul class="tl-checks" aria-live="polite"></ul>
      <p class="cl-meaning" aria-live="polite"></p>`;
    const $ = s => lab.querySelector(s);

    const render = () => {
      lab.querySelectorAll('[data-k]').forEach(i => { i.value = st[i.dataset.k]; });
      lab.querySelectorAll('[data-o]').forEach(o => { o.textContent = st[o.dataset.o]; });
      const c = k => sim(st[k], mode), pv = $('.cl-preview');
      pv.querySelector('.cl-ground').style.cssText = `background:${c('bg')};color:${c('text')}`;
      pv.querySelector('.cl-h').style.color = c('primary');
      pv.querySelector('.cl-muted').style.color = c('muted');
      pv.querySelector('.cl-link').style.color = c('action');
      pv.querySelector('.cl-a').style.background = c('primary');
      pv.querySelector('.cl-b').style.background = c('action');
      pv.querySelector('.cl-a').style.color = pv.querySelector('.cl-b').style.color = c('bg');
      pv.querySelector('.cl-note').style.color = c('muted');
      pv.querySelector('.cl-field').style.cssText = `background:${c('field')};color:${c('onfield')}`;
      pv.querySelector('.cl-dot').style.background = c('highlight');
      pv.querySelector('.cl-peach').style.color = c('peach');

      const rows = PAIRS.map(([f, b, min, what]) => { const r = fix(ratio(st[f], st[b])); return [r >= min, r, min, what]; });
      $('.tl-checks').innerHTML = rows.map(([ok, r, min, what]) =>
        `<li data-ok="${ok}"><span class="tl-mark">${ok ? '✓' : '✗'}</span> ${what}: ${r.toFixed(2)}:1 <span class="tl-want">${ok ? '' : '· want ' + min + ':1'}</span></li>`).join('');
      $('.tl-checks').dataset.all = rows.every(r => r[0]);
      $('.tl-checks').dataset.count = rows.length;
      // two meanings: compare Primary and Action as fills under each simulation
      const worst = Math.min(...['protan', 'deutan'].map(m => ratio(sim(st.primary, m), sim(st.action, m))));
      $('.cl-meaning').innerHTML = worst >= 3
        ? `<strong>Primary and Action can mean different things:</strong> ${fix(worst).toFixed(2)}:1 apart for red-green colorblind eyes (C4 wants 3:1).`
        : `<strong>Primary and Action can’t be two meanings on their own:</strong> only ${fix(worst).toFixed(2)}:1 apart for red-green colorblind eyes (C4 wants 3:1). Add a word, icon or shape (C3), or split them by lightness.`;
    };

    lab.addEventListener('input', e => { if (e.target.dataset.k) { st[e.target.dataset.k] = e.target.value; render(); } });
    lab.querySelectorAll('[data-m]').forEach(b => b.addEventListener('click', () => {
      mode = b.dataset.m;
      lab.querySelectorAll('[data-m]').forEach(x => x.setAttribute('aria-pressed', x === b));
      render();
    }));
    const pz = $('.tl-presets');
    presets.forEach(p => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = p.name;
      b.addEventListener('click', () => { Object.assign(st, p); render(); });
      pz.appendChild(b);
    });
    render();
  });
})();
