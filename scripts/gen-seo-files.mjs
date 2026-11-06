/**
 * Emits `dist/sitemap.xml` and `dist/robots.txt` after `vite build`.
 *
 * Replaces `vite-plugin-sitemap` (last published 2025-05-15, no declared peer
 * range) and `vite-plugin-robots` (last published 2024-03-20). Both predate the
 * Vite 8 / rolldown plugin API, and neither is needed: the site has a fixed,
 * known route list that is already defined in the source tree.
 *
 * Deliberately dependency-free, so it runs on the same Node floor as Vite 8
 * itself (^20.19.0 || >=22.12.0) rather than pulling in `sitemap@10`, which
 * requires node >=22.22.1.
 *
 * Run standalone with `pnpm build:seo` (requires a prior `vite build`).
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { allProjectsData } from '../src/constants/projectData.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SITE = 'https://namlapan.studio';

/** Static routes, in sitemap priority order. */
const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/pricing', changefreq: 'monthly', priority: '0.8' },
];

/** `/project/:clientName` — enumerated so crawlers see every case study. */
const projectRoutes = [...new Set(allProjectsData.map((p) => p.clientName))]
  .filter(Boolean)
  .map((clientName) => ({
    // clientName values may contain spaces ("Dreamity Indonesia"); URLs must be
    // percent-encoded, the filesystem-derived route param does not.
    path: `/project/${encodeURIComponent(clientName)}`,
    changefreq: 'monthly',
    priority: '0.6',
  }));

const escapeXml = (value) =>
  value.replace(
    /[<>&'"]/g,
    (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c],
  );

const lastmod = new Date().toISOString();

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticRoutes, ...projectRoutes]
  .map(
    (route) => `  <url>
    <loc>${escapeXml(SITE + route.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

async function main() {
  await mkdir(DIST, { recursive: true });

  await writeFile(join(DIST, 'sitemap.xml'), sitemap, 'utf8');

  // robots.txt is authored, not generated — copy the production variant verbatim.
  const robots = await readFile(join(ROOT, '.robots.production.txt'), 'utf8');
  await writeFile(join(DIST, 'robots.txt'), robots, 'utf8');

  const total = staticRoutes.length + projectRoutes.length;
  console.log(`[seo] wrote dist/sitemap.xml (${total} urls) and dist/robots.txt`);
}

main().catch((error) => {
  console.error('[seo] failed:', error);
  process.exit(1);
});
