const fs = require('fs')
const path = require('path')

function generateSitemap() {
  const baseUrl = 'https://tmttn.eu'
  const currentDate = new Date().toISOString().split('T')[0]
  
  const pages = [
    {
      url: '/',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '1.0'
    },
    {
      url: '/#about',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: '/#contact',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      url: '/#showcase',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    }
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  const publicDir = path.join(process.cwd(), 'public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap)
  
  // Also generate robots.txt
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`
  
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt)
  
  console.log('✅ Sitemap and robots.txt generated successfully!')
}

generateSitemap()