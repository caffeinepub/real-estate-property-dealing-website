import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  imageUrls: string[];
  title: string;
}

export default function ImageGallery({ imageUrls, title }: ImageGalleryProps) {
  const images = imageUrls.length > 0 ? imageUrls : ['/assets/generated/property-sample-1.dim_800x600.jpg'];
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <div className="space-y-3">
      {/* Main Preview */}
      <div className="relative rounded-xl overflow-hidden bg-muted aspect-[16/9] group">
        <img
          src={images[activeIndex]}
          alt={`${title} - Image ${activeIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
          onError={(e) => {
            e.currentTarget.src = '/assets/generated/property-sample-1.dim_800x600.jpg';
          }}
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-navy/70 hover:bg-navy text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-navy/70 hover:bg-navy text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 right-3 bg-navy/70 text-white text-xs px-2.5 py-1 rounded-full">
              {activeIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((url, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                idx === activeIndex
                  ? 'border-gold shadow-gold'
                  : 'border-transparent hover:border-gold/50'
              }`}
            >
              <img
                src={url}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/assets/generated/property-sample-1.dim_800x600.jpg';
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
