"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { MediaRecord } from "@/lib/constants";
import type { PublicMedia } from "@/lib/media";
import { VideoCard } from "@/components/media/media-gallery";

type GalleryItem = MediaRecord | PublicMedia;

function publicUrl(item: GalleryItem) {
  return "public_url" in item ? item.public_url : undefined;
}

export function HomeMediaGallery({ items }: { items: readonly GalleryItem[] }) {
  const images = items.filter((item) => item.type === "image");
  const videos = items.filter((item) => item.type === "video");
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeImage === null) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveImage(null);
      if (event.key === "ArrowLeft") setActiveImage((current) => current === null ? null : (current - 1 + images.length) % images.length);
      if (event.key === "ArrowRight") setActiveImage((current) => current === null ? null : (current + 1) % images.length);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("media-lightbox-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("media-lightbox-open");
    };
  }, [activeImage, images.length]);

  const activeItem = activeImage === null ? null : images[activeImage];
  return <>
    {images.length > 0 && <div className="home-image-grid" aria-label="Published image gallery">
      {images.map((item, index) => {
        const imageUrl = publicUrl(item);
        return <article className="home-image-tile" key={item.id}>
          {imageUrl ? <button type="button" onClick={() => setActiveImage(index)} aria-label={`Open ${item.title}`}>
            <img src={imageUrl} alt={item.title} />
            <span className="home-image-caption"><strong>{item.title}</strong><small>{item.category}</small></span>
          </button> : <div className={`media-art motif-${item.motif}`} role="img" aria-label={`Abstract placeholder for ${item.title}`}><span>{item.id.toUpperCase()}</span><div className="home-image-caption"><strong>{item.title}</strong><small>{item.category}</small></div></div>}
        </article>;
      })}
    </div>}
    {videos.length > 0 && <div className="video-gallery home-video-gallery">{videos.map((item) => <VideoCard key={item.id} item={item} />)}</div>}
    {activeItem && publicUrl(activeItem) && <div className="home-lightbox" role="dialog" aria-modal="true" aria-label={`${activeItem.title} image preview`} onClick={() => setActiveImage(null)}>
      <button ref={closeButtonRef} className="home-lightbox-close" type="button" onClick={() => setActiveImage(null)} aria-label="Close image preview"><X size={22} /></button>
      <button className="home-lightbox-nav home-lightbox-prev" type="button" onClick={(event) => { event.stopPropagation(); setActiveImage((current) => current === null ? null : (current - 1 + images.length) % images.length); }} aria-label="Previous image"><ChevronLeft size={28} /></button>
      <figure onClick={(event) => event.stopPropagation()}>
        <img src={publicUrl(activeItem)} alt={activeItem.title} />
        <figcaption><span><strong>{activeItem.title}</strong><small>{activeItem.category}</small></span><em>{(activeImage ?? 0) + 1} / {images.length}</em></figcaption>
      </figure>
      <button className="home-lightbox-nav home-lightbox-next" type="button" onClick={(event) => { event.stopPropagation(); setActiveImage((current) => current === null ? null : (current + 1) % images.length); }} aria-label="Next image"><ChevronRight size={28} /></button>
    </div>}
  </>;
}
