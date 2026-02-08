import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pubudu Bandara - Full Stack Developer Portfolio',
    short_name: 'Pubudu Portfolio',
    description: 'Full Stack Developer and IT Undergraduate at University of Moratuwa specializing in modern web development',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/img.jpg',
        sizes: 'any',
        type: 'image/jpeg',
      },
    ],
  }
}
