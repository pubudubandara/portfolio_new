import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/edit/', '/login/'],
      },
    ],
    sitemap: 'https://www.pubududev.me/sitemap.xml', 
  }
}
