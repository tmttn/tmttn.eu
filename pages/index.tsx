import React, { useState, useEffect } from "react"
import {
  Layout,
  Scrollable,
  SEOHead,
  AccessibleNavigation,
  SkipNavigation,
  ParticleBackground,
  EnhancedThemeToggle,
  PageTransition,
  ShowcaseSection
} from '@features'
import { 
  ClientOnlyIcon, 
  ResponsiveImage,
  StyledHeader,
  StyledHeaderRight,
  StyledMain,
  StyledWelcomeSection,
  StyledSectionContent,
  StyledContactSection,
  StyledIconBar,
  StyledIcon,
  StyledSection,
  StyledFooter
} from '@components'
import { personStructuredData, websiteStructuredData } from '@utils'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [currentYear, setCurrentYear] = useState(2025) // Static fallback
  const [age, setAge] = useState(37) // Static fallback

  useEffect(() => {
    // Set dynamic values only on client side to prevent hydration mismatch
    const year = new Date().getFullYear()
    setCurrentYear(year)
    setAge(year - 1987)

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <SEOHead 
        structuredData={[personStructuredData, websiteStructuredData]}
        canonicalUrl="https://tmttn.eu"
      />
      <SkipNavigation />
      <ParticleBackground />
      <PageTransition>
        <Layout>
      <StyledHeader $scrolled={scrolled}>
        <StyledHeaderRight>
          <AccessibleNavigation />
          <EnhancedThemeToggle />
        </StyledHeaderRight>
      </StyledHeader>
      <StyledMain id="main-content" role="main" aria-label="Main content" tabIndex={-1}>
        <StyledWelcomeSection id="welcome" $variant="odd" role="banner" aria-labelledby="welcome-heading">
          <h1 id="welcome-heading">Tom Metten</h1>
          <h2>Developer | Father | Tabletop and Online RPG enthousiast</h2>
        </StyledWelcomeSection>
        <StyledSection id="about" $variant="even" role="region" aria-labelledby="about-heading">
          <h1 id="about-heading">About me</h1>
          <StyledSectionContent>
            <div>
              <ResponsiveImage
                src="/static/gibli-avatar-portrait.png"
                alt="Portrait photo of Tom Metten, a full-stack developer from Belgium"
                height={260}
                width={260}
                priority
                sizes="(max-width: 768px) 200px, 260px"
              />
            </div>
            <div>
              <p>
                Hi! I&apos;m Tom Metten, a {age}{" "}
                year old developer from Belgium. During the day, I work for{" "}
                <a href="https://www.acagroup.be">ACA Group</a>. After work
                I like spending quality time with my family, enjoying myself
                with some personal and open-source coding projects and
                bingewatching Netflix / Disney+ / Youtube (a lot).
              </p>
              <p>
                I also enjoy tabletop boardgames, roleplaying games and
                occasionally video games (I&apos;m a PC gamer, consoles are awesome
                too). Food is as much the bane of my existance as it is my
                passion. I love cooking, but I enjoy eating even more. As you
                can imagine, the struggle against the scale is real.
              </p>
            </div>
          </StyledSectionContent>
        </StyledSection>
        <StyledContactSection id="contact" $variant="odd" role="region" aria-labelledby="contact-heading">
          <h1 id="contact-heading">Contact</h1>
          <h2>Get in touch with me:</h2>
          <StyledIconBar>
            <StyledIcon href="https://github.com/tmttn" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <ClientOnlyIcon icon={["fab", "github-square"]} fallback="GitHub" />
            </StyledIcon>

            <StyledIcon href="https://www.linkedin.com/in/tmetten/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <ClientOnlyIcon icon={["fab", "linkedin"]} fallback="LinkedIn" />
            </StyledIcon>

            <StyledIcon href="https://github.com/less-is-code" target="_blank" rel="noopener noreferrer" aria-label="Less is Code">
              <ClientOnlyIcon icon={["fab", "github-square"]} fallback="GitHub" />
            </StyledIcon>

            <StyledIcon href="mailto:thomas.metten@gmail.com" aria-label="Email">
              <ClientOnlyIcon icon="at" fallback="Email" />
            </StyledIcon>

            <StyledIcon href="https://www.twitch.tv/bizarius" target="_blank" rel="noopener noreferrer" aria-label="Twitch">
              <ClientOnlyIcon icon={["fab", "twitch"]} fallback="Twitch" />
            </StyledIcon>

            <StyledIcon href="https://discord.gg/G5E8XWR" target="_blank" rel="noopener noreferrer" aria-label="Discord">
              <ClientOnlyIcon icon={["fab", "discord"]} fallback="Discord" />
            </StyledIcon>

            <StyledIcon href="https://www.facebook.com/mettentom" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <ClientOnlyIcon icon={["fab", "facebook-square"]} fallback="Facebook" />
            </StyledIcon>
          </StyledIconBar>
        </StyledContactSection>
        <ShowcaseSection variant="even" />
      </StyledMain>
      
      <StyledFooter role="contentinfo" aria-label="Site footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About</h3>
            <p>
              Full-stack developer passionate about creating beautiful, 
              functional web experiences. Based in Belgium, working 
              remotely with teams worldwide.
            </p>
            <div className="footer-social">
              <a href="https://github.com/tmttn" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <ClientOnlyIcon icon={["fab", "github"]} fallback="GH" />
              </a>
              <a href="https://www.linkedin.com/in/tmetten/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <ClientOnlyIcon icon={["fab", "linkedin"]} fallback="LI" />
              </a>
              <a href="https://www.twitch.tv/bizarius" target="_blank" rel="noopener noreferrer" aria-label="Twitch">
                <ClientOnlyIcon icon={["fab", "twitch"]} fallback="TW" />
              </a>
              <a href="https://discord.gg/G5E8XWR" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                <ClientOnlyIcon icon={["fab", "discord"]} fallback="DC" />
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#welcome">Home</a></li>
              <li><a href="#about">About Me</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#showcase">Portfolio</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Copyright</h3>
            <p>
              © {currentYear} Tom Metten
            </p>
            <p>
              All rights reserved. This website and its content are protected by copyright law.
            </p>
            <p>
              Made with <span className="footer-heart">♥</span> using Next.js & TypeScript.
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>
            Crafted with passion and attention to detail.
          </p>
        </div>
      </StyledFooter>
      
        <Scrollable />
        </Layout>
      </PageTransition>
    </>
  )
}