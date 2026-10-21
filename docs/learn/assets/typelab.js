// Type lab: adjust column width, body size, line spacing and headline size, and see each
// type rule pass or fail, measured from the real rendering.
// Markup: <div class="typelab" data-presets='[{"name":"…","col":…,"body":…,"lh":…,"head":…,"text":"…"}]'></div>
// Styles: .typelab in course.css.
(() => {
  const html = `
    <div class="tl-controls">
      <label>Column width <output data-o="col"></output><input type="range" data-k="col" min="260" max="900" step="10"></label>
      <label>Body size <output data-o="body"></output><input type="range" data-k="body" min="12" max="26" step="1"></label>
      <label>Line spacing <output data-o="lh"></output><input type="range" data-k="lh" min="1" max="2" step="0.05"></label>
      <label>Headline size <output data-o="head"></output><input type="range" data-k="head" min="16" max="160" step="2"></label>
      <label class="tl-text">Headline text <textarea data-k="text" rows="2"></textarea></label>
      <div class="tl-presets"></div>
    </div>
    <div class="tl-stage">
      <div class="tl-col">
        <p class="tl-head"></p>
        <p class="tl-body">Typography is mostly body text, so start there. Set it big enough to read without leaning in, give each line room to breathe, and keep lines short enough that the eye finds the start of the next one without hunting. Then let the headline be truly large, so the page has one obvious place to begin, and keep it to two lines at every width.</p>
      </div>
    </div>
    <ul class="tl-checks" aria-live="polite"></ul>`;

  document.querySelectorAll('.typelab').forEach(lab => {
    lab.innerHTML = html;
    const presets = JSON.parse(lab.dataset.presets || '[]');
    const st = Object.assign({ col: 640, body: 18, lh: 1.5, head: 72, text: 'Type that does the work' }, presets[0] || {});
    const $ = s => lab.querySelector(s);
    const col = $('.tl-col'), head = $('.tl-head'), body = $('.tl-body'), checks = $('.tl-checks');

    const fmt = { col: v => v + 'px', body: v => v + 'px', lh: v => (+v).toFixed(2), head: v => v + 'px' };

    const measureChars = () => {
      // average characters per line = column width / average glyph width of running text
      const probe = document.createElement('span');
      probe.textContent = 'the quick brown fox jumps over a lazy dog and then rests '.repeat(2);
      probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font:inherit';
      body.appendChild(probe);
      const per = probe.getBoundingClientRect().width / probe.textContent.length;
      probe.remove();
      return Math.round(col.getBoundingClientRect().width / per);
    };
    const lines = el => Math.round(el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight));

    const render = () => {
      // the column can't be wider than the stage: cap the slider so its label stays true
      const max = Math.floor(lab.querySelector('.tl-stage').clientWidth / 10) * 10;
      const slider = lab.querySelector('[data-k=col]');
      slider.max = max;
      st.col = Math.min(st.col, max);
      col.style.width = st.col + 'px';
      body.style.fontSize = st.body + 'px';
      body.style.lineHeight = st.lh;
      head.style.fontSize = st.head + 'px';
      head.textContent = st.text;
      lab.querySelectorAll('[data-k]').forEach(i => { if (i.value != st[i.dataset.k]) i.value = st[i.dataset.k]; });
      lab.querySelectorAll('[data-o]').forEach(o => { o.textContent = fmt[o.dataset.o](st[o.dataset.o]); });

      const chars = measureChars(), hl = lines(head), ratio = st.head / st.body;
      const rows = [
        [st.body >= 16 && st.body <= 20, `Body ${st.body}px`, '16–20px (T3)'],
        [st.lh >= 1.5 && st.lh <= 1.7, `Line spacing ${(+st.lh).toFixed(2)}`, '1.5–1.7 (T3, P7); WCAG asks for 1.5'],
        [chars >= 45 && chars <= 75, `About ${chars} characters per line`, '45–75 (P7)'],
        [ratio >= 3, `Headline ${ratio.toFixed(1)}× body`, 'at least 3×; strong sites run about 4× (T3)'],
        [hl <= 2, `Headline on ${hl} line${hl === 1 ? '' : 's'}`, '2 or fewer at every width (T3)'],
      ];
      checks.innerHTML = rows.map(([ok, got, want]) =>
        `<li data-ok="${ok}"><span class="tl-mark">${ok ? '✓' : '✗'}</span> ${got} <span class="tl-want">${ok ? '' : '· want ' + want}</span></li>`).join('');
      const all = rows.every(r => r[0]);
      checks.dataset.all = all;
    };

    lab.querySelectorAll('[data-k]').forEach(i => i.addEventListener('input', () => {
      st[i.dataset.k] = i.dataset.k === 'text' ? i.value : +i.value;
      render();
    }));
    const pz = $('.tl-presets');
    presets.forEach(p => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = p.name;
      b.addEventListener('click', () => { Object.assign(st, p); render(); });
      pz.appendChild(b);
    });
    addEventListener('resize', render);
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(render);
    render();
  });
})();
