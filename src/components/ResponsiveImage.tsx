import React from 'react';
import Image from 'next/image';

interface ResponsiveImageProperties {
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
const getOptimizedSource = (originalSource: string, format: 'webp' | 'png' = 'webp') => {
  if (!originalSource.startsWith('/static/')) {
    return originalSource; // Return as-is if not a static image
  }
  
  const filename = originalSource.replace('/static/', '').replace('.png', '');
  return `/static/${filename}.${format}`;
};

const getSourceSet = (originalSource: string, sizes: string) => {
  if (!originalSource.startsWith('/static/')) {
    return; // Return for non-static images
  }

  const filename = originalSource.replace('/static/', '').replace('.png', '');
  
  // Generate srcset for different sizes and densities based on the sizes prop
  // Parse sizes to determine if we need smaller variants
  const needsSmallVariant = sizes.includes('200px') || sizes.includes('max-width: 768px');
  
  const webpSourceSet = [];
  const pngSourceSet = [];
  
  if (needsSmallVariant) {
    // Add 180px variant for mobile/small screens
    webpSourceSet.push(`/static/${filename}-180.webp 180w`);
    pngSourceSet.push(`/static/${filename}-180.png 180w`);
  }
  
  // Add base size variant
  webpSourceSet.push(`${getOptimizedSource(originalSource, 'webp')} 260w`);
  pngSourceSet.push(`${getOptimizedSource(originalSource, 'png')} 260w`);
  
  // Add 2x density variant for high-DPI displays
  webpSourceSet.push(`/static/${filename}@2x.webp 520w`);
  pngSourceSet.push(`/static/${filename}@2x.png 520w`);

  return { 
    webp: webpSourceSet.join(', '), 
    png: pngSourceSet.join(', ') 
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
}: ResponsiveImageProperties) {

  const sourceSet = getSourceSet(src, sizes);

  // For optimized images, use picture element with WebP support
  if (sourceSet) {
    return (
      <picture className={className}>
        <source
          srcSet={sourceSet.webp}
          sizes={sizes}
          type="image/webp"
        />
        <source
          srcSet={sourceSet.png}
          sizes={sizes}
          type="image/png"
        />
        <Image
          src={getOptimizedSource(src, 'png')}
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