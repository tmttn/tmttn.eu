import React from 'react';
import Image from 'next/image';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

// Extract filename and generate optimized variants
const getOptimizedSrc = (originalSrc: string, format: 'webp' | 'png' = 'webp') => {
  if (!originalSrc.startsWith('/static/')) {
    return originalSrc; // Return as-is if not a static image
  }
  
  const filename = originalSrc.replace('/static/', '').replace('.png', '');
  return `/static/${filename}.${format}`;
};

const getSrcSet = (originalSrc: string, targetWidth: number) => {
  if (!originalSrc.startsWith('/static/')) {
    return; // Return for non-static images
  }

  const filename = originalSrc.replace('/static/', '').replace('.png', '');
  
  // Generate srcset for different densities and formats
  const webpSrcSet = [
    `${getOptimizedSrc(originalSrc, 'webp')} 1x`,
    `/static/${filename}@2x.webp 2x`
  ].join(', ');

  const pngSrcSet = [
    `${getOptimizedSrc(originalSrc, 'png')} 1x`,
    `/static/${filename}@2x.png 2x`
  ].join(', ');

  return { webp: webpSrcSet, png: pngSrcSet };
};

/**
 * ResponsiveImage component that automatically uses optimized images
 * with WebP format when supported and appropriate sizes for different viewports
 */
export default function ResponsiveImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  placeholder = 'empty',
  blurDataURL
}: ResponsiveImageProps) {

  const srcSet = getSrcSet(src, width);

  // For optimized images, use picture element with WebP support
  if (srcSet) {
    return (
      <picture className={className}>
        <source
          srcSet={srcSet.webp}
          sizes={sizes}
          type="image/webp"
        />
        <source
          srcSet={srcSet.png}
          sizes={sizes}
          type="image/png"
        />
        <Image
          src={getOptimizedSrc(src, 'png')}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          sizes={sizes}
        />
      </picture>
    );
  }

  // Fallback to regular Next.js Image for non-optimized images
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      sizes={sizes}
    />
  );
}