export const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Tom Metten",
  "url": "https://tmttn.eu",
  "image": "https://tmttn.eu/static/square-profile-picture.jpg",
  "jobTitle": "Full-Stack Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "ACA Group",
    "url": "https://www.acagroup.be"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "Belgium"
  },
  "sameAs": [
    "https://github.com/tmttn",
    "https://www.linkedin.com/in/tmetten/",
    "https://github.com/less-is-code",
    "https://www.twitch.tv/bizarius",
    "https://discord.gg/G5E8XWR",
    "https://www.facebook.com/mettentom"
  ],
  "knowsAbout": [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Full-Stack Development",
    "Web Development",
    "Software Engineering"
  ],
  "description": "Tom Metten is a passionate full-stack developer from Belgium, specializing in modern web technologies, React, TypeScript, and cloud solutions."
}

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Tom Metten - Portfolio",
  "url": "https://tmttn.eu",
  "description": "Personal portfolio and blog of Tom Metten, a full-stack developer from Belgium",
  "author": {
    "@type": "Person",
    "name": "Tom Metten"
  },
  "inLanguage": "en-US",
  "copyrightYear": new Date().getFullYear(),
  "copyrightHolder": {
    "@type": "Person",
    "name": "Tom Metten"
  }
}

export const portfolioStructuredData = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Tom Metten's Development Portfolio",
  "description": "A showcase of web development projects and open-source contributions",
  "author": {
    "@type": "Person",
    "name": "Tom Metten"
  },
  "url": "https://tmttn.eu/#showcase",
  "dateCreated": "2023-01-01",
  "dateModified": new Date().toISOString().split('T')[0],
  "genre": "Software Development Portfolio"
}