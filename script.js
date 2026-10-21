(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const osDark = matchMedia('(prefers-color-scheme: dark)');
  // GoatCounter counts features, never people. Safe when the script is blocked.
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
    redrawSummit();
  };
  themeBtn.addEventListener('click', () => {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch {}
    syncTheme();
  });
  osDark.addEventListener('change', syncTheme);

  /* ---------- projects: the index picks one for the panel; #slug opens one on load (PT3, I1) ---------- */
  const proj = document.querySelector('.proj');
  const picks = [...proj.querySelectorAll('.proj-index a')];
  const projects = picks.map(a => document.querySelector(a.hash));
  const wide = matchMedia('(min-width: 768px)');
  proj.classList.add('picker');
  const pick = (i, { url } = {}) => {
    projects.forEach((p, k) => p.classList.toggle('sel', k === i));
    picks.forEach((a, k) => k === i ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'));
    if (url) history.replaceState(null, '', '#' + projects[i].id);
  };
  // The picked name decodes out of the hero's ASCII characters in 300 ms. The real name stays in
  // the heading (screen readers and layout use it); the scramble is an aria-hidden layer on top.
  const decode = h => {
    if (reduce || h.classList.contains('decoding')) return; // a click mid-decode lets it finish
    const name = h.textContent, at = performance.now();
    const esc = c => c === '<' ? '&lt;' : c === '>' ? '&gt;' : c;
    const dec = document.createElement('span');
    dec.className = 'dec';
    dec.setAttribute('aria-hidden', 'true');
    h.append(dec);
    h.classList.add('decoding');
    (function step(now) {
      const p = Math.min(1, (now - at) / 300), shown = Math.floor(p * name.length);
      dec.innerHTML = [...name].map((c, i) => i < shown || c === ' ' ? esc(c)
        : `<span class="x">${esc(HOT[(Math.random() * HOT.length) | 0])}</span>`).join('');
      if (p < 1) requestAnimationFrame(step); else { dec.remove(); h.classList.remove('decoding'); }
    })(at);
  };
  // On a phone every project already shows as a row, so the links just jump (still counted).
  picks.forEach((a, i) => a.addEventListener('click', e => {
    count('project-open-' + projects[i].id);
    if (!wide.matches) return;
    e.preventDefault();
    pick(i, { url: true });
    decode(projects[i].querySelector('h3'));
  }));
  const openFromHash = () => {
    const i = projects.findIndex(p => '#' + p.id === location.hash);
    if (i < 0) return;
    pick(i);
    requestAnimationFrame(() => (wide.matches ? proj : projects[i]).scrollIntoView({ block: 'start' }));
  };
  pick(0);
  addEventListener('hashchange', openFromHash);
  openFromHash();
  // A reload restores the old scroll position after load; go back to the shared project.
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
  // Nothing loads (no food.json, hikes.json, map, or Last.fm call) until the section is near the screen.
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
    if (name === 'food') showMenu(panels[i].querySelector('.menu'));
    if (name === 'hikes') showPlaces(panels[i].querySelector('.places'));
    if (name === 'music') showMusic();
  }

  // States (ST1, ST3): a message, an optional Try again, an optional fallback link.
  function setState(el, msg, { retry, link, linkText } = {}) {
    el.innerHTML = `<p>${esc(msg)}</p>`;
    const p = Object.assign(document.createElement('p'), { className: 'state-act' });
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
    if (s && !/^\d{4}/.test(s)) return s; // free text like "Too many times" shows as written
    const [y, m, d] = String(s).split('-').map(Number);
    return y ? new Intl.DateTimeFormat(undefined, { month: 'short', year: 'numeric' }).format(new Date(y, (m || 1) - 1, d || 1)) : '';
  };
  const sortDate = p => /^\d{4}/.test(p.date) ? p.date : ''; // no date or free text sorts last
  const fmtScore = new Intl.NumberFormat(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  /* food.json feeds Food (a menu); hikes.json feeds Hikes (a table, then the map facade loads Leaflet + tiles: D5, PF5). */
  const getJSON = file => fetch(file, { cache: 'no-cache' }).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); });

  /* Food: set like a menu, restaurants as mains then cafés and desserts, best rated first. */
  async function showMenu(box) {
    const state = box.querySelector('.state');
    const lists = [...box.querySelectorAll('.dishes')];
    box.classList.remove('is-error');
    box.setAttribute('aria-busy', 'true');
    state.textContent = '';
    lists[0].innerHTML = bones(3, 'dish');
    try {
      const all = await getJSON('food.json');
      let shown = 0;
      for (const ul of lists) {
        const items = all.filter(p => p.type === ul.dataset.type)
          .sort((a, b) => (b.rating ?? -1) - (a.rating ?? -1) || sortDate(b).localeCompare(sortDate(a)));
        ul.closest('.course').hidden = !items.length;
        shown += items.length;
        ul.innerHTML = items.map(p => `
          <li class="dish">
            <p class="dish-line">
              <span class="name">${p.link ? `<a href="${esc(p.link)}" target="_blank" rel="noopener" aria-describedby="new-tab">${esc(p.name)}</a>` : esc(p.name)}</span>
              <span class="leader" aria-hidden="true"></span>
              ${typeof p.rating === 'number' ? `<span class="score">${fmtScore.format(p.rating)}<span class="vh"> out of 10</span></span>` : ''}
            </p>
            <p class="meta">${[p.area, fmtDate(p.date)].filter(Boolean).map(esc).join(' · ')}</p>
            ${p.review ? `<p class="review">${esc(p.review)}</p>` : ''}
          </li>`).join('');
      }
      if (!shown) setState(state, state.dataset.empty, { link: state.dataset.link, linkText: state.dataset.linkText });
      else announce(`${shown} places listed`);
    } catch {
      box.classList.add('is-error');
      lists.forEach(ul => { ul.innerHTML = ''; });
      setState(state, state.dataset.error, { retry: () => showMenu(box), link: state.dataset.link, linkText: state.dataset.linkText });
      announce(state.dataset.error);
    } finally {
      box.setAttribute('aria-busy', 'false');
    }
  }

  /* Hikes: a dot per trail on the map, and a table of every hike under it. */
  async function showPlaces(box) {
    const list = box.querySelector('.place-list');
    const state = box.querySelector('.state');
    box.classList.remove('is-error', 'is-empty');
    box.setAttribute('aria-busy', 'true');
    state.textContent = '';
    list.innerHTML = '<tr class="skel" aria-hidden="true"><td><span class="bone"></span></td><td><span class="bone"></span></td></tr>'.repeat(3);
    try {
      const all = await getJSON('hikes.json');
      // Grouped by province or state (the part after the last comma), then place, then name.
      const region = p => (p.area || '').split(',').pop().trim();
      const items = all.sort((a, b) => region(a).localeCompare(region(b)) || (a.area || '').localeCompare(b.area || '') || a.name.localeCompare(b.name));
      if (!items.length) {
        box.classList.add('is-empty');
        list.innerHTML = '';
        setState(state, state.dataset.empty);
        return;
      }
      list.innerHTML = items.map(p => `
        <tr class="place">
          <th scope="row">${p.link ? `<a href="${esc(p.link)}" target="_blank" rel="noopener" aria-describedby="new-tab">${esc(p.name)}</a>` : esc(p.name)}</th>
          <td>${esc(p.area || '')}</td>
        </tr>`).join('');
      announce(`${items.length} hikes listed`);
      showMap(box, items);
    } catch {
      box.classList.add('is-error');
      list.innerHTML = '';
      setState(state, state.dataset.error, { retry: () => showPlaces(box) });
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
      note.textContent = 'The map didn’t load. Every hike is in the table.';
      return;
    }
    note.remove();
    const touch = matchMedia('(pointer: coarse)').matches;
    // No scroll-wheel zoom and no one-finger drag on touch, so the page still scrolls past it.
    // minZoom: never zoom out past the point where the world (256px tall at zoom 0) is shorter
    // than the map, which leaves an empty band above it (when the dots are far apart).
    const minZoom = Math.ceil(Math.log2(el.clientHeight / 256));
    const map = L.map(el, { scrollWheelZoom: false, dragging: !touch, attributionControl: false, minZoom })
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
      const label = [p.name, p.area].filter(Boolean).join(', ');
      const m = L.marker(p.coords, { icon: L.divIcon({ className: 'pin', iconSize: [22, 22] }), title: p.name, keyboard: true })
        .bindPopup(`<strong>${esc(p.name)}</strong><br>${esc(p.area || '')}`)
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

  // The "Playing now" dot beats at an uneven, made-up tempo for under 5 s, then rests (WCAG 2.2.2).
  function pulse(dot) {
    if (reduce || !dot.animate) return;
    const frames = [{ offset: 0, transform: 'scale(1)', opacity: 1 }];
    const TOTAL = 4800;
    for (let t = 0; ;) {
      const beat = 260 + Math.random() * 560, peak = 1.4 + Math.random() * 0.5;
      if (t + beat > TOTAL) break;
      frames.push({ offset: (t + 90) / TOTAL, transform: `scale(${peak.toFixed(2)})`, opacity: 0.55 });
      frames.push({ offset: (t + beat) / TOTAL, transform: 'scale(1)', opacity: 1 });
      t += beat;
    }
    frames.push({ offset: 1, transform: 'scale(1)', opacity: 1 });
    dot.animate(frames, { duration: TOTAL, easing: 'ease-out' });
  }

  async function showMusic() {
    const box = explore.querySelector('.music');
    const [lastSlot, artistSlot, topSlot] = box.querySelectorAll('.slot');
    const artistBox = box.querySelector('.mc-artist');
    const each = box.querySelector('.each');
    const age = box.querySelector('.age');
    const link = (url, text) => `<a href="${esc(url)}" target="_blank" rel="noopener" aria-describedby="new-tab">${esc(text)}</a>`;
    const plays = n => `${n} ${n === 1 ? 'play' : 'plays'}`;
    box.setAttribute('aria-busy', 'true');
    lastSlot.innerHTML = artistSlot.innerHTML = `<div class="skel" aria-hidden="true"><span class="bone"></span><span class="bone" style="width:40%"></span></div>`;
    topSlot.innerHTML = `<ol class="songs">${bones(5, 'row')}</ol>`;
    artistBox.hidden = false;
    each.textContent = age.textContent = '';
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
      const playing = recent.nowPlaying && !stale;
      const when = [
        playing ? 'Playing now' : recent.playedAt && `Played ${ago(recent.playedAt)}`,
        stale && 'from the daily update', // Last.fm didn't answer; the credit line gives the update's age
      ].filter(Boolean).join(' · ');
      lastSlot.innerHTML = `
        <p class="when${playing ? ' playing' : ''}">${playing ? '<span class="pulse" aria-hidden="true"></span>' : ''}${esc(when)}</p>
        <p class="song">${link(recent.url, recent.track)}</p>
        <p class="by">${esc(recent.artist)}</p>`;
      if (playing) pulse(lastSlot.querySelector('.pulse'));
    } else if (live.status === 'fulfilled' || (data && !data.recent)) {
      setState(lastSlot, 'Nothing played yet.');
    } else {
      // One Try again per tab: the top-songs error below carries it.
      setState(lastSlot, 'Couldn’t reach Last.fm just now.', { retry: data && retry, link: `https://www.last.fm/user/${LASTFM_USER}`, linkText: 'See it on Last.fm' });
    }

    // Top artist, counted by Last.fm across every track. A tie for first is named as a tie (T9);
    // a music.json from before topArtists existed just leaves the block out.
    const artists = data?.topArtists || [];
    if (!artists.length) artistBox.hidden = true;
    else {
      const tied = artists.filter(a => a.plays === artists[0].plays);
      artistSlot.innerHTML = tied.length > 1
        ? `<p class="big">A tie</p><p class="by">${tied.map(a => link(a.url, a.artist)).join(', ')} · ${plays(tied[0].plays)} each</p>`
        : `<p class="big">${link(artists[0].url, artists[0].artist)}</p><p class="by">${plays(artists[0].plays)}</p>`;
    }

    // Top songs: ties share a rank (1, 1, 3); when every count is the same it's said once.
    if (!data) {
      setState(topSlot, 'Couldn’t load my top songs.', { retry, link: `https://www.last.fm/user/${LASTFM_USER}/library/tracks?date_preset=LAST_30_DAYS`, linkText: 'See them on Last.fm' });
    } else if (!data.top?.length) {
      setState(topSlot, 'No plays in the last 30 days.');
    } else {
      const top = data.top, even = top.every(t => t.plays === top[0].plays);
      if (even) each.textContent = `(${plays(top[0].plays)} each)`;
      topSlot.innerHTML = `<ol class="songs">${top.map(t => `
        <li>
          <span class="rank">${1 + top.filter(u => u.plays > t.plays).length}</span>
          <div><p class="song">${link(t.url, t.track)}</p><p class="by">${esc(t.artist)}${even ? '' : ` · ${plays(t.plays)}`}</p></div>
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

  // A click opens the full photo in a modal over a darkened page; without JS the link opens the file.
  // < and > (or the arrow keys) step through the photos, wrapping at the ends.
  const lightbox = explore.querySelector('.lightbox'), big = lightbox.querySelector('img');
  const shots = [...explore.querySelectorAll('.photos a')];
  let at = 0;
  const show = i => {
    const n = at = (i + shots.length) % shots.length, thumb = shots[n].querySelector('img');
    // Show the thumbnail (same shape) at once, then swap in the full photo when it has loaded.
    big.src = thumb.currentSrc || thumb.src;
    big.alt = thumb.alt;
    const full = new Image();
    full.onload = () => { if (lightbox.open && at === n) big.src = full.src; };
    full.src = shots[n].href;
  };
  explore.querySelector('.photos').addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    show(shots.indexOf(a));
    lightbox.showModal();
    count('photo-open');
  });
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => show(at - 1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => show(at + 1));
  lightbox.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') show(at - 1);
    if (e.key === 'ArrowRight') show(at + 1);
  });
  // The backdrop is the dialog itself, so a click there (or on ×) closes.
  lightbox.addEventListener('click', e => { if (e.target === lightbox || e.target.closest('.lightbox-close')) lightbox.close(); });
  lightbox.addEventListener('close', () => big.removeAttribute('src'));

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

  /* ---------- journey: the trail winds past each job and draws with scroll (B4) ---------- */
  const timeline = document.querySelector('.timeline');
  const trail = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  trail.classList.add('trail');
  trail.setAttribute('aria-hidden', 'true');
  timeline.prepend(trail);
  timeline.classList.add('trailed');
  let trailLine, trailDots = [], trailYs = [], trailLen = 0;
  const drawTrail = () => {
    if (!trailLine) return; // a scroll can land before the first build
    const r = timeline.getBoundingClientRect();
    // Drawn up to 65% down the viewport; reduced motion sees it whole.
    const p = reduce ? 1 : Math.min(1, Math.max(0, (innerHeight * .65 - r.top) / r.height));
    trailLine.style.strokeDashoffset = trailLen * (1 - p);
    trailDots.forEach((c, i) => c.classList.toggle('on', trailYs[i] <= p * r.height + 2));
  };
  const buildTrail = () => {
    const phone = innerWidth < 640, x = phone ? 14 : 22, swing = phone ? 10 : 30;
    trail.setAttribute('viewBox', `0 0 64 ${timeline.offsetHeight}`);
    trailYs = [...timeline.querySelectorAll('li')].map(li => li.offsetTop + 14);
    // One S-bend between waypoints, alternating sides like switchbacks.
    const d = trailYs.reduce((d, y, i) => {
      if (!i) return `M${x},${y}`;
      const y0 = trailYs[i - 1], h = y - y0, s = i % 2 ? swing : -swing;
      return `${d} C${x + s},${y0 + h * .3} ${x + s},${y0 + h * .7} ${x},${y}`;
    }, '');
    trail.innerHTML = `<path class="ahead" d="${d}"/><path class="line" d="${d}"/>` +
      trailYs.map((y, i) => `<circle class="wp${i ? '' : ' now'}" cx="${x}" cy="${y}" r="7"/>`).join('') +
      `<text x="${x}" y="${trailYs[0] - 16}" text-anchor="middle">now</text>`;
    trailLine = trail.querySelector('.line');
    trailDots = [...trail.querySelectorAll('.wp')];
    trailLen = trailLine.getTotalLength();
    trailLine.style.strokeDasharray = trailLen;
    drawTrail();
  };
  // Rebuilds on resize and when the web fonts swap in and move the jobs.
  new ResizeObserver(buildTrail).observe(timeline);
  addEventListener('scroll', () => requestAnimationFrame(drawTrail), { passive: true });

  /* ---------- scroll entrances, once, staggered within a group (T8) ---------- */
  if (!reduce && 'IntersectionObserver' in window) {
    const els = document.querySelectorAll('main h2, .intro, .timeline li, .proj-side, .proj-panel, .mail, .elsewhere-links');
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

  const words = [...hero.querySelectorAll('h1, .lede, .actions, .photo')];
  const actionsRow = hero.querySelector('.actions');
  const SUMMIT = { x: 0.36, y: 0.28 }; // the highest peak, as fractions of the photo

  let W, H, dpr, fs, cw, chh, cols, rows, chars, styles, heat, mask, active = [];
  let BG, INK, WARM, pointer = null, running = false, visible = true, introStart = 0, twinkleUntil = 0;

  // Where an element lands in the hero, ignoring the entrance transform (it may be mid-rise).
  function landed(el) {
    let x = 0, y = 0;
    for (let n = el; n && n !== hero; n = n.offsetParent) { x += n.offsetLeft; y += n.offsetTop; }
    return { x, y };
  }

  // Tight boxes around the words, line by line, in canvas pixels. The photo keeps its corner
  // radii (top rt, bottom rb, scaled the way CSS scales them) so the mask follows its curve.
  function wordBoxes() {
    const c = cv.getBoundingClientRect(), out = [];
    for (const el of words) {
      const b = el.getBoundingClientRect(), at = landed(el);
      const sx = at.x - (b.left - c.left), sy = at.y - (b.top - c.top);
      let rects = [b], rt = 0, rb = 0;
      if (el.tagName !== 'IMG') { const r = document.createRange(); r.selectNodeContents(el); rects = r.getClientRects(); }
      else {
        const s = getComputedStyle(el), px = v => v.endsWith('%') ? parseFloat(v) / 100 * b.width : parseFloat(v) || 0;
        rt = px(s.borderTopLeftRadius); rb = px(s.borderBottomLeftRadius);
        const f = Math.min(1, b.width / 2 / Math.max(rt, rb), b.height / (rt + rb)); // x / 0 is Infinity: square corners never shrink f
        rt *= f; rb *= f;
      }
      for (const q of rects) out.push({ x0: q.left - c.left + sx, y0: q.top - c.top + sy, x1: q.right - c.left + sx, y1: q.bottom - c.top + sy, rt, rb, photo: el.tagName === 'IMG' });
    }
    return out;
  }

  // Distance from (x, y) to a box with rounded corners; negative inside.
  function gapTo(bx, x, y) {
    const hx = (bx.x1 - bx.x0) / 2, hy = (bx.y1 - bx.y0) / 2, cx = bx.x0 + hx, cy = bx.y0 + hy;
    const r = y < cy ? bx.rt : bx.rb;
    const qx = Math.abs(x - cx) - hx + r, qy = Math.abs(y - cy) - hy + r;
    return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r;
  }

  function sample(peak) {
    // Fit the photo so the summit lands on `peak` and the mountain fills everything below.
    const off = document.createElement('canvas');
    off.width = cols; off.height = rows;
    const o = off.getContext('2d');
    o.fillStyle = '#cbcfd2';
    o.fillRect(0, 0, cols, rows);
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const s = Math.max(W / iw, (H - peak.y) / ((1 - SUMMIT.y) * ih));
    const dw = iw * s, dh = ih * s;
    const dx = Math.min(0, Math.max(W - dw, peak.x - SUMMIT.x * dw));
    o.drawImage(img, dx / cw, (peak.y - SUMMIT.y * dh) / chh, dw / cw, dh / chh);
    return o.getImageData(0, 0, cols, rows).data;
  }

  function fallback(peak) {
    // Generated ridge for when the photo can't be read (file://).
    const d = new Uint8ClampedArray(cols * rows * 4);
    const px = peak.x / W, py = peak.y / H;
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const u = x / cols, v = y / rows, i = (y * cols + x) * 4;
      const ridge = py + 0.3 - 0.3 * Math.exp(-((u - px) ** 2) / 0.02) - 0.06 * Math.sin(u * 19) * Math.cos(u * 7);
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
    if (!W || !H) return; // not laid out yet (a background tab); resize builds it later
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

    const boxes = wordBoxes();
    // The summit rises just past the links, level with the top of the résumé button.
    const linksEnd = Math.max(...[...actionsRow.children].map(a => landed(a).x + a.offsetWidth));
    const peak = { x: Math.min(W * 0.75, linksEnd + fs * 6), y: Math.max(H * 0.25, landed(actionsRow).y - fs * 3) };
    let px;
    try { px = sample(peak); } catch { px = fallback(peak); }

    const n = cols * rows;
    chars = new Array(n); styles = new Array(n); heat = new Float32Array(n); mask = new Float32Array(n); active = [];
    // [clear band, fade length]: the text gets a crisp gap; the photo a longer, softer fade.
    const TEXT = [fs, fs * 5], PHOTO = [5, fs * 2];
    for (let i = 0; i < n; i++) {
      const r = px[i * 4], g = px[i * 4 + 1], b = px[i * 4 + 2];
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      // Stretch contrast so the grey peaks separate from the pale sky.
      const d = Math.min(1, Math.max(0, (0.82 - lum) / 0.55 + (Math.random() - 0.5) * 0.1));
      // Clear the characters behind the words and thin them out around them, so the text
      // keeps full contrast and the mountain seems to part for it.
      const x = (i % cols + 0.5) * cw, y = (Math.floor(i / cols) + 0.5) * chh;
      let m = 1;
      for (const bx of boxes) {
        const [pad, fade] = bx.photo ? PHOTO : TEXT;
        m = Math.min(m, Math.max(0, (gapTo(bx, x, y) - pad) / fade));
      }
      mask[i] = m;
      // Strongest on the rocky peaks, quieter in the dark foreground.
      const a = (d < 0.55 ? 0.12 + 0.9 * d : Math.max(0.1, 0.62 - 1.1 * (d - 0.55))) * mask[i];
      chars[i] = a < 0.04 ? ' ' : RAMP[Math.round(d * (RAMP.length - 1))];
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
        const i = r * cols + c;
        if (dist > R || mask[i] < 0.5) continue; // never stir the cleared ground behind the words
        const h = (1 - dist / R) ** 1.5;
        if (h > heat[i]) { if (heat[i] < 0.02) active.push(i); heat[i] = h; }
      }
    }
    for (let k = 0; now < twinkleUntil && k < 2; k++) {
      const i = (Math.random() * heat.length) | 0;
      if (chars[i] !== ' ' && mask[i] > 0.5 && heat[i] < 0.02) { heat[i] = 0.6; active.push(i); }
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

  // On the section, not the canvas: the words sit on top of it.
  hero.addEventListener('pointermove', e => {
    const r = cv.getBoundingClientRect();
    pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
    if (chars) start();
  });
  hero.addEventListener('pointerleave', () => { pointer = null; });
  // The display font can change the words' boxes once it arrives.
  document.fonts?.ready.then(() => { if (chars) build(); });

  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && chars) start(); }).observe(hero);

  let lastW = innerWidth, t;
  addEventListener('resize', () => {
    // ignore mobile URL-bar height jitter
    if (W && innerWidth === lastW && Math.abs(cv.clientHeight - H) < 120) return;
    lastW = innerWidth;
    clearTimeout(t);
    t = setTimeout(() => { if (img.complete) { build(); if (chars) start(); } }, 150);
  });

  /* ---------- close: the same mountain returns under the links, so the page ends at a summit ---------- */
  const close = document.getElementById('contact');
  const sum = document.createElement('canvas');
  sum.className = 'summit';
  sum.setAttribute('aria-hidden', 'true');
  close.prepend(sum);
  const sctx = sum.getContext('2d');
  let cells = null, sW, sH, sumShown = false;

  function buildSummit() {
    const sec = close.getBoundingClientRect(), links = close.querySelector('.elsewhere-links').getBoundingClientRect();
    sW = close.clientWidth; sH = Math.round(sec.bottom - links.bottom - 8);
    if (!sW || sH < 40 || !img.naturalWidth) return;
    const dpr = Math.min(devicePixelRatio || 1, 2), top = sec.bottom - sH;
    sum.style.height = sH + 'px';
    sum.width = sW * dpr; sum.height = sH * dpr;
    sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const fs = sW < 600 ? 10 : 13;
    sctx.font = `${fs}px ui-monospace, Consolas, monospace`;
    sctx.textBaseline = 'top';
    const cw = sctx.measureText('M').width, ch = fs * 1.2;
    const cols = Math.ceil(sW / cw), rows = Math.ceil(sH / ch);
    const off = document.createElement('canvas');
    off.width = cols; off.height = rows;
    const o = off.getContext('2d');
    o.fillStyle = '#cbcfd2';
    o.fillRect(0, 0, cols, rows);
    const peak = { x: sW * (sW < 600 ? 0.6 : 0.72), y: Math.max(36, sH * 0.1) }; // room above for the flag
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const s = Math.max(sW / iw, (sH - peak.y) / ((1 - SUMMIT.y) * ih));
    const dw = iw * s, dh = ih * s;
    const dx = Math.min(0, Math.max(sW - dw, peak.x - SUMMIT.x * dw));
    o.drawImage(img, dx / cw, (peak.y - SUMMIT.y * dh) / ch, dw / cw, dh / ch);
    let px;
    try { px = o.getImageData(0, 0, cols, rows).data; } catch { return; } // file:// can't read the photo
    const ink = getComputedStyle(close).color.match(/\d+/g).slice(0, 3).join(',');
    // The © line parts the mountain, like the words part the hero's.
    const r = document.createRange();
    r.selectNodeContents(close.querySelector('.foot'));
    const foot = [...r.getClientRects()].map(q => ({ x0: q.left - sec.left, y0: q.top - top, x1: q.right - sec.left, y1: q.bottom - top }));
    cells = [];
    for (let i = 0; i < cols * rows; i++) {
      const lum = (0.299 * px[i * 4] + 0.587 * px[i * 4 + 1] + 0.114 * px[i * 4 + 2]) / 255;
      const d = Math.min(1, Math.max(0, (0.82 - lum) / 0.55 + (Math.random() - 0.5) * 0.1));
      if (d < 0.04) continue;
      const row = Math.floor(i / cols), x = (i % cols) * cw, y = row * ch;
      let m = 1;
      for (const b of foot) m = Math.min(m, Math.max(0, (Math.hypot(Math.max(b.x0 - x, 0, x - b.x1), Math.max(b.y0 - y, 0, y - b.y1)) - fs) / (fs * 3)));
      const a = (d < 0.55 ? 0.14 + 0.8 * d : Math.max(0.12, 0.58 - 0.8 * (d - 0.55))) * m;
      if (a >= 0.04) cells.push({ x, y, row: row / rows, d, c: RAMP[Math.round(d * (RAMP.length - 1))], s: `rgba(${ink},${a.toFixed(2)})` });
    }
    // The flag goes on the highest solid rock, never on the © line.
    const clear = c => foot.every(b => c.x + 24 < b.x0 - fs || c.x - 4 > b.x1 + fs || c.y - 30 > b.y1 + fs || c.y < b.y0 - fs);
    const high = cells.filter(c => c.d > 0.45 && clear(c)).reduce((m, c) => (!m || c.y < m.y ? c : m), null);
    cells.flag = high ? { x: high.x + cw / 2, y: high.y } : peak;
  }

  // t: seconds since the close came into view; the ridge rises from the bottom (under 2 s).
  function paintSummit(t) {
    const css = getComputedStyle(root), peach = css.getPropertyValue('--peach').trim();
    sctx.clearRect(0, 0, sW, sH);
    let done = true;
    for (const c of cells) {
      const t0 = (1 - c.row) * 0.9 + ((c.x * 13 + c.y * 7) % 37) / 37 * 0.35;
      if (t < t0) { done = false; continue; }
      const hot = t < t0 + 0.25;
      if (hot) done = false;
      sctx.fillStyle = hot ? peach : c.s;
      sctx.fillText(hot ? HOT[(Math.random() * HOT.length) | 0] : c.c, c.x, c.y);
    }
    if (done || t > 1.2) {
      const { x, y } = cells.flag;
      sctx.strokeStyle = sctx.fillStyle = css.getPropertyValue('--highlight').trim();
      sctx.lineWidth = 2;
      sctx.beginPath(); sctx.moveTo(x, y + 4); sctx.lineTo(x, y - 26); sctx.stroke();
      sctx.beginPath(); sctx.moveTo(x, y - 26); sctx.lineTo(x + 18, y - 20); sctx.lineTo(x, y - 14); sctx.fill();
    }
    return done;
  }

  function redrawSummit() {
    if (!sumShown) return;
    buildSummit();
    if (cells) paintSummit(Infinity);
  }

  function initSummit() {
    new IntersectionObserver(([e], io) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      sumShown = true;
      buildSummit();
      if (!cells) return;
      if (reduce) return paintSummit(Infinity);
      const at = performance.now();
      (function f(now) { if (!paintSummit((now - at) / 1000)) requestAnimationFrame(f); })(at);
    }, { threshold: 0.3 }).observe(sum);
  }
  if (img.complete && img.naturalWidth) initSummit();
  else img.addEventListener('load', initSummit);
  let sumW = innerWidth;
  addEventListener('resize', () => { if (innerWidth !== sumW) { sumW = innerWidth; redrawSummit(); } });
  document.fonts?.ready.then(redrawSummit);

  syncTheme();
})();
