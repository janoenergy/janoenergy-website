const { writeFileSync } = require('fs');
const { join } = require('path');

const BASE_URL = 'https://www.janoenergy.com';
const LANGUAGES = ['zh', 'en'];

const routes = [
  '',
  '/about',
  '/business',
  '/projects',
  '/news',
  '/contact',
];

function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) =>
    LANGUAGES.map(
      (lang) => `  <url>
    <loc>${BASE_URL}/${lang}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`
    ).join('\n')
  )
  .join('\n')}
</urlset>`;

  const publicDir = join(__dirname, '..', 'public');
  writeFileSync(join(publicDir, 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
}

generateSitemap();
