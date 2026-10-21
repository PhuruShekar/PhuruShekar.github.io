// Review log: a heuristic-review worksheet (5-ship.md H11). Scope the review, log each problem with
// its heuristic, severity and fix, then copy the whole log as text to paste into the chat.
// Drafts are kept in this browser only (localStorage), per data-key.
// Markup: <div class="reviewlog" data-key="…"></div>   Styles: .reviewlog in course.css.
(() => {
  const H = ['H1 Visibility of system status', 'H2 Match the real world', 'H3 User control and freedom',
    'H4 Consistency and standards', 'H5 Error prevention', 'H6 Recognition over recall',
    'H7 Flexibility and efficiency', 'H8 Aesthetic and minimalist design', 'H9 Recover from errors',
    'H10 Help and documentation'];
  const SEV = ['0 not a problem', '1 cosmetic', '2 minor', '3 major', '4 catastrophe'];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const opts = (list, v) => '<option value="">Choose…</option>' + list.map((t, i) => `<option value="${i}"${String(v) === String(i) ? ' selected' : ''}>${t}</option>`).join('');

  document.querySelectorAll('.reviewlog').forEach((log, n) => {
    const key = 'reviewlog:' + (log.dataset.key || n);
    let st = { task: '', user: '', device: '', rows: [] };
    try { st = Object.assign(st, JSON.parse(localStorage.getItem(key)) || {}); } catch {}
    if (!st.rows.length) st.rows.push({});
    const save = () => { try { localStorage.setItem(key, JSON.stringify(st)); } catch {} };

    const render = () => {
      log.innerHTML = `
        <div class="rl-scope">
          <label>Task <input data-s="task" value="${esc(st.task)}" placeholder="Turn on logging…"></label>
          <label>Who <input data-s="user" value="${esc(st.user)}" placeholder="A new customer…"></label>
          <label>Device <input data-s="device" value="${esc(st.device)}" placeholder="Laptop, Chrome…"></label>
        </div>
        <ol class="rl-rows">${st.rows.map((r, i) => `
          <li class="rl-row" data-i="${i}">
            <label class="rl-where">Where <input data-f="where" value="${esc(r.where || '')}" placeholder="Step 3, the Save button…"></label>
            <label>Heuristic <select data-f="h">${opts(H, r.h ?? '')}</select></label>
            <label>Severity <select data-f="sev">${opts(SEV, r.sev ?? '')}</select></label>
            <label class="rl-wide">What goes wrong <textarea data-f="problem" rows="2">${esc(r.problem || '')}</textarea></label>
            <label class="rl-wide">Fix <input data-f="fix" value="${esc(r.fix || '')}"></label>
            <button type="button" class="rl-remove" aria-label="Remove problem ${i + 1}">Remove</button>
          </li>`).join('')}
        </ol>
        <div class="rl-actions">
          <button type="button" class="rl-add">Add a problem</button>
          <button type="button" class="rl-copy">Copy as text</button>
          <span class="rl-status meta" aria-live="polite"></span>
        </div>`;
    };

    const text = () => {
      const rows = st.rows.filter(r => r.where || r.problem)
        .sort((a, b) => (+b.sev || 0) - (+a.sev || 0));
      return [`Heuristic review: ${st.task || '(task)'} · ${st.user || '(who)'} · ${st.device || '(device)'}`, '',
        '| Where | Heuristic | What goes wrong | Severity | Fix |', '|---|---|---|---|---|',
        ...rows.map(r => `| ${r.where || ''} | ${r.h !== undefined && r.h !== '' ? H[r.h] : '?'} | ${(r.problem || '').replace(/\n/g, ' ')} | ${r.sev !== undefined && r.sev !== '' ? SEV[r.sev] : '?'} | ${r.fix || ''} |`)
      ].join('\n');
    };

    log.addEventListener('input', e => {
      const t = e.target;
      if (t.dataset.s) st[t.dataset.s] = t.value;
      if (t.dataset.f) st.rows[t.closest('.rl-row').dataset.i][t.dataset.f] = t.value;
      save();
    });
    log.addEventListener('click', async e => {
      const t = e.target;
      if (t.classList.contains('rl-add')) {
        st.rows.push({}); save(); render();
        log.querySelector('.rl-row:last-child input').focus();
      } else if (t.classList.contains('rl-remove')) {
        st.rows.splice(+t.closest('.rl-row').dataset.i, 1);
        if (!st.rows.length) st.rows.push({});
        save(); render();
        log.querySelector('.rl-add').focus();
      } else if (t.classList.contains('rl-copy')) {
        const status = log.querySelector('.rl-status');
        try { await navigator.clipboard.writeText(text()); t.textContent = 'Copied'; status.textContent = 'Copied. Paste it in the chat.'; }
        catch { status.textContent = 'Couldn’t copy here. Select the text below and copy it.'; log.querySelector('.rl-fallback')?.remove(); log.insertAdjacentHTML('beforeend', `<pre class="rl-fallback"><code>${esc(text())}</code></pre>`); }
        setTimeout(() => { t.textContent = 'Copy as text'; }, 2000);
      }
    });
    render();
  });
})();
