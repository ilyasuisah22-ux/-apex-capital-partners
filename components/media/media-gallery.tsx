import { mediaRecords, type MediaRecord } from "@/lib/constants";
import { PlayIcon } from "@/components/ui/icons";

export function MediaCard({ item }: { item: MediaRecord }) {
  return <article className="media-card"><div className={`media-art motif-${item.motif}`} role="img" aria-label={`Abstract placeholder for ${item.title}`}><span>{item.id.toUpperCase()}</span></div><p className="eyebrow text-ink/60">{item.category}</p><h3>{item.title}</h3><p>{item.description}</p></article>;
}

export function VideoCard({ item }: { item: MediaRecord }) {
  return <article className="video-card"><div className={`media-art motif-${item.motif}`} aria-hidden="true"><span className="play"><PlayIcon className="size-6" /></span><small>Preview only</small></div><p className="eyebrow text-brass">{item.category}</p><h3>{item.title}</h3><p>{item.description} No playable media is currently attached.</p></article>;
}

export function ImageGallery({ items = mediaRecords.filter((item) => item.type === "image") }: { items?: readonly MediaRecord[] }) {
  return <div className="image-gallery">{items.map((item) => <MediaCard key={item.id} item={item} />)}</div>;
}

export function VideoGallery({ items = mediaRecords.filter((item) => item.type === "video") }: { items?: readonly MediaRecord[] }) {
  return <div className="video-gallery">{items.map((item) => <VideoCard key={item.id} item={item} />)}</div>;
}

export function MediaGallery() {
  return <><ImageGallery /><VideoGallery /></>;
}
