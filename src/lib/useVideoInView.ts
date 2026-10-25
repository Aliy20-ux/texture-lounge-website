import { useEffect, type RefObject } from 'react'

// Background-video playback policy.
// - Buffers a little before the video scrolls into view, plays only while it crosses the
//   middle of the screen, pauses otherwise — off-screen videos never keep the decoder busy.
// - Strictly one video plays at a time: the current one is paused *before* the next starts.
//   Chrome drops the whole page to 30fps while two videos play simultaneously, so
//   exclusivity is what keeps scrolling at full rate.
// Pair with preload="none" + a poster.
let active: HTMLVideoElement | null = null
const inBand = new Set<HTMLVideoElement>()

function playExclusive(video: HTMLVideoElement) {
  if (active && active !== video) active.pause()
  active = video
  video.play().catch(() => {})
}

function release(video: HTMLVideoElement) {
  inBand.delete(video)
  video.pause()
  if (active !== video) return
  active = null
  const next = inBand.values().next().value
  if (next) playExclusive(next)
}

export function useVideoInView(ref: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = ref.current
    if (!video) return
    // Observer callbacks can batch several records — the last one is the current state.
    const near = new IntersectionObserver(entries => {
      if (!entries[entries.length - 1].isIntersecting) return
      video.preload = 'auto'
      near.disconnect()
    }, { rootMargin: '300px 0px' })
    const center = new IntersectionObserver(entries => {
      if (entries[entries.length - 1].isIntersecting) {
        inBand.add(video)
        playExclusive(video)
      } else {
        release(video)
      }
    }, { rootMargin: '-45% 0px -45% 0px' })
    near.observe(video)
    center.observe(video)
    return () => {
      near.disconnect()
      center.disconnect()
      release(video)
    }
  }, [ref])
}
