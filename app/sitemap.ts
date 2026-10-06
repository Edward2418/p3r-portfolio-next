import type { MetadataRoute } from 'next'
import { SITE } from './data/site'

export default function sitemap(): MetadataRoute.Sitemap {
  // Las seis secciones son estados del menú; la única URL de contenido es /.
  return [{ url: new URL('/', SITE.url).href }]
}
