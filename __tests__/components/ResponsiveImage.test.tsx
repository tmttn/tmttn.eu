import React from 'react';
import { render, screen } from '@testing-library/react';
import ResponsiveImage from '../../src/components/ResponsiveImage';

// Mock Next.js Image component
jest.mock('next/image', () => {
  const MockImage = ({ src, alt, width, height, priority, sizes, className, placeholder, blurDataURL }: any) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      data-priority={priority}
      data-sizes={sizes}
      className={className}
      data-placeholder={placeholder}
      data-blur-data-url={blurDataURL}
    />
  );
  MockImage.displayName = 'MockImage';
  return MockImage;
});

describe('ResponsiveImage', () => {
  it('renders with basic props', () => {
    render(
      <ResponsiveImage
        src="/test-image.png"
        alt="Test image"
        width={260}
        height={260}
      />
    );

    const image = screen.getByAltText('Test image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('width', '260');
    expect(image).toHaveAttribute('height', '260');
  });

  it('generates optimized sources for static images', () => {
    render(
      <ResponsiveImage
        src="/static/test-image.png"
        alt="Optimized image"
        width={260}
        height={260}
        priority
      />
    );

    // Should render picture element with sources
    const picture = screen.getByRole('img').closest('picture');
    expect(picture).toBeInTheDocument();

    // Should have WebP and PNG sources
    const sources = picture?.querySelectorAll('source');
    expect(sources).toHaveLength(2);
    
    // WebP source should be first
    expect(sources?.[0]).toHaveAttribute('type', 'image/webp');
    expect(sources?.[1]).toHaveAttribute('type', 'image/png');
  });

  it('falls back to regular Image for non-static images', () => {
    render(
      <ResponsiveImage
        src="/external/image.png"
        alt="External image"
        width={260}
        height={260}
      />
    );

    // Should not render picture element for external images
    const picture = screen.getByRole('img').closest('picture');
    expect(picture).toBeNull();

    const image = screen.getByAltText('External image');
    expect(image).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <ResponsiveImage
        src="/static/test-image.png"
        alt="Styled image"
        width={260}
        height={260}
        className="custom-class"
      />
    );

    const picture = screen.getByRole('img').closest('picture');
    expect(picture).toHaveClass('custom-class');
  });

  it('passes through placeholder and blur data URL', () => {
    render(
      <ResponsiveImage
        src="/test-image.png"
        alt="Blurred image"
        width={260}
        height={260}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,placeholder"
      />
    );

    const image = screen.getByAltText('Blurred image');
    expect(image).toHaveAttribute('data-placeholder', 'blur');
    expect(image).toHaveAttribute('data-blur-data-url', 'data:image/jpeg;base64,placeholder');
  });

  it('sets correct sizes attribute', () => {
    render(
      <ResponsiveImage
        src="/static/test-image.png"
        alt="Responsive image"
        width={260}
        height={260}
        sizes="(max-width: 768px) 200px, 260px"
      />
    );

    const picture = screen.getByRole('img').closest('picture');
    const sources = picture?.querySelectorAll('source');
    
    sources?.forEach(source => {
      expect(source).toHaveAttribute('sizes', '(max-width: 768px) 200px, 260px');
    });
  });
});