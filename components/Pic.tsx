/* eslint-disable @next/next/no-img-element */
import { photoSrcSet, photoUrl, type Photo } from "@/lib/photos";

// Unsplash 사진. next/image 대신 반응형 <img>(srcset)로 가볍게 쓴다.
export default function Pic({
  photo,
  sizes = "100vw",
  eager = false,
  className = "",
  decorative = false,
  width = 1200,
  height = 800,
}: {
  photo: Photo;
  sizes?: string;
  eager?: boolean;
  className?: string;
  decorative?: boolean;
  width?: number;
  height?: number;
}) {
  return (
    <img
      src={photoUrl(photo, 1200)}
      srcSet={photoSrcSet(photo)}
      sizes={sizes}
      alt={decorative ? "" : photo.alt}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      className={`photo ${className}`}
      style={photo.pos ? { objectPosition: photo.pos } : undefined}
    />
  );
}
