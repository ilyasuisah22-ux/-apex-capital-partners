/* eslint-disable @next/next/no-img-element */
import { mediaRecords, type MediaRecord } from "@/lib/constants";
import type { PublicMedia } from "@/lib/media";
import { PlayIcon } from "@/components/ui/icons";

export function MediaCard({ item }: { item: MediaRecord | PublicMedia }) {
  return <article className="media-card"><div className={`media-art motif-${item.motif}`} role="img" aria-label={`Abstract placeholder for ${item.title}`}>{"public_url" in item && item.public_url ? <img src={item.public_url} alt={item.title} /> : <span>{item.id.toUpperCase()}</span>}</div><p className="eyebrow text-ink/60">{item.category}</p><h3>{item.title}</h3><p>{item.description}</p></article>;
}

export function VideoCard({ item }: { item: MediaRecord | PublicMedia }) {
  return <article className="video-card"><div className={`media-art motif-${item.motif}`} aria-hidden="true">{"public_url" in item && item.public_url ? <video src={item.public_url} controls preload="metadata" /> : <><span className="play"><PlayIcon className="size-6" /></span><small>Preview only</small></>}</div><p className="eyebrow text-brass">{item.category}</p><h3>{item.title}</h3><p>{item.description}{!("public_url" in item && item.public_url) && " No playable media is currently attached."}</p></article>;
}

export function ImageGallery({ items = mediaRecords.filter((item) => item.type === "image") }: { items?: readonly (MediaRecord | PublicMedia)[] }) {
  const images = items.filter((item) => item.type === "image");
  return images.length ? <div className="image-gallery">{images.map((item) => <MediaCard key={item.id} item={item} />)}</div> : <p className="media-empty">New image perspectives are being prepared.</p>;
}

export function VideoGallery({ items = mediaRecords.filter((item) => item.type === "video") }: { items?: readonly (MediaRecord | PublicMedia)[] }) {
  const videos = items.filter((item) => item.type === "video");
  return videos.length ? <div className="video-gallery">{videos.map((item) => <VideoCard key={item.id} item={item} />)}</div> : <p className="media-empty">New presentations are being prepared.</p>;
}

export function MediaGallery({ items = mediaRecords }: { items?: readonly (MediaRecord | PublicMedia)[] }) {
  return <><ImageGallery items={items} /><VideoGallery items={items} /></>;
}
