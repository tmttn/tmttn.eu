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

const getSrcSet = (originalSrc: string, sizes: string) => {
  if (!originalSrc.startsWith('/static/')) {
    return; // Return for non-static images
  }

  const filename = originalSrc.replace('/static/', '').replace('.png', '');
  
  // Generate srcset for different sizes and densities based on the sizes prop
  // Parse sizes to determine if we need smaller variants
  const needsSmallVariant = sizes.includes('200px') || sizes.includes('max-width: 768px');
  
  const webpSrcSet = [];
  const pngSrcSet = [];
  
  if (needsSmallVariant) {
    // Add 180px variant for mobile/small screens
    webpSrcSet.push(`/static/${filename}-180.webp 180w`);
    pngSrcSet.push(`/static/${filename}-180.png 180w`);
  }
  
  // Add base size variant
  webpSrcSet.push(`${getOptimizedSrc(originalSrc, 'webp')} 260w`);
  pngSrcSet.push(`${getOptimizedSrc(originalSrc, 'png')} 260w`);
  
  // Add 2x density variant for high-DPI displays
  webpSrcSet.push(`/static/${filename}@2x.webp 520w`);
  pngSrcSet.push(`/static/${filename}@2x.png 520w`);

  return { 
    webp: webpSrcSet.join(', '), 
    png: pngSrcSet.join(', ') 
  };
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

  const srcSet = getSrcSet(src, sizes);

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