import { useState } from 'react'

// Click-to-play video card — the <video> element (and its src) doesn't
// exist in the DOM at all until a visitor actually clicks play, so the
// heavy file never touches page load. Only the poster image (a few KB)
// loads up front. Add more entries to src/data/videos.js as they come in;
// this component doesn't change.
export default function VideoShowcase({ video, className = '' }) {
  const [playing, setPlaying] = useState(false)
  const aspectClass = video.orientation === 'portrait' ? 'aspect-[9/16]' : 'aspect-video'

  if (playing) {
    return (
      <div className={`relative rounded-[2rem] overflow-hidden shadow-2xl bg-primary ${aspectClass} ${className}`}>
        <video
          src={video.src}
          poster={video.poster}
          controls
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-contain"
        >
          Your browser doesn't support embedded video —{' '}
          <a href={video.src} className="underline">
            download it instead
          </a>
          .
        </video>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${video.title}`}
      className={`group relative block w-full rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer ${aspectClass} ${className}`}
    >
      <img
        src={video.poster}
        alt={video.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex items-center gap-sm px-xl py-md rounded-full bg-secondary text-on-secondary font-body text-label-md uppercase tracking-widest shadow-2xl shadow-secondary/40 transition-transform duration-300 group-hover:scale-105">
          <span className="material-symbols-outlined text-[22px]">play_arrow</span>
          Start Exploring
        </span>
      </div>
    </button>
  )
}
