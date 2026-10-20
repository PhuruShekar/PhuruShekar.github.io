(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const osDark = matchMedia('(prefers-color-scheme: dark)');
  // GoatCounter counts features, never people (portfolio-ideas.md). Safe when the script is blocked.
  const count = path => { try { window.goatcounter && goatcounter.count && goatcounter.count({ path, event: true }); } catch {} };

  /* ---------- theme: OS by default, toggle overrides and is remembered (C6) ---------- */
  const themeBtn = document.querySelector('.theme');
  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : osDark.matches;
  const themeMeta = [...document.querySelectorAll('meta[name="theme-color"]')];
  const syncTheme = () => {
    const dark = isDark();
    themeBtn.setAttribute('aria-pressed', dark);
    // A saved choice must win over the OS in the browser chrome too.
    themeMeta.forEach(m => m.setAttribute('content', root.dataset.theme ? (dark ? '#0d2419' : '#fffdf8') : (m.media.includes('dark') ? '#0d2419' : '#fffdf8')));
    if (chars) { build(); start(); }
  };
  themeBtn.addEventListener('click', () => {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch {}
    syncTheme();
  });
  osDark.addEventListener('change', syncTheme);

  /* ---------- projects: tiles open in place; #slug opens one on load (V7, I1) ---------- */
  const tiles = [...document.querySelectorAll('.tile')].filter(t => t.querySelector('.more'));
  const setOpen = (tile, open) => {
    const btn = tile.querySelector('.toggle');
    tile.classList.toggle('open', open);
    tile.querySelector('.more').hidden = !open;
    btn.setAttribute('aria-expanded', open);
  };
  tiles.forEach(tile => {
    const more = tile.querySelector('.more');
    const name = tile.querySelector('h3').textContent;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'toggle';
    btn.setAttribute('aria-controls', more.id);
    btn.innerHTML = `<span>More about ${name}</span><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M1.5 4 6 8.5 10.5 4" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;
    tile.querySelector('.links').after(btn);
    setOpen(tile, false);
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      setOpen(tile, open);
      history.replaceState(null, '', open ? '#' + tile.id : '#projects');
      if (open) {
        count('project-open-' + tile.id);
        tile.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
      }
    });
  });
  const openFromHash = () => {
    const tile = tiles.find(t => '#' + t.id === location.hash);
    if (!tile) return;
    setOpen(tile, true);
    requestAnimationFrame(() => tile.scrollIntoView({ block: 'start' }));
  };
  addEventListener('hashchange', openFromHash);
  openFromHash();
  // A reload restores the old scroll position after load; go back to the shared tile.
  addEventListener('load', () => setTimeout(openFromHash, 0));

  /* ---------- explore: tabs in the URL (V3, I1); each tab loads its data when first shown ---------- */
  const explore = document.getElementById('explore');
  const tabs = [...explore.querySelectorAll('.tabs a')];
  const panels = tabs.map(t => document.querySelector(t.hash));
  const tabNames = tabs.map(t => t.dataset.tab);
  const status = document.getElementById('explore-status');
  const announce = msg => { status.textContent = ''; setTimeout(() => { status.textContent = msg; }, 50); };
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`);
  const counted = new Set(), loaded = new Set();
  let current = 0, exploreSeen = false;
  const LEAFLET = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/';
  const maps = []; // Leaflet maps, resized when their tab shows

  explore.classList.add('tabbed');
  explore.querySelector('.tabs').setAttribute('role', 'tablist');
  explore.querySelector('.tabs').setAttribute('aria-label', 'Explore');
  tabs.forEach((t, i) => {
    t.id = 'tab-' + tabNames[i];
    t.href = '#explore/' + tabNames[i];
    t.setAttribute('role', 'tab');
    t.setAttribute('aria-controls', panels[i].id);
    panels[i].setAttribute('role', 'tabpanel');
    panels[i].setAttribute('aria-labelledby', t.id);
    panels[i].tabIndex = 0;
  });

  const select = (i, { focus, url, user } = {}) => {
    current = i;
    tabs.forEach((t, k) => {
      t.setAttribute('aria-selected', k === i);
      t.tabIndex = k === i ? 0 : -1;
      panels[k].hidden = k !== i;
    });
    if (focus) tabs[i].focus();
    if (url) history.replaceState(null, '', '#explore/' + tabNames[i]);
    if (user && !counted.has(i)) { counted.add(i); count('explore-' + tabNames[i]); }
    maps.forEach(m => m.invalidateSize());
    if (exploreSeen) loadTab(i);
  };
  tabs.forEach((t, i) => t.addEventListener('click', e => { e.preventDefault(); select(i, { url: true, user: true }); }));
  explore.querySelector('.tabs').addEventListener('keydown', e => {
    const n = tabs.length;
    const to = { ArrowRight: current + 1, ArrowLeft: current - 1 + n, Home: 0, End: n - 1 }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    select(to % n, { focus: true, url: true, user: true });
  });
  const tabFromHash = () => {
    const m = location.hash.match(/^#explore\/([a-z]+)$/);
    return m ? tabNames.indexOf(m[1]) : -1;
  };
  const openTabFromHash = () => {
    const i = tabFromHash();
    if (i < 0) return;
    select(i, { user: true });
    requestAnimationFrame(() => explore.querySelector('h2').scrollIntoView({ block: 'start' }));
  };
  select(Math.max(0, tabFromHash()));
  addEventListener('hashchange', openTabFromHash);
  openTabFromHash();
  addEventListener('load', () => setTimeout(openTabFromHash, 0));
  // Nothing loads (no places.json, map, or Last.fm call) until the section is near the screen.
  new IntersectionObserver(([e], io) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    exploreSeen = true;
    loadTab(current);
  }, { rootMargin: '200px 0px' }).observe(explore);

  function loadTab(i) {
    const name = tabNames[i];
    if (loaded.has(name)) return;
    loaded.add(name);
    if (name === 'food' || name === 'hikes') showPlaces(panels[i].querySelector('.places'));
    if (name === 'music') showMusic();
  }

  // States (ST1, ST3): a message, an optional Try again, an optional fallback link.
  function setState(el, msg, { retry, link, linkText } = {}) {
    el.innerHTML = `<p>${esc(msg)}</p>`;
    const p = document.createElement('p');
    if (retry) {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'retry'; b.textContent = 'Try again';
      b.addEventListener('click', retry);
      p.append(b);
    }
    if (link) p.insertAdjacentHTML('beforeend', `<a href="${esc(link)}" target="_blank" rel="noopener" aria-describedby="new-tab">${esc(linkText)}</a>`);
    if (p.childNodes.length) el.append(p);
  }
  const bones = (n, cls) => Array.from({ length: n }, () => `<li class="${cls} skel" aria-hidden="true"><div><span class="bone"></span><span class="bone"></span></div></li>`).join('');
  const fmtDate = s => {
    const [y, m, d] = String(s).split('-').map(Number);
    return y ? new Intl.DateTimeFormat(undefined, { month: 'short', year: 'numeric' }).format(new Date(y, (m || 1) - 1, d || 1)) : '';
  };
  const fmtScore = new Intl.NumberFormat(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  /* Food and Hikes: places.json → list, then the map facade loads Leaflet + tiles (D5, PF5). */
  let placesReq;
  const getPlaces = () => placesReq ||= fetch('places.json', { cache: 'no-cache' })
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .catch(err => { placesReq = null; throw err; });

  async function showPlaces(box) {
    const type = box.dataset.type;
    const list = box.querySelector('.place-list');
    const state = box.querySelector('.state');
    const noun = type === 'food' ? 'restaurants' : 'hikes';
    box.classList.remove('is-error', 'is-empty');
    box.setAttribute('aria-busy', 'true');
    state.textContent = '';
    list.innerHTML = bones(3, 'place');
    try {
      const all = (await getPlaces()).places || [];
      const items = all.filter(p => p.type === type).sort((a, b) => String(b.date).localeCompare(String(a.date)));
      if (!items.length) {
        box.classList.add('is-empty');
        list.innerHTML = '';
        setState(state, state.dataset.empty, { link: state.dataset.link, linkText: state.dataset.linkText });
        return;
      }
      list.innerHTML = items.map((p, i) => `
        <li class="place" id="${type}-${i}">
          ${p.photo ? `<img class="thumb" src="${esc(p.photo)}" alt="${esc(p.photoAlt || '')}" width="144" height="180" loading="lazy">` : ''}
          <h4>${p.link ? `<a href="${esc(p.link)}" target="_blank" rel="noopener" aria-describedby="new-tab">${esc(p.name)}</a>` : esc(p.name)}</h4>
          ${typeof p.rating === 'number' ? `<p class="score">${fmtScore.format(p.rating)}<span> / 10</span></p>` : ''}
          <p class="meta">${[p.area, fmtDate(p.date)].filter(Boolean).map(esc).join(' · ')}</p>
          ${p.review ? `<p class="review">${esc(p.review)}</p>` : ''}
        </li>`).join('');
      announce(`${items.length} ${noun} listed`);
      showMap(box, items);
    } catch {
      box.classList.add('is-error');
      list.innerHTML = '';
      setState(state, state.dataset.error, { retry: () => showPlaces(box), link: state.dataset.link, linkText: state.dataset.linkText });
      announce(state.dataset.error);
    } finally {
      box.setAttribute('aria-busy', 'false');
    }
  }

  let leafletReq;
  const loadLeaflet = () => leafletReq ||= new Promise((ok, fail) => {
    const css = Object.assign(document.createElement('link'), { rel: 'stylesheet', href: LEAFLET + 'leaflet.min.css', crossOrigin: 'anonymous',
      integrity: 'sha512-h9FcoyWjHcOcmEVkxOfTLnmZFWIH0iZhZT1H2TbOq55xssQGEJHEaIm+PgoUaZbRvQTNTluNOEfb1ZRy6D3BOw==' });
    const js = Object.assign(document.createElement('script'), { src: LEAFLET + 'leaflet.min.js', crossOrigin: 'anonymous',
      integrity: 'sha512-puJW3E/qXDqYp9IfhAI54BJEaWIfloJ7JWs7OeD5i6ruC9JZL1gERT1wjtwXFlh7CjE7ZJ+/vcRZRkIYIb6p4g==' });
    js.onload = () => ok(window.L);
    js.onerror = () => { leafletReq = null; js.remove(); css.remove(); fail(); };
    document.head.append(css, js);
  });

  async function showMap(box, items) {
    const el = box.querySelector('.map');
    const note = el.querySelector('.map-note');
    const pinned = items.filter(p => Array.isArray(p.coords) && p.coords.length === 2);
    if (!pinned.length) { note.textContent = 'None of these have a location yet.'; return; }
    note.textContent = 'Loading the map…';
    let L;
    try { L = await loadLeaflet(); } catch {
      note.textContent = 'The map didn’t load. Every place is in the list.';
      return;
    }
    note.remove();
    const touch = matchMedia('(pointer: coarse)').matches;
    // No scroll-wheel zoom and no one-finger drag on touch, so the page still scrolls past it.
    const map = L.map(el, { scrollWheelZoom: false, dragging: !touch, attributionControl: false })
      .fitBounds(pinned.map(p => p.coords), { padding: [40, 40], maxZoom: 13 }); // a view first, then tiles
    L.control.attribution({ prefix: '<a href="https://leafletjs.com">Leaflet</a>' }).addTo(map);
    // OpenStreetMap's own tiles (free with attribution); style.css tones them to the theme.
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    maps.push(map);
    const rows = [...box.querySelectorAll('.place')];
    pinned.forEach(p => {
      const row = rows[items.indexOf(p)];
      const label = typeof p.rating === 'number' ? `${p.name}, ${fmtScore.format(p.rating)} out of 10` : p.name;
      const m = L.marker(p.coords, { icon: L.divIcon({ className: 'pin', iconSize: [22, 22] }), title: p.name, keyboard: true })
        .bindPopup(`<strong>${esc(p.name)}</strong><br>${[p.area, typeof p.rating === 'number' ? fmtScore.format(p.rating) + ' / 10' : ''].filter(Boolean).map(esc).join(' · ')}`)
        .addTo(map);
      m.getElement().setAttribute('aria-label', label);
      // Pin and row light up together, both ways.
      const hot = on => { m.getElement().classList.toggle('hot', on); row.classList.toggle('hot', on); };
      m.on('mouseover popupopen', () => hot(true)).on('mouseout popupclose', () => hot(false));
      row.addEventListener('mouseenter', () => hot(true));
      row.addEventListener('mouseleave', () => hot(false));
    });
  }

  /* Music: last played live from Last.fm on tab open; top five from the daily music.json (PT7). */
  const LASTFM_USER = 'pshekr';
  // A second, read-only Last.fm key made just for this page: anyone can read it, and it can only
  // read public scrobbles. The daily Action uses its own key from a GitHub secret. Empty = skip the
  // live call and show last played from music.json, with its age.
  const LASTFM_KEY = 'd49cc251cc3e2b567f8e576c7b1aee03';
  const MUSIC_JSON = 'https://raw.githubusercontent.com/PhuruShekar/PhuruShekar.github.io/data/music.json';
  const timeout = () => (AbortSignal.timeout ? AbortSignal.timeout(8000) : undefined);
  const ago = iso => {
    const s = (new Date(iso) - Date.now()) / 1000;
    const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });
    for (const [unit, n] of [['day', 86400], ['hour', 3600], ['minute', 60]]) if (Math.abs(s) >= n) return rtf.format(Math.round(s / n), unit);
    return 'just now';
  };

  async function liveRecent() {
    if (!LASTFM_KEY) throw new Error('no key');
    const u = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER}&limit=1&format=json&api_key=${LASTFM_KEY}`;
    const j = await (await fetch(u, { signal: timeout() })).json();
    if (j.error) throw new Error(j.message);
    const t = [].concat(j.recenttracks?.track || [])[0];
    if (!t) return null;
    return {
      track: t.name, artist: t.artist?.['#text'], url: t.url,
      nowPlaying: t['@attr']?.nowplaying === 'true',
      playedAt: t.date?.uts ? new Date(t.date.uts * 1000).toISOString() : null,
    };
  }

  async function showMusic() {
    const box = explore.querySelector('.music');
    const [lastSlot, topSlot] = box.querySelectorAll('.slot');
    const age = box.querySelector('.age');
    box.setAttribute('aria-busy', 'true');
    lastSlot.innerHTML = `<div class="skel" aria-hidden="true"><span class="bone"></span><span class="bone" style="width:40%"></span></div>`;
    topSlot.innerHTML = `<ol class="chart">${bones(5, 'row')}</ol>`;
    age.textContent = '';
    const [live, daily] = await Promise.allSettled([
      liveRecent(),
      fetch(MUSIC_JSON, { cache: 'no-cache', signal: timeout() }).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }),
    ]);
    const data = daily.status === 'fulfilled' ? daily.value : null;
    const retry = () => showMusic();

    // Last played: live if we could, else the copy from the last daily run (ST5).
    const recent = live.status === 'fulfilled' ? live.value : data?.recent;
    const stale = live.status !== 'fulfilled' && recent;
    if (recent) {
      const when = [
        recent.nowPlaying && !stale ? 'Playing now' : recent.playedAt && `Played ${ago(recent.playedAt)}`,
        stale && 'from the daily update', // Last.fm didn't answer; the credit line gives the update's age
      ].filter(Boolean).join(' · ');
      lastSlot.innerHTML = `
        <div class="track-now${recent.nowPlaying && !stale ? ' playing' : ''}">
          <p class="name"><a href="${esc(recent.url)}" target="_blank" rel="noopener" aria-describedby="new-tab">${esc(recent.track)}</a></p>
          <p class="by">${esc(recent.artist)}</p>
          <p class="when">${esc(when)}</p>
        </div>`;
    } else if (live.status === 'fulfilled' || (data && !data.recent)) {
      setState(lastSlot, 'Nothing played yet.');
    } else {
      // One Try again per tab: the top-five error below carries it.
      setState(lastSlot, 'Couldn’t reach Last.fm just now.', { retry: data && retry, link: `https://www.last.fm/user/${LASTFM_USER}`, linkText: 'See it on Last.fm' });
    }

    // Top five, sorted bars with the count in words (D1).
    if (!data) {
      setState(topSlot, 'Couldn’t load my top tracks.', { retry, link: `https://www.last.fm/user/${LASTFM_USER}/library/tracks?date_preset=LAST_30_DAYS`, linkText: 'See them on Last.fm' });
    } else if (!data.top?.length) {
      setState(topSlot, 'No plays in the last 30 days.');
    } else {
      const max = Math.max(...data.top.map(t => t.plays));
      topSlot.innerHTML = `<ol class="chart">${data.top.map(t => `
        <li>
          <p class="name"><a href="${esc(t.url)}" target="_blank" rel="noopener" aria-describedby="new-tab">${esc(t.track)}</a> <span class="by">${esc(t.artist)}</span></p>
          <p class="plays">${esc(t.plays)} ${t.plays === 1 ? 'play' : 'plays'}</p>
          <span class="bar" style="--w:${(t.plays / max).toFixed(3)}" aria-hidden="true"></span>
        </li>`).join('')}</ol>`;
    }
    if (data) age.textContent = `; updated ${ago(data.updated)}`;
    box.setAttribute('aria-busy', 'false');
    announce(data || recent ? 'Music loaded' : 'Couldn’t load music');
  }

  // Photography: a photo that fails shows its description in place (ST3).
  explore.querySelector('.photos').addEventListener('error', e => {
    const img = e.target;
    if (img.tagName !== 'IMG') return;
    img.replaceWith(Object.assign(document.createElement('p'), { className: 'broken', textContent: `Photo didn’t load: ${img.alt}` }));
  }, true);

  /* ---------- copy email, announced through the status region (PT8, ST6) ---------- */
  const copy = document.querySelector('.copy');
  if (navigator.clipboard) {
    copy.hidden = false;
    copy.addEventListener('click', async () => {
      const done = document.querySelector('.copied');
      try { await navigator.clipboard.writeText('phurushotham@gmail.com'); done.textContent = 'Copied'; count('copy-email'); }
      catch { done.textContent = 'Couldn’t copy; select the address instead'; }
      setTimeout(() => { done.textContent = ''; }, 3000);
    });
  }

  /* ---------- header: mark the section on screen (V10) ---------- */
  const links = [...document.querySelectorAll('.top nav a')];
  const spy = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(a => a.toggleAttribute('aria-current', a.hash === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(a => spy.observe(document.querySelector(a.hash)));
  spy.observe(document.getElementById('top')); // back in the hero: nothing is current

  /* ---------- scroll entrances, once, staggered within a group (T8) ---------- */
  if (!reduce && 'IntersectionObserver' in window) {
    const els = document.querySelectorAll('main h2, .intro, .timeline li, .tile, .elsewhere, .skills dl > div, .mail, .elsewhere-links');
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('shown');
      e.target.classList.remove('pending');
      io.unobserve(e.target);
    }), { rootMargin: '0px 0px -8% 0px' });
    const seen = new Map();
    els.forEach(el => {
      if (el.getBoundingClientRect().top < innerHeight) return; // already on screen: never hide it
      const n = seen.get(el.parentElement) || 0;
      seen.set(el.parentElement, n + 1);
      el.style.setProperty('--d', (n % 4) * 75 + 'ms');
      el.classList.add('pending');
      io.observe(el);
    });
  }

  /* ---------- hero: the mountain photo redrawn as ASCII, stirred by the pointer (the one wow) ---------- */
  const hero = document.getElementById('top');
  const cv = document.getElementById('ascii');
  const ctx = cv.getContext('2d');
  const base = document.createElement('canvas');
  const bctx = base.getContext('2d');
  const RAMP = ' .·:-=+*#%@';
  const HOT = '{}<>/\\=+*;:01#@';
  const img = new Image();
  img.src = 'assets/mtnpix.jpg'; // 960px copy of mtnpix.png: the canvas samples ~200 columns

  let W, H, dpr, fs, cw, chh, cols, rows, chars, styles, heat, active = [];
  let BG, INK, WARM, pointer = null, running = false, visible = true, introStart = 0, twinkleUntil = 0;

  function sample() {
    // Fit the photo to the canvas bottom; skip the plain sky so the peaks sit high.
    const off = document.createElement('canvas');
    off.width = cols; off.height = rows;
    const o = off.getContext('2d');
    o.fillStyle = '#cbcfd2';
    o.fillRect(0, 0, cols, rows);
    const iw = img.naturalWidth, sy = img.naturalHeight * 0.22, ih = img.naturalHeight - sy;
    const s = Math.max(W / iw, H / ih);
    const dw = iw * s, dh = ih * s;
    // On narrow screens keep the summit (left of centre) in view.
    const dx = W < 600 ? -(dw - W) * 0.3 : (W - dw) / 2;
    o.drawImage(img, 0, sy, iw, ih, dx / cw, (H - dh) / chh, dw / cw, dh / chh);
    return o.getImageData(0, 0, cols, rows).data;
  }

  function fallback() {
    // Generated ridge for when the photo can't be read (file://).
    const d = new Uint8ClampedArray(cols * rows * 4);
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const u = x / cols, v = y / rows, i = (y * cols + x) * 4;
      const ridge = 0.45 - 0.3 * Math.exp(-((u - 0.35) ** 2) / 0.02) - 0.06 * Math.sin(u * 19) * Math.cos(u * 7);
      const lum = v < ridge ? 205 : Math.max(25, 160 - (v - ridge) * 300);
      d[i] = d[i + 1] = d[i + 2] = lum;
    }
    return d;
  }

  function build() {
    const css = getComputedStyle(root);
    BG = css.getPropertyValue('--bg').trim();
    INK = css.getPropertyValue('--ascii-ink').trim();
    WARM = css.getPropertyValue('--ascii-warm').trim();
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = base.width = W * dpr;
    cv.height = base.height = H * dpr;
    fs = W < 600 ? 10 : 13;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = bctx.font = `${fs}px ui-monospace, Consolas, monospace`;
    ctx.textBaseline = bctx.textBaseline = 'top';
    cw = ctx.measureText('M').width;
    chh = fs * 1.2;
    cols = Math.ceil(W / cw); rows = Math.ceil(H / chh);

    let px;
    try { px = sample(); } catch { px = fallback(); }

    const n = cols * rows;
    chars = new Array(n); styles = new Array(n); heat = new Float32Array(n); active = [];
    for (let i = 0; i < n; i++) {
      const r = px[i * 4], g = px[i * 4 + 1], b = px[i * 4 + 2];
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      // Stretch contrast so the grey peaks separate from the pale sky.
      const d = Math.min(1, Math.max(0, (0.82 - lum) / 0.55 + (Math.random() - 0.5) * 0.1));
      chars[i] = RAMP[Math.round(d * (RAMP.length - 1))];
      // Strongest on the rocky peaks, quieter in the dark foreground.
      const a = d < 0.55 ? 0.12 + 0.9 * d : Math.max(0.1, 0.62 - 1.1 * (d - 0.55));
      styles[i] = `rgba(${INK},${a.toFixed(2)})`;
    }
    bctx.fillStyle = BG;
    bctx.fillRect(0, 0, W, H);
    for (let i = 0; i < n; i++) {
      if (chars[i] === ' ') continue;
      bctx.fillStyle = styles[i];
      bctx.fillText(chars[i], (i % cols) * cw, Math.floor(i / cols) * chh);
    }
    ctx.drawImage(base, 0, 0, W, H);
  }

  // The mountain rises in from the bottom on load (under 2 s).
  function drawIntro(t) {
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);
    let done = true;
    for (let i = 0; i < chars.length; i++) {
      if (chars[i] === ' ') continue;
      const row = Math.floor(i / cols);
      const t0 = (1 - row / rows) * 1.1 + ((i * 7919) % 97) / 97 * 0.45;
      if (t < t0) { done = false; continue; }
      const settled = t > t0 + 0.3;
      if (!settled) done = false;
      ctx.fillStyle = settled ? styles[i] : `rgb(${WARM})`;
      ctx.fillText(settled ? chars[i] : HOT[(Math.random() * HOT.length) | 0], (i % cols) * cw, row * chh);
    }
    return done;
  }

  function frame(now) {
    if (!visible || !W || !H) { running = false; return; }
    if (introStart) {
      if (!drawIntro((now - introStart) / 1000)) return requestAnimationFrame(frame);
      introStart = 0;
      twinkleUntil = now + 2500; // intro + twinkle stay under 5 s, so no pause control is needed (WCAG 2.2.2)
    }
    if (pointer) {
      const R = W < 600 ? 70 : 120;
      const c0 = Math.max(0, Math.floor((pointer.x - R) / cw)), c1 = Math.min(cols - 1, Math.ceil((pointer.x + R) / cw));
      const r0 = Math.max(0, Math.floor((pointer.y - R) / chh)), r1 = Math.min(rows - 1, Math.ceil((pointer.y + R) / chh));
      for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) {
        const dist = Math.hypot(c * cw - pointer.x, r * chh - pointer.y);
        if (dist > R) continue;
        const i = r * cols + c, h = (1 - dist / R) ** 1.5;
        if (h > heat[i]) { if (heat[i] < 0.02) active.push(i); heat[i] = h; }
      }
    }
    for (let k = 0; now < twinkleUntil && k < 2; k++) {
      const i = (Math.random() * heat.length) | 0;
      if (chars[i] !== ' ' && heat[i] < 0.02) { heat[i] = 0.6; active.push(i); }
    }

    ctx.drawImage(base, 0, 0, W, H);
    const next = [];
    for (const i of active) {
      const h = heat[i] *= 0.93;
      if (h < 0.02) { heat[i] = 0; continue; }
      next.push(i);
      const x = (i % cols) * cw, y = Math.floor(i / cols) * chh;
      ctx.fillStyle = BG;
      ctx.fillRect(x, y, cw + 0.5, chh + 0.5);
      ctx.fillStyle = `rgba(${WARM},${Math.min(1, 0.35 + h).toFixed(2)})`;
      ctx.fillText(Math.random() < h * 0.5 ? HOT[(Math.random() * HOT.length) | 0] : (chars[i] === ' ' ? '·' : chars[i]), x, y);
    }
    active = next;
    if (!active.length && !pointer && now >= twinkleUntil) { running = false; return; }
    requestAnimationFrame(frame);
  }

  function start() {
    if (reduce) return;
    if (!running) { running = true; requestAnimationFrame(frame); }
  }

  function init() {
    build();
    if (!reduce) introStart = performance.now();
    start();
  }

  if (img.complete && img.naturalWidth) init();
  else { img.onload = init; img.onerror = init; }

  cv.addEventListener('pointermove', e => {
    const r = cv.getBoundingClientRect();
    pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
    if (chars) start();
  });
  cv.addEventListener('pointerleave', () => { pointer = null; });

  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && chars) start(); }).observe(hero);

  let lastW = innerWidth, t;
  addEventListener('resize', () => {
    // ignore mobile URL-bar height jitter
    if (W && innerWidth === lastW && Math.abs(cv.clientHeight - H) < 120) return;
    lastW = innerWidth;
    clearTimeout(t);
    t = setTimeout(() => { if (chars) { build(); start(); } }, 150);
  });

  syncTheme();
})();
