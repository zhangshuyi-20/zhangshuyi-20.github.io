import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const destination = path.join(root, 'dist', 'assets', 'daily-views.json');
const endpoint = 'https://www.stats4u.net/?action=livedata&s4uid=3772303648&lang=en';
const timeZone = 'Europe/Warsaw';

try {
  const response = await fetch(endpoint, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`Stats4U returned HTTP ${response.status}`);
  const statistics = await response.json();
  const count = statistics?.today?.hits;
  if (!Number.isSafeInteger(count) || count < 0) {
    throw new Error('Stats4U did not return a valid daily page-view count');
  }
  if (!Number.isSafeInteger(statistics.ts) || statistics.ts <= 0) {
    throw new Error('Stats4U did not return a valid timestamp');
  }
  const timestamp = new Date(statistics.ts * 1000);
  if (!Number.isFinite(timestamp.getTime())) throw new Error('Stats4U timestamp is out of range');
  const date = new Intl.DateTimeFormat('en-CA', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(timestamp);
  const snapshot = { count, timestamp: timestamp.toISOString(), date, timeZone };
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(`Updated daily page views for ${date} (${timeZone}): ${count}`);
} catch (error) {
  console.error(`Daily page views were not updated: ${error.message}`);
  process.exitCode = 1;
}
