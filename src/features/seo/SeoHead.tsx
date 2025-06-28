import Head from 'next/head'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  twitterCard?: 'summary' | 'summary_large_image'
  canonicalUrl?: string
  noindex?: boolean
  structuredData?: object
}

const defaultProps = {
  title: 'Tom Metten - Full-Stack Developer & Tech Enthusiast',
  description: 'Tom Metten is a passionate full-stack developer from Belgium, specializing in modern web technologies, React, TypeScript, and cloud solutions. Explore my portfolio and get in touch.',
  keywords: 'Tom Metten, full-stack developer, React, TypeScript, Next.js, web development, Belgium, software engineer, portfolio',
  ogImage: '/static/gibli-avatar-portrait.png',
  ogUrl: 'https://tmttn.eu',
  twitterCard: 'summary_large_image' as const,
}

export default function SEOHead({
  title = defaultProps.title,
  description = defaultProps.description,
  keywords = defaultProps.keywords,
  ogTitle = title,
  ogDescription = description,
  ogImage = defaultProps.ogImage,
  ogUrl = defaultProps.ogUrl,
  twitterCard = defaultProps.twitterCard,
  canonicalUrl,
  noindex = false,
  structuredData
}: SEOHeadProps) {
  const fullTitle = title === defaultProps.title ? title : `${title} | Tom Metten`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Tom Metten" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:site_name" content="Tom Metten" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@tmttn" />
      
      {/* Favicons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/static/gibli-avatar-portrait.png" />
      
      {/* Additional meta tags */}
      <meta name="theme-color" content="#60a5fa" />
      <meta name="msapplication-TileColor" content="#60a5fa" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
    </Head>
  )
}