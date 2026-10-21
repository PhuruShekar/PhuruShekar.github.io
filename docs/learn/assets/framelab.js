// Frame lab: a desktop page drawn as a 1280px wireframe and scaled to fit. Move the outer
// margins, the gaps and where blocks start, and see each frame rule pass or fail, measured
// from the rendered wireframe. Dashed lines mark every left edge.
// Markup: <div class="framelab" data-presets='[{"name":"…","ml":…,"mr":…,"gap":…,"hgap":…,"inset":…,"proj":…,"quote":…,"close":"left|center"}]'></div>
// Styles: .framelab in course.css (controls and checks reuse the type lab's classes).
(() => {
  const W = 1280;
  const starts = '<option value="0">at the margin</option><option value="96">96px in</option><option value="192">192px in, like a rail</option>';
  const html = `
    <div class="tl-controls">
      <label>Left margin <output data-o="ml"></output><input type="range" data-k="ml" min="0" max="96" step="4"></label>
      <label>Right margin <output data-o="mr"></output><input type="range" data-k="mr" min="0" max="96" step="4"></label>
      <label>Gap between sections <output data-o="gap"></output><input type="range" data-k="gap" min="16" max="280" step="8"></label>
      <label>Gap under each heading <output data-o="hgap"></output><input type="range" data-k="hgap" min="8" max="120" step="4"></label>
      <label>Journey and About start <select data-k="inset">${starts}</select></label>
      <label>Projects start <select data-k="proj">${starts}</select></label>
      <label>Pull quote <select data-k="quote"><option value="0">on its section’s edge</option><option value="40">indented 40px</option></select></label>
      <label>Closing line <select data-k="close"><option value="left">left-aligned</option><option value="center">centered</option></select></label>
      <div class="tl-presets"></div>
    </div>
    <div class="fl-stage" aria-hidden="true"><div class="fl-page">
      <div class="fl-sec fl-hero"><div class="fl-t fl-name"></div><div class="fl-t fl-sub"></div><div class="fl-t fl-sub"></div></div>
      <div class="fl-sec"><div class="fl-t fl-h"></div><div class="fl-c fl-in"><div class="fl-t fl-line"></div><div class="fl-t fl-line"></div><div class="fl-t fl-line"></div><div class="fl-t fl-line"></div></div></div>
      <div class="fl-sec"><div class="fl-t fl-h"></div><div class="fl-c fl-proj"><div class="fl-list"><div class="fl-t fl-big"></div><div class="fl-t fl-big"></div><div class="fl-t fl-big"></div><div class="fl-t fl-big"></div></div><div class="fl-pic"></div></div></div>
      <div class="fl-sec"><div class="fl-t fl-h"></div><div class="fl-c fl-in"><div class="fl-t fl-quote"></div><div class="fl-t fl-line"></div><div class="fl-t fl-line"></div><div class="fl-t fl-line"></div></div></div>
      <div class="fl-sec fl-close"><div class="fl-t fl-end"></div></div>
      <div class="fl-guides"></div>
    </div></div>
    <p class="meta fl-legend">A desktop page, 1280px wide, drawn small. Bars are text; the box is a picture; dashed lines are left edges.</p>
    <ul class="tl-checks" aria-live="polite"></ul>`;

  document.querySelectorAll('.framelab').forEach(lab => {
    lab.innerHTML = html;
    const presets = JSON.parse(lab.dataset.presets || '[]');
    const st = Object.assign({ ml: 32, mr: 32, gap: 160, hgap: 24, inset: 0, proj: 0, quote: 0, close: 'left' }, presets[0] || {});
    const $ = s => lab.querySelector(s), $$ = s => [...lab.querySelectorAll(s)];
    const stage = $('.fl-stage'), page = $('.fl-page'), guides = $('.fl-guides'), checks = $('.tl-checks');
    const secs = $$('.fl-sec');

    // offsetLeft/Top are relative to .fl-page (the positioned ancestor) and ignore the scale
    const bottom = el => Math.max(...[...el.querySelectorAll('.fl-t, .fl-pic')].map(e => e.offsetTop + e.offsetHeight));

    const render = () => {
      page.style.padding = `64px ${st.mr}px 64px ${st.ml}px`;
      secs.forEach((s, i) => { if (i) s.style.marginTop = st.gap + 'px'; });
      $$('.fl-h').forEach(h => { h.style.marginBottom = st.hgap + 'px'; });
      $$('.fl-in').forEach(c => { c.style.marginLeft = st.inset + 'px'; });
      $('.fl-proj').style.marginLeft = st.proj + 'px';
      $('.fl-quote').style.marginLeft = st.quote + 'px';
      $('.fl-end').style.margin = st.close === 'center' ? '0 auto' : '0';
      lab.querySelectorAll('[data-k]').forEach(i => { if (i.value != st[i.dataset.k]) i.value = st[i.dataset.k]; });
      lab.querySelectorAll('[data-o]').forEach(o => { o.textContent = st[o.dataset.o] + 'px'; });

      const scale = stage.clientWidth / W;
      page.style.transform = `scale(${scale})`;
      stage.style.height = page.offsetHeight * scale + 'px';

      // measure
      const L = $('.fl-name').offsetLeft, pic = $('.fl-pic');
      const R = W - (pic.offsetLeft + pic.offsetWidth);
      const edges = [];
      $$('.fl-t').filter(t => !(t.classList.contains('fl-end') && st.close === 'center')).forEach(t => {
        if (!edges.some(x => Math.abs(x - t.offsetLeft) < 3)) edges.push(t.offsetLeft);
      });
      guides.innerHTML = edges.map(x => `<i style="left:${x}px"></i>`).join('');
      const gaps = secs.slice(1).map((s, i) => s.offsetTop - bottom(secs[i]));
      const gap = Math.min(...gaps);
      const ratio = Math.min(...$$('.fl-h').map(h => {
        const sec = h.parentElement, prev = secs[secs.indexOf(sec) - 1];
        const above = h.offsetTop - bottom(prev);
        const below = h.nextElementSibling.offsetTop - (h.offsetTop + h.offsetHeight);
        return above / Math.max(below, 1);
      }));

      const rows = [
        [L === R, `Margins ${L === R ? 'match' : `differ: ${L}px left, ${R}px right`}`, 'the same on both sides (T4)'],
        [L >= 16 && L <= 32 && R >= 16 && R <= 32, `Outer margins ${L}px and ${R}px`, '16–32px each (T4, P6)'],
        [edges.length <= 3, `${edges.length} left edge${edges.length === 1 ? '' : 's'}`, '3 or fewer, shared down the page (T4)'],
        [gap >= 120 && gap <= 240, `Sections ${gap}px apart`, '120–240px on desktop (T4)'],
        [ratio >= 2, `Headings ${ratio.toFixed(1)}× closer to their own text than to the section above`, 'clearly closer; this lab asks for 2× (proximity)'],
      ];
      checks.innerHTML = rows.map(([ok, got, want]) =>
        `<li data-ok="${ok}"><span class="tl-mark">${ok ? '✓' : '✗'}</span> ${got} <span class="tl-want">${ok ? '' : '· want ' + want}</span></li>`).join('');
      checks.dataset.all = rows.every(r => r[0]);
    };

    lab.querySelectorAll('[data-k]').forEach(i => i.addEventListener('input', () => {
      st[i.dataset.k] = i.dataset.k === 'close' ? i.value : +i.value;
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
    render();
  });
})();
