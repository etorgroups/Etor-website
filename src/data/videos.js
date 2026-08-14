import { publicUrl } from '../lib/basePath'

// Site/drone and event footage — add more entries here as new videos come
// in. Each video stays out of the page's initial load entirely (poster
// image only) until a visitor actually clicks play, so this list can grow
// without adding weight to the pages that show it.
export const VIDEOS = [
  {
    id: 'etor-city-story',
    title: 'See ETOR City for yourself',
    description: 'Real drone footage of the land, and moments from our investor site visits — not a stock reel.',
    src: publicUrl('videos/etor-city-story.mp4'),
    poster: publicUrl('videos/etor-city-story-poster.webp'),
    orientation: 'portrait',
  },
]
