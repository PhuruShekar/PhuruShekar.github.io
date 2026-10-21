// Builds music.json for the Music tab from Last.fm. Run daily by .github/workflows/music.yml;
// how it fits together: docs/music-pipeline.html.
// Needs LASTFM_API_KEY (a GitHub Actions secret) and LASTFM_USER.
import { writeFile } from 'node:fs/promises';

const { LASTFM_API_KEY: key, LASTFM_USER: user = 'pshekr' } = process.env;
if (!key) throw new Error('LASTFM_API_KEY is not set: add it under Settings → Secrets and variables → Actions');

async function lastfm(method, params) {
  const url = new URL('https://ws.audioscrobbler.com/2.0/');
  url.search = new URLSearchParams({ method, user, api_key: key, format: 'json', ...params });
  const res = await fetch(url, { headers: { 'User-Agent': 'phurushekar.com music.json (GitHub Actions)' } });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.error) throw new Error(`${method} failed: ${body.message || res.status}`);
  return body;
}

const [recent, top, artists] = await Promise.all([
  lastfm('user.getrecenttracks', { limit: '1' }),
  lastfm('user.gettoptracks', { period: '1month', limit: '5' }), // Last.fm's "1month" = the last 30 days
  lastfm('user.gettopartists', { period: '1month', limit: '5' }), // five, so the page can name a tie for first
]);

const now = new Date().toISOString();
const last = [].concat(recent.recenttracks?.track ?? [])[0];
const music = {
  user,
  updated: now,
  period: '1month',
  recent: last ? {
    track: last.name,
    artist: last.artist?.['#text'],
    url: last.url,
    nowPlaying: last['@attr']?.nowplaying === 'true',
    // A track still playing has no date yet; it was playing at the time of this run.
    playedAt: last.date?.uts ? new Date(last.date.uts * 1000).toISOString() : now,
  } : null,
  top: [].concat(top.toptracks?.track ?? []).map(t => ({
    track: t.name,
    artist: t.artist?.name,
    url: t.url,
    plays: Number(t.playcount),
  })),
  // Counted across every track, not just the top five songs.
  topArtists: [].concat(artists.topartists?.artist ?? []).map(a => ({
    artist: a.name,
    url: a.url,
    plays: Number(a.playcount),
  })),
};

await writeFile('music.json', JSON.stringify(music, null, 2) + '\n');
console.log(`music.json: ${music.top.length} top tracks; top artist: ${music.topArtists[0]?.artist ?? 'none'}; last played: ${music.recent ? `${music.recent.track} by ${music.recent.artist}` : 'nothing'}`);
