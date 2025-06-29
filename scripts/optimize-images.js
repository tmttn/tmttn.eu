#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const STATIC_DIR = path.join(__dirname, '../static');
const OUTPUT_DIR = path.join(__dirname, '../public/static');

// Image size configurations
const IMAGE_SIZES = {
  'gibli-avatar-portrait.png': {
    sizes: [
      { width: 260, suffix: '' }, // Original display size
      { width: 520, suffix: '@2x' }, // Retina display
      { width: 180, suffix: '-180' }, // Apple touch icon
      { width: 1200, suffix: '-og' }, // Open Graph image
      { width: 150, suffix: '-thumb' }, // Thumbnail
    ],
    formats: ['webp', 'png'] // Generate both WebP and PNG
  }
};

async function optimizeImage(inputPath, outputPath, width, format = 'png', quality = 90) {
  try {
    const image = sharp(inputPath);
    
    let pipeline = image.resize(width, width, {
      fit: 'cover',
      position: 'center'
    });

    if (format === 'webp') {
      pipeline = pipeline.webp({ quality });
    } else if (format === 'png') {
      pipeline = pipeline.png({ quality });
    }

    await pipeline.toFile(outputPath);
    
    const stats = fs.statSync(outputPath);
    console.log(`✅ Generated: ${path.basename(outputPath)} (${Math.round(stats.size / 1024)}KB)`);
  } catch (error) {
    console.error(`❌ Error processing ${outputPath}:`, error.message);
  }
}

async function processImages() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('🖼️  Starting image optimization...\n');

  for (const [filename, config] of Object.entries(IMAGE_SIZES)) {
    const inputPath = path.join(STATIC_DIR, filename);
    
    if (!fs.existsSync(inputPath)) {
      console.warn(`⚠️  Input file not found: ${inputPath}`);
      continue;
    }

    console.log(`Processing: ${filename}`);
    
    const baseName = path.parse(filename).name;
    
    // Generate different sizes and formats
    for (const size of config.sizes) {
      for (const format of config.formats) {
        const suffix = size.suffix;
        const outputFilename = `${baseName}${suffix}.${format}`;
        const outputPath = path.join(OUTPUT_DIR, outputFilename);
        
        await optimizeImage(inputPath, outputPath, size.width, format);
      }
    }
    
    console.log('');
  }

  console.log('🎉 Image optimization complete!');
}

// Run the script
processImages().catch(console.error);